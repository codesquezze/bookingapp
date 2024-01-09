import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../components/AddressLink";
import PlaceGallary from "../components/PlaceGallary";
import BookingDates from "../components/BookingDates";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState('');
    useEffect(() => {
        if (id) {
            axios.get('/bookings').then(response => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id]);

    if (!booking) {
        return null;
    }


    return (
        <div className="my-8">
            <h1 className="text-3xl">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-4 mb-4 rounded-2xl my-4">
                <h2 className="font-semibold text-xl">Your Booking Information:</h2>
                <div className="border border-black p-4 mt-2 rounded-2xl">
                <BookingDates booking={booking}/>
                </div>
                
            </div>
            <PlaceGallary place={booking.place}/>
        </div>
    )
}
