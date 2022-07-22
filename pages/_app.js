import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react'
import Context from '../context/index'
import React, {useState, useEffect} from 'react';


import 'antd/dist/antd.css'


function MyApp({ Component, pageProps }) {

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);  

  if (isSSR) return null;



  return (
    <React.Fragment>

<ChakraProvider>
    
    <Context>
      
    
      {/* <Layout>  */}
      <ToastContainer/>
    
    <Component {...pageProps} />
    
      {/* </Layout> */}
   
    </Context>
    
    </ChakraProvider>
   
    </React.Fragment>
  )
}

export default  MyApp;