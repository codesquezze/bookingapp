import { useContext } from "react";
import { Link } from "react-router-dom";
import {UserContext} from  '../context/UserContext'

export default function Header() {
    const {user}=useContext(UserContext);
    return (
        <div>
            <header className='py-3 flex justify-between'>
                <Link to="/" className="flex items-center gap-1 text-xl">
                    <i className="fa-brands fa-airbnb"></i>
                    <span className='font-bold text-xl'>airbnb</span>
                </Link>
                <div className='flex gap-3 border border-gray-300 rounded-full py-2 px-4 text-sm font-bold shadow-md shadow-gray-300'>
                    <div>Anywhere</div>
                    <div className='border-l border-gray-300'></div>
                    <div>Any week</div>
                    <div className='border-l border-gray-300'></div>
                    <div className="font-light">Add guests</div>
                    <button className='bg-primary text-white p-1 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    </button>
                </div>
                <Link  to={user?'/AccountPage':"/LoginPage"}className='flex  items-center gap-3 border border-gray-300 rounded-full py-2 px-4 text-sm'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    <div className='border border-gray-500  rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    {!!user &&(
                        <div className="font-medium">
                            {user.name}
                        </div>
                    )}
                </Link>
            </header>
        </div>
    )
}
