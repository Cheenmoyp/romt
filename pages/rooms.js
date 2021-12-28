import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import RoomDetailModal from './roomDetailModal';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from "react-bootstrap/Modal";


export default function Rooms(props) {
	console.log('dateFormat', props);
    let hotel_id = (props && props.search && props.search[0] && props.search[0]) ? props.search[0] : null;
    let checkin = (props && props.search && props.search[2] && props.search[2]) ? props.search[2] : null;
    let checkout = (props && props.search && props.search[3] && props.search[3]) ? props.search[3] : null;
    //console.log(hotel_id, checkin, checkout);
    const [Rooms, setRooms] = useState([]);
    const [roomDetailsId, setRoomDetailsId] = useState();
    const [modal, setModal] = useState(false);
    const [roomDetails, setRoomDetails] = useState();

    const [roomModal, setRoomModal] = useState(true);
    
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
		setRoomModal(true);
      
    }

    const handleAddClick = () => {
        setModal(true);
    }

    const handleRoomDetailsChange = (event) => {
        var obj = {...roomDetails};
        obj[event.target.name] = event.target.value;
        setRoomDetails(obj);
        //console.log(roomDetails.rooms);
    }

    const handleConfirm = () => {
        setModal(false);
    }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

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
              <h3>Rooms at the {props.name}</h3>
            </div>
          </div>
          <div className="packages-filter roomes-at-box-con">
            <div className="row">
                {Rooms.map((slide, index1)=>{
                    let amenities = slide.allImages;
                    let rateplans = slide.rate_plans;
                    return (
                        <div className="col-md-4" key={index1}>
                            <div className="rooms-box">
                                <div className="room-slider">
                                    <div id="carousel2_indicator" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                        <Carousel swipeable={true}
				  draggable={true}
				  infinite={true}
				  responsive={responsive}>
                                        {amenities.map((image, index2)=>{ 
                                            return (   
                                                <div className="" key={index2}> 
                                                    <img className="d-block w-100" src={'https://d3ki85qs1zca4t.cloudfront.net/bookingEngine/'+ image.image_name} alt="First slide" /> 
                                                </div>
                                            )
                                        })}
                                        </Carousel>
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
                                    <div className="more-add">
                                        <ul>
                                            {rateplans.map((rateplan,index4) =>{
                                                return (
                                                    <li key={index4}>
                                                        <div className="row">
                                                            <div className="col-8"><h5>{rateplan.plan_name}</h5></div>
                                                            <div className="col-4">
                                                                <div className="price">
                                                                    <h6>₹ {rateplan.bar_price}</h6>
                                                                    <p>Per room / Night</p>
                                                                    <p>Excluding GST</p>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                            
                                        </ul>
                                    </div>
                                    <div className=" room-box-footer">
                                    <ul className="row">
                                        <li className="col-6">
                                          
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

        <Modal className="modal animate add-room-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="true" show={modal}>
            
			<Modal.Body>
                            <ul className="add-room">
                                <li>
                                    <label className="text-left">No. Of Rooms</label>
                                    <select name="rooms" onChange={ (event) => {
                                                    handleRoomDetailsChange(event)
                                                  }}><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option></select></li>
                                <li>
                                    <div className="multiple-room-wrap row">
                                        <div className="col"><label className="one">Room1</label></div>
                                        <div className="col">
                                            <span>Adults</span>
                                            <select name="adults" onChange={ (event) => {
                                                    handleRoomDetailsChange(event)
                                                  }}>
                                                <option value="0">0</option><option value="2">2</option><option value="3">3</option>
                                            </select>
                                        </div>
                                        <div className="col">
                                            <span>(5 - 12 yrs)</span>
                                            <select name="kids" onChange={ (event) => {
                                                    handleRoomDetailsChange(event)
                                                  }}><option value="0">0</option><option value="1">1</option></select></div>
                                        <div className="col" >
                                            <span>(0 - 5 yrs)</span>
                                            <select name="age" onChange={ (event) => {
                                                    handleRoomDetailsChange(event)
                                                  }}><option value="0">0</option><option value="2">2</option><option value="3">3</option></select>
                                        </div>
                                    </div>
                                </li>
                            </ul>
            </Modal.Body>
            <Modal.Footer>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModal(!modal)}>Cancel</button>
					<button type="button" className="btn btn-primary confirm" data-dismiss="modal" onClick={handleConfirm}>Confirm</button>
				</div>
            </Modal.Footer>
        </Modal>

        {roomDetailsId &&  <RoomDetailModal id={roomDetailsId} roomModal={roomModal} setRoomModal={setRoomModal} rooms={roomDetails && roomDetails.rooms} adults={roomDetails && roomDetails.adults} age={roomDetails && roomDetails.age} kids={roomDetails && roomDetails.kids} hotelid={hotel_id} checkin={checkin} checkout={checkout}/>}
       
        </>
    )
}

