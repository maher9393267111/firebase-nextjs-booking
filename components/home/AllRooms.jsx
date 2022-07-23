import React from 'react';
import RoomCard from './roomCard';
import { useState } from 'react';
import ReactPaginate from "react-paginate";
const AllRooms = ({rooms}) => {


    const [pageNumber, setPageNumber] = useState(0);





    const usersPerPage = 3;
    const pagesVisited = pageNumber * usersPerPage;
  
    const displayRooms = rooms
      .slice(pagesVisited, pagesVisited + usersPerPage)
      .map((room) => {
        return (
          <div key={room.id} className="  mx-8 my-4">
            <RoomCard room={room} />
       
          </div>
        );
      });


      const pageCount = Math.ceil(rooms.length / usersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };




    return ( 
       <div className=' my-12 mx-12'>




<div className="min-h-[300px]  grid phone:grid-cols-1  laptop:grid-cols-3 gap-6">{displayRooms}</div>

    
    {rooms?.length >2 ? 
    (
    <div className=' mt-6'>

    
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />

      </div>
    ) : (null) }


    </div>



        

       
    );
}

export default AllRooms;
