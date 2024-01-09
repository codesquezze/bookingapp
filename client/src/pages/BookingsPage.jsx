import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImage from "../components/PlaceImage";
import { format } from 'date-fns';
import { differenceInCalendarDays } from 'date-fns';
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div>
            <AccountNav />
            <div className="">
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/AccountPage/bookings/${booking._id}`} key={booking._id} className="flex gap-4 bg-gray-200 p-4 rounded-2xl mb-4"> {/* Add a unique key for each booking */}
                        <div className="w-32 h-32 bg-gray-300 shrink-0 ">
                            <PlaceImage place={booking.place} />
                        </div>
                        <BookingDates booking={booking}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}
