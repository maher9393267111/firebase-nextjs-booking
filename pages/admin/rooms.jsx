import React from 'react';
import Adminlayout from '../../components/admin/Adminlayout';
import AllRoms from '../../components/admin/AllRoms';
const Rooms = () => {
    return (
        <Adminlayout>
        <h1 className=' font-bold text-2xl'>All Rooms</h1>


        <div>
            <AllRoms />
        </div>


    </Adminlayout>
    );
}

export default Rooms;
