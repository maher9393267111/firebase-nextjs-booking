import React from 'react';

const RoomCard = ({room}) => {

console.log('CARD-------->',room);

    return (
       <div className='laptop:w-[255px] phone:w-[90%]  '>
<div className=' w-full h-[220px]'>
    <img className=' w-full  h-full rounded-lg  object-cover' src={room?.images[1]?.image} alt="" />
</div>


        
       </div>
    );
}

export default RoomCard;
