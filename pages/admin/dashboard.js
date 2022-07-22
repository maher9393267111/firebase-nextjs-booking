import React from 'react';
import Adminlayout from '../../components/admin/Adminlayout';
import {useAuth} from '../../context';
import CreateRoom from '../../components/admin/createRoom';
 const Dashboard = () => {
const {userinfo}  = useAuth();


    return (
        <Adminlayout>

<div>


<div className=''>

    <CreateRoom/>

</div>







</div>





            </Adminlayout>
    );
}

export default Dashboard;
