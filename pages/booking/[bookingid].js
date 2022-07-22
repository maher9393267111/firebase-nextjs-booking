import React from 'react';
import {useRouter} from 'next/router';


const Bookingid = () => {

    const router = useRouter();
    const {bookingid} = router.query;
    console.log(bookingid);


    return (
        <div>

            <h1>Bookingid {bookingid}</h1>
            
        </div>
    );
}

export default Bookingid;
