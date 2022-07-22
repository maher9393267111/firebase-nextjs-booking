import React from 'react';
import { auth, db } from "../../firebase";
import {TableContainer,Tab, Tbody, Tr, Th, Td, Thead, Tfoot, Table, TableCaption
,Flex,Box,Spacer

} from '@chakra-ui/react';

import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
;
import SingleTable from './singletabRoom'


const AllRoms = () => {

    const [snapshot] = useCollection(collection(db, "rooms"));
    const rooms = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));



    return (
        <div className='mx-6 phone:w-full overflow-hidden laptop:w-full'>

<TableContainer

width={'70%'}
textAlign={'center'}
>
  <Table variant='simple'>
    {/* <TableCaption>Rooms</TableCaption> */}
    <Thead>
      <Tr>
        <Th>Room Name</Th>
        <Th>iMAGE</Th>
        <Th > 




        </Th>
      </Tr>
    </Thead>
    <Tbody>

{rooms?.map((room,index) => (

    <SingleTable  room={room} key={room?.id}/>


))}



      {/* <Tr>
        <Td>inches</Td>
        <Td>millimetres (mm)</Td>
        <Td >25.4</Td>
        </Tr> */}
    </Tbody>
  
  </Table>
</TableContainer>




        

        </div>
    );
}

export default AllRoms;
