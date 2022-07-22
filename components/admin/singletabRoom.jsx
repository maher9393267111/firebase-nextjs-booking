import React from 'react';
import {TableContainer,Tab, Tbody, Tr, Th, Td, Thead, Tfoot, Table, TableCaption
    ,Flex,Box,Spacer
    
    } from '@chakra-ui/react';
    import {CloseIcon,DeleteIcon,ArrowUpDownIcon} from '@chakra-ui/icons'
    import Link from 'next/link';
    import { deleteRoom} from '../../utils/db'
const SingletabRoom = ({room}) => {
    return (
        
             <Tr >
        <Td  fontWeight={700}> {room?.location}</Td>
        <Td><div><img
        className='w-20 h-20 rounded-full'
        src={room?.images[0]?.image} alt="" /></div></Td>
        <Td >
        <Flex width={'70%'}>
  <Box p='2' >
    
    <DeleteIcon
    onClick={() => { deleteRoom(room?.id,room)}}
    
    cursor={ 'pointer'} boxSize={6} />
  </Box>
  <Spacer  />
  <Box p='2' >
    <Link href={`/admin/editRoom/${room?.id}`}>
    <ArrowUpDownIcon cursor={ 'pointer'} boxSize={6} />
    </Link>
  </Box>
</Flex>


        </Td>
        </Tr> 
      
    );
}

export default SingletabRoom;
