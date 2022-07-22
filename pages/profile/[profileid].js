import React from 'react';
import {useRouter} from 'next/router';

const Profileid = () => {

    const router = useRouter();
    const {profileid} = router.query;
    console.log(profileid);


    return (
        <div>
            <h1>Profileid {profileid}</h1>
            
        </div>
    );
}

export default Profileid;
