import React from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
const Sidebar = () => {

// path name find
const router = useRouter();
const pathname = router.pathname;
//console.log(pathname);

    return (
     <div>
        <div className=' rounded-lg border-2 border-blue-800 min-h-[400px]  phone:w-full laptop:w-2/3'>


<ul className= ' font-bold mt-8 text-center'>

<li className={ ` my-6`}> <Link
 
href='/admin/dashboard'><p
className={ `${pathname === '/admin/dashboard' ? 'text-blue-400' : ''} cursor-pointer my-6`}
>Create Room</p></Link></li>


<li className='my-6'><Link href='/admin/orders'>
<p
className={ `${pathname === '/admin/orders' ? 'text-blue-400' : ''} cursor-pointer my-6`}
>Orders</p>
    
    </Link></li>


<li><Link href='/admin/users'><p
className={ `${pathname === '/admin/users' ? 'text-blue-400' : ''} cursor-pointer my-6`}
>All Users</p>
    
    </Link></li>





</ul>



        </div>



     </div>
    );
}

export default Sidebar;
