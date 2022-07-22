import React from 'react';
import { auth, db } from "../../firebase";

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";



const AllRoms = () => {

    const [snapshot] = useCollection(collection(db, "rooms"));
    const rooms = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));



    return (
        <div>

            {rooms?.length}

        </div>
    );
}

export default AllRoms;
