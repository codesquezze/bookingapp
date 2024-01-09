const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const User = require('./model/User.js');
require('dotenv').config();
var cors = require('cors');
const app = express();
var cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer')
const fs = require('fs');
const PlaceModel = require('./model/Place.js');
const BookingModel = require('./model/Booking.js');

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'qwertyasdfgzxcvb'

app.use(express.json()); // for parsing the json or acts as json parser
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

function getUserDataFromToken(req){
 return new Promise((resolve,reject)=>{
  jwt.verify(req.cookies.token,jwtSecret,async(err,userData)=>{
  if(err) throw err;
  resolve(userData);
  });
 });
}

try {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Successfully Connected to the MongoDB!'));
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}


//************************* for user registration************************************
app.post('/RegisterUser', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  }
  catch (error) {
    res.status(422).send('This may be a unprocessable entity');
  }
});

// *************************************for user login*****************************************
app.post('/LoginUser', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const checkPassword = bcrypt.compareSync(password, userDoc.password);
    if (checkPassword) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id
      },
        jwtSecret, {}, (error, token) => {
          if (error) throw error;
          res.cookie('token', token).json(userDoc); // { sameSite: 'None', secure: true }
        });
    }
    else {
      res.status(422).json('Password Check Failed');
    }
  }
  else {
    res.json('User not found');
  }
});

/*************************************for user info****************************************/
app.get('/userProfile', async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    })
  } else {
    res.json(null);
  }
})
/***********************************Logout buttton***************************************************/
app.post('/logout', async (req, res) => {
  res.cookie('token', '').json(true);
})
/****************************Add Photos by link endpoint*********************************/
app.post('/uploadbylink', async (req, res) => {
  try {
    const { link } = req.body;
    const newName = 'Photo:' + Date.now() + '.jpg';
    await download.image({
      url: link,
      dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
  } catch (error) {
    console.error('Error uploading photo by link:', error);
    res.status(500).send('Internal Server Error');
  }
});

/************************************Upload Photos endpoint*************************************************/
const photoMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photoMiddleware.array('photos[]', 100), (req, res) => {
  const uploadedFiles = [];

  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const extn = parts[parts.length - 1];
    const newpath = path + '.' + extn;
    fs.renameSync(path, newpath);
    uploadedFiles.push(newpath); // Push the original filename, not the new path
  }
  res.json(uploadedFiles);
});

/************************places endpoint i.e to add the places info******************************/
app.post('/places', async (req, res) => {

  const { token } = req.cookies;
  const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;

    const placeDoc = await PlaceModel.create({
      owner: userData.id,
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

/**************************************Listing Places endpoint**********************************/
app.get('/userplaces', (req, res) => {

  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const { id } = userData;

    res.json(await PlaceModel.find({ owner: id }));

  });
});
/*********************************Place description wale pr click hone pr**************************************/
app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await PlaceModel.findById(id));
});
/*************************************************************************************************************/
app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price } = req.body;
  jwt.verify(token, jwtSecret, {}, async (error, userData) => {
    if (error) throw error;
    const placeDoc = await PlaceModel.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({ title, address, photos: addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price });
      placeDoc.save();
    }
    res.json(await PlaceModel.find({ owner: id }));
  });
});

/*******************************Listing Places on indexPage.jsx*************************************/
app.get('/places', async (req, res) => {
  res.json(await PlaceModel.find());
})

/************************************Book Now******************************************************/
app.post('/bookings', async (req, res) => {
  const userData=await getUserDataFromToken(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price, } = req.body;
  await BookingModel.create({
    place, checkIn, checkOut, numberOfGuests, name, phone, price,user:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});

/***************************See all Bookings on the BookingsPage*******************************/

app.get('/bookings', async (req, res) => {
  const userData=await getUserDataFromToken(req);
  res.json(await BookingModel.find({user:userData.id}).populate('place'));
})

/*************************************nodemon part**********************************/
app.listen(4000, () => {
  console.log("Booking App listening on port 4000")
})