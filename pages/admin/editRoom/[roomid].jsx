import React from 'react';
import {useRouter} from 'next/router'
import UpdateForm from '../../../components/admin/updateRoom'
import Layout from '../../../components/admin/Adminlayout'
import { db } from '../../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import {  doc } from "firebase/firestore";
 const Uproom  = () => {
const router = useRouter()
const {roomid} = router.query
//console.log(roomid)

const [room] = useDocumentData( roomid !== undefined ?   doc(db, "rooms", roomid) : null);

console.log('room ',room)


    return (
        <Layout>as
{room?.price}


           <UpdateForm roomid={roomid} room={room}/> 
            

        </Layout>
    );
}

export default Uproom;
