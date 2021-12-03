import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import RoomDetailModal from './roomDetailModal';

export default function Rooms(props) {
    console.log('puupp', props);
    const [Rooms, setRooms] = useState([])
    const [roomDetailsId, setRoomDetailsId] = useState()

    // api-key - 644406a7918f871f3a8568c58e56e77b
    // 1993 - hotel_id
    // 17-11-2021 - check-in
    // 18-11-2021 - checkout
    // replace this dynamic url 
        // `${process.env.NEXT_PUBLIC_HOST_BE}/bookingEngine/get-inventory/644406a7918f871f3a8568c58e56e77b/${props.search[0]}/${props.search[2]}/${props.search[3]/INR`
    const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/bookingEngine/get-inventory/644406a7918f871f3a8568c58e56e77b/1993/17-11-2021/18-11-2021/INR`).then(response => {
        return response.data.data
      })
      .catch(error => {
          console.log('error', error);
      });

    fetcher.then(response => {
        if(Rooms.length == 0 ) {
            setRooms(response)
        }
    })

    const handleClick = (id, max_people, rack_price, room_type) => {
        setRoomDetailsId(id);
        var storage = {"room_type": id, "hotel_id": 2881, "room_type_name": room_type, "max_people": max_people, "rack_price": rack_price}
        localStorage.setItem("selectedRoom", JSON.stringify(storage)); 
      
    }
   
    function myFunctionNew() {
        // var dots = document.getElementById("dots");
        // var moreText = document.getElementById("more");
        // var btnText = document.getElementById("myBtn");
      
        // if (dots.style.display === "none") {
        // dots.style.display = "inline";
        // btnText.innerHTML = "View More Rooms"; 
        // moreText.style.display = "none";
        // } else {
        // dots.style.display = "none";
        // btnText.innerHTML = "View Less Rooms"; 
        // moreText.style.display = "inline";
        // }
    }

    return (
        <>
        <div className="roomes-at-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Roomes at the {props.name}</h3>
            </div>
          </div>
          <div className="packages-filter roomes-at-box-con">
            <div className="row">
                {Rooms.map((slide, index1)=>{
                    let amenities = slide.allImages
                    return (
                        <div className="col-md-4" key={index1}>
                            <div className="rooms-box">
                                <div className="room-slider">
                                    <div id="carousel2_indicator" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                        {amenities.map((image, index2)=>{ 
                                            return (   
                                                <div className="carousel-item active" key={index2}> 
                                                    <img className="d-block w-100" src={'https://d3ki85qs1zca4t.cloudfront.net/bookingEngine/'+ image.image_name} alt="First slide" /> 
                                                </div>
                                            )
                                        })}
                                        </div>
                                    </div>
                                    <div className="r-photo-counter">{slide.allImages.length} Photos <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                                </div>
                                <h4>{slide.room_type}</h4>
                                <div className="room-content">
                                    <div className="room-dertails">
                                    <ul>
                                        <li><span><img src="/Images/hotels/icons/sq-ft.png" alt="" title=""/></span>144sq.ft </li>
                                        <li><span><img src="/Images/hotels/icons/bed.png" alt="" title=""/></span>{slide.bed_type} Bed</li>
                                    </ul>
                                    </div>
                                    <div className="room-am">
                                    <ul>
                                        {slide.room_amenities.map((amenities, index3)=>{ 
                                            return(
                                                <li key={index3}>{amenities.hotel_amenities_name}</li>
                                            )
                                        })}
                                    </ul>
                                    </div>
                                    <div className=" room-box-footer">
                                    <ul className="row">
                                        <li className="col-6">
                                            <button onClick={() => handleClick(slide.room_type_id, slide.max_people, slide.rack_price, slide.room_type)} id={slide.room_type_id}
                                            >More Details</button>
                                        </li>
                                        <li className="col-6"><a href="../hotel-booking">Book Now</a></li>
                                    </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            
            <div className="text-center">
              <button onClick={myFunctionNew()} id="myBtn" className="more-rooms">View More Rooms</button> 
            </div>
          </div>
        </div>
        </div>

        {roomDetailsId &&  <RoomDetailModal id={roomDetailsId} />}
       
        </>
    )
}

