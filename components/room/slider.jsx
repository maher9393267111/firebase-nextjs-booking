import React, {useState} from 'react';
import {createRef} from "react";
import {Button, Carousel, Col, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import cl from '../styles/slidenav.module.css'



const Slider = ({room}) => {

//const {images} = room;
//console.log('room Slidrer images ',room)


const [kol, setKol]=useState(3)
const carouselRef = createRef()

   

const nextSlide = () => {
    carouselRef.current.next()
}

const prevSlide = () => {
    carouselRef.current.prev()
}



    return (
        <div className='mb-14 '>


{/* // -----flex row  previous arrow 1 span 22 span topics and 1span next arrow- */}
        <Row style={{alignItems: 'center', marginTop: 20, height: 'auto'}}>

            {/* ---- previous arrow---- */}
            <Col span={1}>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<LeftOutlined/>}
                    onClick={prevSlide}
                    className={cl.button_customleft }
                />
            </Col>

            {/* ---- topics---- */}

            <Col span={22}>
                <Carousel 
                autoplay={true}
                slidesToShow={1} ref={carouselRef} dots={false}>
                {room?.images?.map((item) => (
          
            <div className=' w-[300px] phone:h-[330px] laptop:h-[440px]'>
              
             <img className=' w-full h-full object-cover rounded-lg' src={item?.image} alt="" /> 
             
             
            </div>
         
        ))}
                </Carousel>
            </Col>

            {/* ---- next arrow---- */}
            <Col span={1}>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<RightOutlined/>}
                    onClick={nextSlide}
                    className={cl.button_custom}
                />
            </Col>
        </Row>



            
        </div>
    );
}

export default Slider;
