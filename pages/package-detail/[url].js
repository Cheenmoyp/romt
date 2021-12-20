import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import axios from 'axios';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import { useRouter } from 'next/router'
import {
	IconBellRinging2,
	IconX,
	IconPlayerPlay,
	IconChevronRight,
} from "@tabler/icons";
import moment from 'moment';

const PackageDetail = (response) => {
	//console.log('response', response);
    const router = useRouter()
	const [checkAvailability, setCheckAvailability] = useState(true);
    const [location, setLocation] = useState([]);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [hotelId, setHotelId] = useState();
    const [hotelName, setHotelName] = useState('');
    const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-destination-list/2565/TOP`).then(response => {
        return response.data.destinations;
    })
    .catch(error => {
        console.log('error', error);
    });
    fetcher.then(response => {
        if(location.length == 0 ) {
            setLocation(response)
        }
    })

    const handleBookClick = (hotel_id, package_name,hotel_name) => {
        console.log('hihihi', hotel_id);
        setHotelId(hotel_id);
        setHotelName(hotel_name);
        setFormData({'hotel_id':hotel_id});
        setModal(true);
    }

    const addClassName = () => {
        setCheckAvailability(false);
      }
    
    const proceed = () => {
        let url = base64_encode(hotelId);
        router.push(`/payment-package/${url}`);
    }

    var obj = [{}];
    const handleFormChange = (params) => {
        obj.push(params);
        setFormData(obj);
    }
    return (
        <>
        <Header></Header>
            <div className="inner-page-wrapper">
                <div className="package-details-banner">
                    <figure> <img src="/Images/packages/packages-details.jpg" alt="" title=""/> </figure>
                </div>
                <div className="packaage-detail-page-con">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                            <div className="package-page-left">
                                <div className="package-detail-box-left">
                                <div className="package-info">
                                    <h2>{response.packages?response.packages[0].package_name:''} </h2>
                                    <div className="row">
                                    <div className="col-md-12">
                                        <div className="select-hotel-d">
                                        <select>
                                            <option>Select hotel by location</option>
                                            {location.map((locate,index) => {
                                                return (
                                                    <option key={index}>{locate}</option>
                                                )
                                            })}
                                        </select>
                                        </div>
                                    </div>
                                    </div>
                                    
                                    <div className="hotel-to-avail-package">
                                    <div className="row">
                                        <div className="col-md-12 sec-heading">
                                        <h3>Select Hotel to avail this Package</h3>
                                        </div>
                                    </div>
                                    <div className="row">
                                    {response.packages.map((slide,index) => {
                                        return (
                                            <div className="col-md-4 col-sm-6" key={index}>
                                            <div className="box-6">
                                                <figure>
                                                    <a href="#" data-toggle="modal" data-target="#RoomDetails" onClick={() => handleBookClick(slide.hotel_id, slide.package_name)}>
                                                        <img src={slide.image} alt="" title="" /></a>
                                                </figure>
                                                <div className="content">
                                                <h4>
                                                    <a href="#" data-toggle="modal" data-target="#RoomDetails">{slide.hotel_name}</a>
                                                </h4>
                                                <h5>14,999</h5>
                                                </div>
                                                <div className="boo-now-btn"> <a href="#" data-toggle="modal" data-target="#RoomDetails" 
                                                onClick={() => handleBookClick(slide.hotel_id, slide.package_name, slide.hotel_name)}>Book Now</a> </div>
                                            </div>
                                            </div>
                                        )
                                    })}
                                    </div>
                                    </div>
                                    
                                    <div className="package-detail-block-body">
                                    <div className="sec-heading">
                                        <h3>Facilities</h3>
                                    </div>
                                    <ul>
                                        <li><span><img src="/Images/packages/icons/MobileVoucher.png" alt="" title="" /></span>Mobile Voucher</li>
                                        <li><span><img src="/Images/packages/icons/Safe.png" alt="" title="" /></span>ROMT Safe</li>
                                        <li><span><img src="/Images/packages/icons/Swimming.png" alt="" title="" /></span>Swimming Plll</li>
                                        <li><span><img src="/Images/packages/icons/JeepSafari.png" alt="" title="" /></span>Jeep Safari</li>
                                        <li><span><img src="/Images/packages/icons/Camp-Fire.png" alt="" title="" /></span>Camp Fire</li>
                                        <li><span><img src="/Images/packages/icons/free-wifi.png" alt="" title="" /></span>Free WIFI</li>
                                        <li><span><img src="/Images/packages/icons/Housekeeping.png" alt="" title="" /></span>Housekeeping</li>
                                        <li><span><img src="/Images/packages/icons/PowerBackup.png" alt="" title="" /></span>Power Backup</li>
                                    </ul>
                                    </div>
                                    
                                  
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="package-page-right">
                        <div className="container">
                            <div className="row">
                            <div className="col-md-8"></div>
                                <div className="col-md-4">
                                <div className="package-dtils-rbox">
                                    <div className="package-price">
                                    <ul>
                                        <li>
                                        <h3>INR <span>14,999</span></h3>
                                        <span className="off-price">12%off</span></li>
                                        <li>
                                        <p>Per Adult</p>
                                        </li>
                                        <li>
                                        <button data-toggle="modal" data-target="#RoomDetails">Book Now</button>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                                <div className="package-dtils-rbox">
                                    <div className="package-dtils-rbox-form">
                                        <p className="heading">Get in touch with our travel expert</p>
                                        <Form className="getinTouch-form" id="enquiry-form">
                                            <input type="text" placeholder="Your Name" name="name" required="" value=""/>
                                            <input type="email" placeholder="Your Email" name="email" required="" value=""/>
                                            <input type="number" placeholder="Phone" name="phone" className="input-number-without-spinner" required="" value=""/>
                                            <div className="react-datepicker-wrapper">
                                                <div className="react-datepicker__input-container">
                                                    <input type="text" id="enquiry-date-input" name="date_of_travel" placeholder="Choose Date of Travel" className="send-enquiry-calendar" value="" readOnly=""/>
                                                </div>
                                            </div>
                                            <input type="number" placeholder="No of People" name="no_of_people" required="" value=""/>
                                        </Form>
                                        <textarea form="enquiry-form" placeholder="Message" rows="4" name="message" required=""></textarea>
                                        <ul className="terms-conditions">
                                            <li className="tours-icon-tick">We assure the privacy of your contact data.</li>
                                            <li className="tours-icon-tick">This data will only be used by our team to contact you and no other purposes.</li>
                                        </ul>
                                        <button className="track-enquiry-event-button">Send Enquiry</button>
                                    </div>
                                </div>
                                </div>
                                </div>
                                </div>
                                </div>
                        
                                
                            </div>
                        </div>

                        <Modal className="modal fade hotel-detailmodal chek-availability" id="RoomDetails" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" show={modal}>
                            <Modal.Body>
                                
											<Button className="close" onClick={() => setModal(!modal)}>
												<i className="fa fa-close"></i>
											</Button>
                                        <div className="chek-availability-form">
                                        <form className="row">
                                            <div className="col-sm-3">
                                            <label><i className="fa fa-map-marker" aria-hidden="true"></i> {hotelName}</label>
                                            </div>
                                            <div className="col-sm-2">
                                                {/* <input id="datepicker" type="text" className="datepicker" data-zdp_readonly_element="false" placeholder="Check In"/> */}
                                                <DatePicker
                                                    className="form-control"
                                                    dateFormat="dd/MM/yy"
                                                    placeholderText="DD / MM / YY"
                                                    selected=''
                                                    name="new_dateofbirth"
                                                    required
                                                    onChange={(date) => {
                                                    handleFormChange(
                                                        {'date':moment(new Date(date)).format('DD-MM-YYYY')}
                                                    );
                                                    }}
                                                />
                                            </div>
                                            <div className="col-sm-2">
                                                <select 
                                                onChange={(event) => {
                                                handleFormChange(
                                                    {'adult':event.target.value}
                                                );
                                                }}>
                                                    <option>Adult 2</option>
                                                    <option>Adult 3</option>
                                                    <option>Adult 4</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-2">
                                                <select
                                                onChange={(event) => {
                                                    handleFormChange(
                                                        {'kid':event.target.value}
                                                    );
                                                    }}
                                                >
                                                    <option>kids 1</option>
                                                    <option>Adult 2</option>
                                                    <option>Adult 3</option>
                                                </select>
                                            </div>
                                            <div className="col-sm-3">
                                            <div className="button-con" id="proceed-to-payment">
                                                {checkAvailability ? 
                                                    <div className="check-availability-btn">
                                                        <input type="button" id="CheckAvailability" onClick ={()=>setCheckAvailability(false)} name="" value=""/>
                                                    </div>
                                                :
                                                    <>
                                                        <div className="check-availability-btn">
                                                            <input type="button" id="CheckAvailability" name="" value=""/>
                                                        </div>
                                                        <div className="proceed-to-payment available">
                                                            <input type="button" id="CheckAvailability" name="" value="Proceed Now" onClick={()=> proceed()} />
                                                        </div>
                                                    </>
                                                }
                                                
                                                <input type="button" name="" id="proceed-to-payment-btn" value="Proceed to payment" onClick="location.href='payment-package.php'"/>
                                            </div>
                                            </div>
                                        </form>
                                        </div>
                            </Modal.Body>
                        </Modal>
                    {/* </div>
                </div>
            </div> */}
        <Footer></Footer>
    </>
    )
}

export async function getServerSideProps(context) {
    let url_param = base64_decode(context.params.url).split("/");
    // Fetch data from external API
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_BE}/group-package-hotel-list?group_id=${url_param[0]}&package_name=${url_param[1]}`
    );

    const response = await res.json()

    return { props:  {packages : response.package_hotel_list} };
}

export default PackageDetail;
