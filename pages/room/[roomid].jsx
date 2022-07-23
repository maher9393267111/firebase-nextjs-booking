import React from 'react';
import Layout from '../../components/global/Layout';
import RoomDetail from '../../components/room/roomDetail';
import { useRouter } from 'next/router';
import { db } from '../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import {  doc } from "firebase/firestore";
import { Moment } from 'moment';


const Roomid = () => {

    const router = useRouter()
    const {roomid} = router.query
    //console.log(roomid)
    
    const [room] = useDocumentData( roomid !== undefined ?   doc(db, "rooms", roomid) : null);
    
    //console.log('room :::: ',room)


    return (
     <Layout>
        
        
<div>
    <RoomDetail room={room} roomId={roomid} />
</div>


     </Layout>
    );
}

export default Roomid;
