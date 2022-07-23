import React from 'react';
import Link from 'next/link';
const RoomCard = ({room}) => {

//console.log('CARD-------->',room?.id);

    return (
       <div className='laptop:w-[255px] phone:w-[95%]  '>
<div className=' w-full h-[220px]'>
    <img className=' w-full  h-full rounded-lg  object-cover' src={room?.images[1]?.image} alt="" />
</div>

{/* ----room-- info--- */}
<div className=' mt-6'>

<div className=''>


    <p className=' phone:text-[18px] font-semibold laptop:text-xl hovtxt'>{room?.adress}</p>

</div>

<div className='my-6 phone:text-[22px] font-semibold laptop:text-xl hovtxt'>
    <p>{room?.price}/night</p>
</div>



<div>


{/* -----Rating----- */}

<div className=' flex gap-2'>

<div><img className='w-8 h-8' src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png" alt="" /></div>


<div><img className='w-8 h-8' src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png" alt="" /></div>

<div><img className='w-8 h-8' src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png" alt="" /></div>

<div><img className='w-8 h-8' src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png" alt="" /></div>

<div><img className='w-8 h-8' src="https://cdn0.iconfinder.com/data/icons/interface-line-4/48/Favorite_star_rate-256.png" alt="" /></div>


</div>


<div>
    <p className=' ml-4 mt-4 font-semibold hovtxt'>(0 Reviews)</p>
</div>


{/* ----details button --- */}

<div>
    <div>
        <Link href={`/room/${room?.id}`}>
        <p  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full inline-block w-full mt-2 text-center'>Details</p>
        </Link>
    </div>

</div>


</div>




</div>





        
       </div>
    );
}

export default RoomCard;
