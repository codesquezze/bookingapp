import { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState('');
    const [extraInfo, setExtrainfo] = useState('');
    const [checkIn, setCheckin] = useState('');
    const [checkOut, setCheckout] = useState('');
    const [maxGuests, setMaxguests] = useState(1);
    const [price,setPrice]=useState(100);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtrainfo(data.extraInfo);
            setCheckin(data.checkIn);
            setCheckout(data.checkOut);
            setMaxguests(data.maxGuests);
            setPrice(data.price);
        })
    }, [id])

    function inputHeader(text) {
        return (
            <h2 className="text-xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text) {
        return (
            <p className="text-sm text-gray-500">*{text}</p>
        )
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function savePlace(evnt) {
        evnt.preventDefault();
        const placeData = {
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
        };
        if (id) {
            //update
            await axios.put('/places', {
                id, ...placeData
            })
            setRedirect(true);
        }
        else {
            //new Place
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/AccountPage/places'} />
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace}>
                <div className="text-center bg-gray-200 rounded-2xl p-1 mx-auto">Add the details of your place</div>
                {preInput('Title', 'It should be short and catchy')}
                <input type="text" placeholder="title" value={title}
                    onChange={evnt => setTitle(evnt.target.value)} />

                {preInput('Address', 'Address to this place')}
                <input type="text" placeholder="address" value={address}
                    onChange={evnt => setAddress(evnt.target.value)} />

                {preInput('Photos', 'The more is the better')}

                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'Short and Crisp')}
                <textarea placeholder="your description goes here" value={description}
                    onChange={evnt => setDescription(evnt.target.value)}></textarea>

                {preInput('Perks', 'Select all the perks you want')}

                <Perks selected={perks} onChange={setPerks} />

                {preInput('Extra Info', 'Rules and something extra')}
                <textarea placeholder="your some extra info" value={extraInfo}
                    onChange={evnt => setExtrainfo(evnt.target.value)}></textarea>

                {preInput('Check In and Check Out', 'Should have a time window')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 -mb-2">Check In timings</h3>
                        <input type="text" placeholder="16:00" value={checkIn}
                            onChange={evnt => setCheckin(evnt.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-2">Check Out timings</h3>
                        <input type="text" placeholder="10:00" value={checkOut}
                            onChange={evnt => setCheckout(evnt.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-2">Max Guests</h3>
                        <input type="number" placeholder="3" value={maxGuests}
                            onChange={evnt => setMaxguests(evnt.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-2">Price (Per Night)</h3>
                        <input type="number" placeholder="3" value={price}
                            onChange={evnt => setPrice(evnt.target.value)} />
                    </div>
                </div>
                <button className="bg-primary text-white w-full p-2 rounded-xl mb-2">Save</button>
            </form>
        </div>
    )
}