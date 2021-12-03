import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import axios from 'axios';

const HotelBooking = () => {

    /* var selectedRoom = window.localStorage.getItem('selectedRoom');
    
    console.log(selectedRoom); */
    const [HotelDetails, setHotelDetails] = useState([]);

    // const fetch  = axios.get(`${process.env.BE_PUBLIC_HOST}/hotel-details?hotel_id=${selectedRoom.hotel_id}`).then(response => {
    //     return response.data.data
    //   })
    //   .catch(error => {
    //       console.log('error', error);
    //   });

    //   fetch.then(response => {
    //     if(HotelDetails && HotelDetails.length == 0 ) {
    //         setHotelDetails(response)
    //     }
    // })
    //     console.log(HotelDetails);

    return (
        <>
            <Header></Header>
            <div className="inner-page-wrapper">
                <div className="hotel-booking">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                        <div className="booking-left">
                            <div className="booking-page-box row">
                            <div className="col-sm-3">
                                <figure><img src="/Images/hotels/booking-img.jpg" alt="" title=""/></figure>
                            </div>
                            <div className="col-sm-9">
                                <div className="right">
                                <h4>The Signature Inn</h4>
                                <h5><i className="fa fa-map-marker" aria-hidden="true"></i> #479, O.T.C Road, Near Mastaan Dargha, Cottonpet, Majestic</h5>
                                <h6><span>4.1/5</span></h6>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="booking-page-box-2">
                            <div className="row">
                            <div className="col-md-3">
                                <p>Chek In</p>
                                <h5>Tue, 05 Oct 2021</h5>
                                <p>12:00PM</p>
                            </div>
                            <div className="col-md-3">
                                <p>Chek In</p>
                                <h5>Tue, 05 Oct 2021</h5>
                                <p>12:00PM</p>
                            </div>
                            <div className="col-md-3">
                                <p>Chek In</p>
                                <h5>Tue, 05 Oct 2021</h5>
                                <p>12:00PM</p>
                            </div>
                            </div>
                        </div>
                        <div className="booking-page-box-3">
                            <div className="booking-page-box-3-heading">
                            <h4>1Room for 2 Adults</h4>
                            <h6>Great Choice! You are saving <i className="fa fa-inr" aria-hidden="true"></i> 383 with your booking</h6>
                            </div>
                            <div className="booking-page-box-3-content">
                            <ul>
                                <li>
                                <h5>1 x Deluxe Non AC Room</h5>
                                </li>
                                <li><img src="/Images/hotels/icons/adult.png" title="" alt=""/><span>2 Adults</span><br/>
                                <span>Room only</span> | <span><a href="#">Free Cancellation</a></span></li>
                                <li><a href="#">View Booking & Cancellation Policy</a></li>
                            </ul>
                            </div>
                        </div>
                        <div className="guest-detail">
                            <h4>Guest Details</h4>
                            <form className="row">
                            <div className="col-sm-2">
                                <label>Title</label>
                                <select>
                                <option>Mr</option>
                                <option>Mrs</option>
                                </select>
                            </div>
                            <div className="col-sm-5">
                                <label>First Name</label>
                                <input type="text" placeholder=""/>
                            </div>
                            <div className="col-sm-5">
                                <label>Last Name</label>
                                <input type="text" placeholder=""/>
                            </div>
                            <div className="col-md-12"> <a href="">Add Guest</a> </div>
                            <div className="col-sm-12">
                                <label>Email Address(Your booking voucher will be sent to this emal address)</label>
                                <input type="text" placeholder=""/>
                            </div>
                            <div className="col-sm-12">
                                <label>Mobile Number</label>
                                <input type="text" placeholder=""/>
                            </div>
                            <div className="col-sm-12">
                                <input type="checkbox"/>
                                <label>Enter GST Details (Optional)</label>
                            </div>
                            </form>
                        </div>
                        </div>
                        <div className="col-md-4">
                        <div className="booking-page-right">
                            <h4>Price Break-up</h4>
                            <ul className="price-breakup">
                            <li>
                                <h6>1Room * 1Night</h6>
                                Base Price <span className="price">1.049</span></li>
                            <li>
                                <h6>Total Discount 
                                <a href="#" className="information"><i className="fa fa-info" aria-hidden="true"></i>
                                <div className="information-box">
                                    <span className="icon"><img src="/Images/icons/comment-ic.png" alt="" title="" /></span>
                                    <h6><i className="fa fa-info" aria-hidden="true"></i>Total Discount</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div> 
                                </a>
                            </h6>
                                <span className="price">329</span></li>
                            <li>
                                <h6>Price after Discount </h6>
                                <span className="price">720</span></li>
                            <li>
                                <h6>Service Fees <a href="#" className="information"><i className="fa fa-info" aria-hidden="true"></i>
                                <div className="information-box">
                                    <span className="icon"><img src="/Images/icons/comment-ic.png" alt="" title="" /></span>
                                    <h6><i className="fa fa-info" aria-hidden="true"></i>Service Fees</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div> 
                                </a></h6>
                                <span className="price">45</span></li>
                            <li>
                                <h6>Donate 10 for COVID-19 <a href="#" className="information"><i className="fa fa-info" aria-hidden="true"></i>
                                <div className="information-box">
                                    <span className="icon"><img src="/Images/icons/comment-ic.png" alt="" title="" /></span>
                                    <h6><i className="fa fa-info" aria-hidden="true"></i>Donate 10 for COVID-19</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div> 
                                </a><br/>
                                Relief and other charity Initiatives T&Cs </h6>
                                <span className="price">10</span></li>
                            <li>
                                <h6>Total Amount to be paid</h6>
                                <span className="price">775</span></li>
                            </ul>
                        </div>
                        <div className="booking-supperoffers">
                            <ul className="price-breakup">
                            <li>
                                <h6>ROMT Super Offer</h6>
                                <strong>Congratulation You have saved 110 with ROMT Super Offer</strong> <span className="price">1.049</span></li>
                            </ul>
                        </div>
                        <div className="booking-promocode">
                            <input type="text" placeholder="Got A Promocode?"/>
                            <button>Apply</button>
                        </div>
                        <div className="booking-buttons">
                            <button>Proceed for Payment Option</button>
                            <a href="#">Login now to book the room</a> </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default HotelBooking;
