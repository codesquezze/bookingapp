import { useState } from "react";

export default function PlaceGallary({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    if (showAllPhotos) {
        return (
            <div className="absolute inset-0  min-h-screen bg-black text-white">
                <div className="p-8 grid gap-2 bg-black">
                    <div className="">
                        <h2 className="text-3xl text-center">All Photos of {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="text-black right-12 top-20 flex px-4 py-2 bg-gray-300  gap-2 mx-1 rounded-2xl fixed shadow shadow-black">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Close
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div className="">
                            <img className=" object-cover w-full h-full rounded-3xl border border-red-700" src={'http://localhost:4000/' + photo} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] mt-2 rounded-2xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover" src={'http://localhost:4000/' + place.photos[0]} alt="" />
                        </div>
                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] && (
                        <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover" src={'http://localhost:4000/' + place.photos[1]} alt="" />
                    )}
                    <div className="overflow-hidden">
                        {place.photos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} className="aspect-square object-cover relative top-2" src={'http://localhost:4000/' + place.photos[2]} alt="" />
                        )}
                    </div>
                </div>
            </div>
            <button onClick={() => setShowAllPhotos(true)} className="flex absolute buttom-4 right-2 py-2 px-4 bg-gray-200 rounded-2xl border border-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                View more photos
            </button>
        </div>
    )
}
