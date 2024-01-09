import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams , Navigate } from "react-router-dom";
import { differenceInCalendarDays } from 'date-fns';
import { UserContext } from "../context/UserContext";
import PlaceGallary from "../components/PlaceGallary";
import AddressLink from "../components/AddressLink";


export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect,setRedirect]=useState('');
    
    const {user}=useContext(UserContext);
    useEffect(() => {
     if(user){
        setName(user.name)
     }
    }, [user])
    

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace() {
        try {
            const response = await axios.post('/bookings', {
                checkIn,
                checkOut,
                numberOfGuests,
                name,
                phone,
                place: place._id,
                price: numberOfNights * place.price,
            });
            console.log(response)
            const bookingId = response.data._id;

            console.log(bookingId)
            setRedirect(`/AccountPage/bookings/${bookingId}`);
        } catch (error) {
            console.error('Error in booking place:', error);
        }
    }
    
    if(redirect){
        return <Navigate to={redirect}/>
    }


    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) {
        return null;
    }

  
    return (
        <div className="mt-2 bg-gray-100 -mx-8 p-8 rounded-2xl">
            <h1 className="text-3xl font-medium">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallary place={place}/>

            <div className="grid  gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]  mt-12">
                <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="bg-white shadow p-4 rounded-2xl mb-8">
                        <h2 className="font-semibold text-2xl">Description</h2>
                        <div className="text-sm text-gray-700">{place.description}</div>
                    </div>
                    <div className="bg-white shadow p-4 rounded-2xl text-xl">
                        Check-in-timings: {place.checkIn} <br />
                        Check-out-timings: {place.checkOut} <br />
                        Max number of Guests: {place.maxGuests}
                    </div>
                </div>
                <div className="bg-white shadow p-4 rounded-2xl">
                    <div className="text-2xl text-center mb-2 font-normal">
                        Price: ₹{place.price} /per night
                    </div>
                    <div className="border rounded-2xl gap-2">
                        <div className="flex justify-between">
                            <div className="py-4 px-4  mb-2">
                                <label htmlFor="">Check-In : </label>
                                <input type="date" value={checkIn} onChange={evnt => setCheckIn(evnt.target.value)} />
                            </div>
                            <div className="py-4 px-4 ">
                                <label htmlFor="" className="">Check-Out : </label>
                                <input type="date" value={checkOut} onChange={evnt => setCheckOut(evnt.target.value)} />
                            </div>
                        </div>
                        <div className="py-4 px-4 ">
                            <label htmlFor="" className="flex">Number of Guests</label>
                            <input type="number" value={numberOfGuests} onChange={evnt => setNumberOfGuests(evnt.target.value)} />
                        </div>
                        {numberOfNights > 0 && (
                            <div className="py-4 px-4 ">
                                <label  className="flex">Your Full Name:</label>
                                <input type="text" value={name} onChange={evnt => setName(evnt.target.value)} />

                                <label  className="flex">Phone:</label>
                                <input type="telephone" value={phone} onChange={evnt => setPhone(evnt.target.value)} />
                            </div>
                        )}
                    </div>

                    <button onClick={bookThisPlace} className="primary mt-4">Book Now
                        {numberOfNights > 0 && (
                            <span> ₹{numberOfNights * place.price}</span>
                        )}
                    </button>
                </div>
            </div>
            <div className="bg-white shadow p-4 rounded-2xl mt-8">
                <h2 className="font-semibold text-2xl">Extra Info</h2>
                <div className="text-sm text-gray-700 leading-4">{place.extraInfo}</div>
            </div>
        </div>
    );
}
