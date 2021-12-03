import Head from 'next/head';
import React, { useState } from 'react';
import axios from 'axios';
import Modal from "react-bootstrap/Modal";
import { useRouter } from 'next/router'


export default function RoomDetailModal(props) {
    const [roomDetails, setRoomDetails] = useState([])

    const fetcherRoomDetails  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/bookingEngine/get-room-info/b8f40b4f2e3d117c167b69aecfcaad10/2881/8249`).then(response => {
        return response.data.data
      })
      .catch(error => {
          console.log('error', error);
      });

    fetcherRoomDetails.then(response => {
        if(roomDetails.length == 0 ) {
            setRoomDetails(response)
        }
    })

    // set data in localstorage
    const router = useRouter();
    const handleBook = () => {
        // var storage = {"room_type": 8249, "hotel_id": 2881, "room_type_name": roomDetails.room_type, }
        // localStorage.setItem("selectedRoom", JSON.stringify(storage)); 

        router.push(`../hotel-booking`);
    }


    return (
        <Modal className="modal fade hotel-detailmodal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" show={true}>
            <Modal.Body>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                    <h3 className="modal-title" id="lineModalLabel">{roomDetails.room_type}</h3>
                    </div>
                    <div className="modal-body">
                        <div className="room-details-modal-slider">
                            <div id="carouselModal_indicator" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active"> 
                                    {roomDetails.image && 
                                        roomDetails.image.map((image, index) => {
                                            return (
                                                <li className="col-md-4 col-sm-2" key={index}>
                                                    <img className="d-block w-100" src={'https://d3ki85qs1zca4t.cloudfront.net/bookingEngine/'+ image.image_name} alt="First slide" width="100%"/> 
                                                </li>
                                            )
                                        })
                                    }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <p>
                                <div dangerouslySetInnerHTML={{
                                        __html: roomDetails.description

                                    }}
                                />
                            </p>
                            <h4>Room Ameenities</h4>
                            <ul className="list-4 row">
                                {roomDetails.room_amenities && 
                                    roomDetails.room_amenities.map((amenities, index) => {
                                        return (
                                            <li className="col-md-4 col-sm-2" key={index}>{amenities.hotel_amenities_name}</li>
                                        )
                                    })
                                }
                            </ul>
                            {/* <a href="../hotel-booking" >Book Now</a>  */}
                            <button className="book-now" onClick={() => handleBook()}>Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
            </Modal.Body>
        </Modal>
    )
}

