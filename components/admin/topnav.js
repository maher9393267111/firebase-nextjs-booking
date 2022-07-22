import React from 'react';
import Link from 'next/link';
const Topnav = () => {
    return (
        <div className=' min-h-[74px] shadow-2xl mb-12'>
            
<div className=' flex  justify-between gap-2 mx-12'>


{/* ----image--- */}
<div> 
    <Link href='/'>
    <img className='h-28 w-28 rounded-full cursor-pointer' src="https://us.123rf.com/450wm/sitiardi21/sitiardi211701/sitiardi21170100013/70276178-hotel-reflection-logo.jpg" alt="" />
    </Link>
</div>



{/* ----text--- */}

<div>
    <h1 className=' mt-10 text-xl font-bold w-3/3 bg-green-700 p-2 text-white cursor-pointer rounded-full '>Admin Dashboard</h1>
</div>


</div>


        </div>
    );
}

export default Topnav;
