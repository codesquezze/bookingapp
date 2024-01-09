import { Link } from "react-router-dom"
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImage from "../components/PlaceImage";


export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/userplaces').then((response) => {
            setPlaces(response.data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary py-2 px-6 text-white mx-auto rounded-full" to={'/AccountPage/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place

                </Link>
                <p className="text-xl mt-6">List of All Added Places</p>

            </div>

            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link key={place.id} to={'/AccountPage/places/' + place._id} className="flex gap-4 bg-gray-100 p-4 rounded-2xl mb-4">
                        <div className="flex w-32 h-32 bg-gray-200 shrink-0 ">
                            <PlaceImage place={place} />
                        </div>

                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>


        </div>
    )
}
