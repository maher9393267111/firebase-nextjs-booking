
import  Sidebar from './sidebar'
import Topnav from './topnav';
const Adminlayout = ({children}) => {
    return (
        <div className=''>

<div>

<div>
    <Topnav />
</div>

{/* grid--- */}

<div className=' mx-10 grid grid-cols-12 gap-16'>
 
{/* ----sidebar--- */}                                     
<div  className='phone:hidden laptop:block  laptop:col-span-3'>

    <Sidebar />
</div>


{/* ---content children--- */}

<div className='phone:col-span-12  laptop:col-span-9'>

 {children}



</div>



</div>








</div>




            
        </div>
    );
}

export default Adminlayout;
