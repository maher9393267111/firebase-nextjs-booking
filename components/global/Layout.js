import React from 'react';
import Navbar from './navbar';
import Footer from './footer.jsx';
const Layout = ({children}) => {
    return (
        <div>

<div>
    

<Navbar/>


<div className='  min-h-[80vh]'>
{children}
</div>


<Footer/>

</div>




        </div>
    );
}

export default Layout;
