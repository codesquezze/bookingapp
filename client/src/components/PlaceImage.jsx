
export default function PlaceImage({place,index=0,className=null}) {

    if(!place.photos?.length){
        return null;
    }
  
    if(!className){
     className='object-cover w-32 h-32'
    }

    return (
        <div>
            <img className={className} src={'http://localhost:4000/' + place.photos[0]} alt="" />
        </div>
    )
}
