import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import HotelDetailData from '../services/ourHotelData';

const HotelDetails = (props) => {
  console.log(props);
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
    <Header></Header>
    <div className="inner-page-wrapper">
      <div className="inner-page-search-con">
        <div className="search-con">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <form>
                  <div className="form-control">
                    <input type="text" placeholder="What are you looking for?" />
                  </div>
                  <div className="form-control">
                    <input id="datepicker" type="text" className="datepicker" data-zdp_readonly_element="false" placeholder="Check In" />
                  </div>
                  <div className="form-control">
                    <input id="datepicker" type="text" className="datepicker" data-zdp_readonly_element="false" placeholder="Check Out" />
                  </div>
                  <div className="form-control dropdown-box">
                    <select>
                      <option>Adult</option>
                    </select>
                  </div>
                  <div className="form-control" style={{border: "none"}}>
                    <select>
                      <option>Kids</option>
                    </select>
                  </div>
                  <button className="site-button"> Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bred-crumb-ec">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul className="h-bred-crumb">
                <li><a href="#">Home</a></li>
                <li><a href="#">Hotels in Bangalore</a></li>
                <li>The Signature Inn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="heading-group-2">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h2>Signature Inn</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            </div>
            <div className="col-md-3">
              <div className="hotel-sharing">
                <ul>
                  <li><a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i></a></li>
                  <li><a href="#"><i className="fa fa-share-alt" aria-hidden="true"></i></a></li>
                  <li className="h-rating"><a href="#"><i className="fa fa-star-o" aria-hidden="true"></i> 4.9/5</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hotel-details-banner">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-8">
                  <div className="hotel-detail-bannerbox">
                    <figure> <img src="/Images/hotels/img-1.jpg" alt="" title="" /> </figure>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hotel-detail-bannerbox hotel-gallery">
                    <figure> <a href="#" data-toggle="modal" data-target="#hotelphotos"><img src="/Images/hotels/img-1.jpg" alt="" title=""/></a>
                      <h3><a href="#">25+ Photos</a></h3>
                    </figure>
                  </div>
                  <div className="hotel-detail-bannerbox hotel-video">
                    <figure> <a href="#" className="v-button" data-toggle="modal" data-src="https://youtu.be/X4p4dFHDQgE" data-target="#videoModal"><img src="/Images/hotels/img-1.jpg" alt="" title=""/></a>
                      <h4 className="video"><a href="#" className="v-button" data-toggle="modal" data-src="https://youtu.be/X4p4dFHDQgE" data-target="#videoModal"><i className="fa fa-play" aria-hidden="true"></i><br/>
                        <span>Video</span> </a></h4>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="h-detail-banner-right">
                <div className="hd1">
                  <h3>Login & Get
                    The Best Deals & Price</h3>
                </div>
                <ul>
                  <li>Safe and hygienic places</li>
                  <li>Active Social Distance</li>
                  <li>Guest & Staff Temperature check</li>
                  <li>Safe kitchen practices</li>
                </ul>
                <div className="price">
                  <div className="row">
                    <div className="col-7">
                      <h6>Price starts at</h6>
                      <h4><i className="fa fa-inr" aria-hidden="true"></i> 848</h4>
                      <p>+19 taxes & fees<br/>
                        1 room per night</p>
                    </div>
                    <div className="col-5">
                      <p>2 * Guests<br/>
                        1 * Room</p>
                    </div>
                  </div>
                  <a href="#view-available-rooms">View available rooms</a> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hotel-facilities">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="heading-group-2">
                <h4>Facilities atthe signature Inn</h4>
                <p>Facilities here have been <span>rated 3.9 by 1652 guest</span></p>
              </div>
            </div>
          </div>
          <div className="facilitis-with-icon">
            <ul className="row">
              <li className="col"><span className="icon"><img src="/Images/hotels/icons/Free-Parking.png" alt="" title="Free Parking" /></span>Free Parking</li>
              <li className="col"><span className="icon"><img src="/Images/hotels/icons/Wi-Fi.png" alt="" title="Free Wi-Fi" /></span>Free Wi-Fi</li>
              <li className="col"><span className="icon"><img src="/Images/hotels/icons/ElevatorLift.png" alt="" title="Elevator/Lift" /></span>Elevator/Lift</li>
              <li className="col"><span className="icon"><img src="/Images/hotels/icons/AirConditioning.png" alt="" title="Air Conditioning" /></span>Air Conditioning</li>
              <li className="col"><span className="icon"><img src="/Images/hotels/icons/RoomServices.png" alt="" title="Room Services" /></span>Room Services</li>
            </ul>
          </div>
          <div className="row amenities">
            <div className="col">
              <div className="amenities-box">
                <h4>Safety and Hygiene</h4>
                <ul>
                  <li>Thermal Screening</li>
                  <li>Sanitizers installed</li>
                  <li>Contactless room service</li>
                  <li>Contactles check-in</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="amenities-box">
                <h4>Safety and Hygiene</h4>
                <ul>
                  <li>Thermal Screening</li>
                  <li>Sanitizers installed</li>
                  <li>Contactless room service</li>
                  <li>Contactles check-in</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="amenities-box">
                <h4>Safety and Hygiene</h4>
                <ul>
                  <li>Thermal Screening</li>
                  <li>Sanitizers installed</li>
                  <li>Contactless room service</li>
                  <li>Contactles check-in</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="amenities-box">
                <h4>Safety and Hygiene</h4>
                <ul>
                  <li>Thermal Screening</li>
                  <li>Sanitizers installed</li>
                  <li>Contactless room service</li>
                  <li>Contactles check-in</li>
                </ul>
              </div>
            </div>
            <div className="col">
              <div className="amenities-box">
                <h4>Safety and Hygiene</h4>
                <ul>
                  <li>Thermal Screening</li>
                  <li>Sanitizers installed</li>
                  <li>Contactless room service</li>
                  <li>Contactles check-in</li>
                </ul>
              </div>
            </div>
            <div className="col-md-12"> <a href="#" className="all-amenities">All 28 amenities</a> </div>
          </div>
        </div>
      </div>
      <div  id="view-available-rooms"></div>
      <div className="roomes-at-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Rooms at the Signature INN</h3>
            </div>
          </div>
          <div className="packages-filter roomes-at-box-con">
            <div className="row">
              <div className="col-md-4">
                <div className="rooms-box">
                  <div className="room-slider">
                    <div id="carousel2_indicator" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner">
                        <div className="carousel-item active"> <img className="d-block w-100" src="/Images/hotels/room.jpg" alt="First slide" /> </div>
                        <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-2.jpg" alt="Second slide" /> </div>
                        <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-3.jpg" alt="Third slide" /> </div>
                      </div>
                      <a className="carousel-control-prev" href="#carousel2_indicator" role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next" href="#carousel2_indicator" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a> </div>
                    <div className="r-photo-counter">6 Photos <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                  </div>
                  <h4>Deluxe Non AC Room</h4>
                  <div className="room-content">
                    <div className="room-dertails">
                      <ul>
                        <li><span><img src="/Images/hotels/icons/sq-ft.png" alt="" title=""/></span>144sq.ft </li>
                        <li><span><img src="/Images/hotels/icons/bed.png" alt="" title=""/></span>King Bed</li>
                      </ul>
                    </div>
                    <div className="room-am">
                      <ul>
                        <li>Free Wi-Fi</li>
                        <li>Room Service</li>
                        <li>Mineral Water- additional charge</li>
                        <li>Daily Housekeeping</li>
                        <li>Bathroom</li>
                        <li>in-room Dining</li>
                      </ul>
                    </div>
                    <div className=" room-box-footer">
                      <ul className="row">
                        <li className="col-6"><a href="#" data-toggle="modal" data-target="#RoomDetails" >More Details</a></li>
                        <li className="col-6"><a href="hotel-booking.php">Book Now</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="rooms-box">
                  <div className="room-slider">
                    <div id="carousel2_indicator" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner">
                        <div className="carousel-item active"> <img className="d-block w-100" src="/Images/hotels/room.jpg" alt="First slide" /> </div>
                        <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-2.jpg" alt="Second slide" /> </div>
                        <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-3.jpg" alt="Third slide" /> </div>
                      </div>
                      <a className="carousel-control-prev" href="#carousel2_indicator" role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next" href="#carousel2_indicator" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a> </div>
                    <div className="r-photo-counter">6 Photos <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                  </div>
                  <h4>Deluxe Non AC Room</h4>
                  <div className="room-content">
                    <div className="room-dertails">
                      <ul>
                        <li><span><img src="/Images/hotels/icons/sq-ft.png" alt="" title=""/></span>144sq.ft </li>
                        <li><span><img src="/Images/hotels/icons/bed.png" alt="" title=""/></span>King Bed</li>
                      </ul>
                    </div>
                    <div className="room-am">
                      <ul>
                        <li>Free Wi-Fi</li>
                        <li>Room Service</li>
                        <li>Mineral Water- additional charge</li>
                        <li>Daily Housekeeping</li>
                        <li>Bathroom</li>
                        <li>in-room Dining</li>
                      </ul>
                    </div>
                    <div className=" room-box-footer">
                      <ul className="row">
                        <li className="col-6"><a href="#" data-toggle="modal" data-target="#RoomDetails" >More Details</a></li>
                        <li className="col-6"><a href="hotel-booking.php">Book Now</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="rooms-box">
                  <div className="room-slider">
                    <div id="carousel2_indicator" className="carousel slide" data-ride="carousel">
                      <div className="carousel-inner">
                        <div className="carousel-item active"> <img className="d-block w-100" src="/Images/hotels/room.jpg" alt="First slide" /> </div>
                        <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-2.jpg" alt="Second slide" /> </div>
                        <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-3.jpg" alt="Third slide" /> </div>
                      </div>
                      <a className="carousel-control-prev" href="#carousel2_indicator" role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next" href="#carousel2_indicator" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a> </div>
                    <div className="r-photo-counter">6 Photos <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                  </div>
                  <h4>Deluxe Non AC Room</h4>
                  <div className="room-content">
                    <div className="room-dertails">
                      <ul>
                        <li><span><img src="/Images/hotels/icons/sq-ft.png" alt="" title=""/></span>144sq.ft </li>
                        <li><span><img src="/Images/hotels/icons/bed.png" alt="" title=""/></span>King Bed</li>
                      </ul>
                    </div>
                    <div className="room-am">
                      <ul>
                        <li>Free Wi-Fi</li>
                        <li>Room Service</li>
                        <li>Mineral Water- additional charge</li>
                        <li>Daily Housekeeping</li>
                        <li>Bathroom</li>
                        <li>in-room Dining</li>
                      </ul>
                    </div>
                    <div className=" room-box-footer">
                      <ul className="row">
                        <li className="col-6"><a href="#" data-toggle="modal" data-target="#RoomDetails" >More Details</a></li>
                        <li className="col-6"><a href="hotel-booking.php">Book Now</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span id="dots"></span>
            <div id="more">
              <div className="row">
                <div className="col-md-4">
                  <div className="rooms-box">
                    <div className="room-slider">
                      <div id="carousel2_indicator" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                          <div className="carousel-item active"> <img className="d-block w-100" src="/Images/hotels/room.jpg" alt="First slide" /> </div>
                          <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-2.jpg" alt="Second slide" /> </div>
                          <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-3.jpg" alt="Third slide" /> </div>
                        </div>
                        <a className="carousel-control-prev" href="#carousel2_indicator" role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next" href="#carousel2_indicator" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a> </div>
                      <div className="r-photo-counter">6 Photos <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                    </div>
                    <h4>Deluxe Non AC Room</h4>
                    <div className="room-content">
                      <div className="room-dertails">
                        <ul>
                          <li><span><img src="/Images/hotels/icons/sq-ft.png" alt="" title=""/></span>144sq.ft </li>
                          <li><span><img src="/Images/hotels/icons/bed.png" alt="" title=""/></span>King Bed</li>
                        </ul>
                      </div>
                      <div className="room-am">
                        <ul>
                          <li>Free Wi-Fi</li>
                          <li>Room Service</li>
                          <li>Mineral Water- additional charge</li>
                          <li>Daily Housekeeping</li>
                          <li>Bathroom</li>
                          <li>in-room Dining</li>
                        </ul>
                      </div>
                      <div className=" room-box-footer">
                        <ul className="row">
                          <li className="col-6"><a href="#" data-toggle="modal" data-target="#RoomDetails" >More Details</a></li>
                          <li className="col-6"><a href="#">Book Now</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="rooms-box">
                    <div className="room-slider">
                      <div id="carousel2_indicator" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                          <div className="carousel-item active"> <img className="d-block w-100" src="/Images/hotels/room.jpg" alt="First slide" /> </div>
                          <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-2.jpg" alt="Second slide" /> </div>
                          <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-3.jpg" alt="Third slide" /> </div>
                        </div>
                        <a className="carousel-control-prev" href="#carousel2_indicator" role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next" href="#carousel2_indicator" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a> </div>
                      <div className="r-photo-counter">6 Photos <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                    </div>
                    <h4>Deluxe Non AC Room</h4>
                    <div className="room-content">
                      <div className="room-dertails">
                        <ul>
                          <li><span><img src="/Images/hotels/icons/sq-ft.png" alt="" title=""/></span>144sq.ft </li>
                          <li><span><img src="/Images/hotels/icons/bed.png" alt="" title=""/></span>King Bed</li>
                        </ul>
                      </div>
                      <div className="room-am">
                        <ul>
                          <li>Free Wi-Fi</li>
                          <li>Room Service</li>
                          <li>Mineral Water- additional charge</li>
                          <li>Daily Housekeeping</li>
                          <li>Bathroom</li>
                          <li>in-room Dining</li>
                        </ul>
                      </div>
                      <div className=" room-box-footer">
                        <ul className="row">
                          <li className="col-6"><a href="#" data-toggle="modal" data-target="#RoomDetails" >More Details</a></li>
                          <li className="col-6"><a href="#">Book Now</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="rooms-box">
                    <div className="room-slider">
                      <div id="carousel2_indicator" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                          <div className="carousel-item active"> <img className="d-block w-100" src="/Images/hotels/room.jpg" alt="First slide" /> </div>
                          <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-2.jpg" alt="Second slide" /> </div>
                          <div className="carousel-item"> <img className="d-block w-100" src="/Images/hotels/room-3.jpg" alt="Third slide" /> </div>
                        </div>
                        <a className="carousel-control-prev" href="#carousel2_indicator" role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next" href="#carousel2_indicator" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a> </div>
                      <div className="r-photo-counter">6 Photos <i className="fa fa-long-arrow-right" aria-hidden="true"></i></div>
                    </div>
                    <h4>Deluxe Non AC Room</h4>
                    <div className="room-content">
                      <div className="room-dertails">
                        <ul>
                          <li><span><img src="/Images/hotels/icons/sq-ft.png" alt="" title=""/></span>144sq.ft </li>
                          <li><span><img src="/Images/hotels/icons/bed.png" alt="" title=""/></span>King Bed</li>
                        </ul>
                      </div>
                      <div className="room-am">
                        <ul>
                          <li>Free Wi-Fi</li>
                          <li>Room Service</li>
                          <li>Mineral Water- additional charge</li>
                          <li>Daily Housekeeping</li>
                          <li>Bathroom</li>
                          <li>in-room Dining</li>
                        </ul>
                      </div>
                      <div className=" room-box-footer">
                        <ul className="row">
                          <li className="col-6"><a href="#" data-toggle="modal" data-target="#RoomDetails" >More Details</a></li>
                          <li className="col-6"><a href="#">Book Now</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button onClick={myFunctionNew()} id="myBtn" className="more-rooms">View More Rooms</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div className="guestreviewssec">
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h3>Guest Reviews & Rating</h3>
          </div>
          <div className="col-md-5">
            <div className="c-review-filter">
              <ul>
                <li>
                  <label>Sort By</label>
                  <select>
                    <option>Most Helpful First</option>
                    <option>Most Helpful First</option>
                  </select>
                </li>
                <li>
                  <label>Filter By</label>
                  <select>
                    <option>See All Reviews</option>
                    <option>See All Reviews</option>
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="guest-review-left row">
              <div className="col-3">
                <div className="rating-counter">
                  <h5>Rating </h5>
                  <h4>3.9/5</h4>
                  <p>259 Ratings<br/>
                    94 Reviews</p>
                </div>
              </div>
              <div className="col-9">
                <ul className="rating-progress-bar">
                  
                  <li><span>5 <i className="fa fa-star" aria-hidden="true"></i></span>
                    <div className="progress">
                      <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" style={{width:"80%"}}>80%</div>
                    </div>
                  </li>

                  <li><span>4 <i className="fa fa-star" aria-hidden="true"></i></span>
                    <div className="progress">
                      <div className="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{width:"60%"}}>60%</div>
                    </div>
                  </li>
                  
                  <li><span>3 <i className="fa fa-star" aria-hidden="true"></i></span>
                    <div className="progress">
                      <div className="progress-bar bg-warning progress-bar-striped progress-bar-animated" style={{width:"50%"}}>50%</div>
                    </div>
                  </li>
                  <li><span>2 <i className="fa fa-star" aria-hidden="true"></i></span>
                    <div className="progress four">
                      <div className="progress-bar bg-warning progress-bar-striped progress-bar-animated" style={{width:"30%"}}>30%</div>
                    </div>
                  </li>
                  
                  <li><span>1 <i className="fa fa-star" aria-hidden="true"></i></span>
                    <div className="progress">
                      <div className="progress-bar bg-danger progress-bar-striped progress-bar-animated" style={{width:"20%"}}>20%</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="review-right">
              <h4>What our guests say?</h4>
              <ul>
                <li><a href="#">Clean room (20)</a></li>
                <li><a href="#">Good Service(22)</a></li>
                <li><a href="#">Awesome stay(21)</a></li>
                <li><a href="#">Clean place(14)</a></li>
                <li><a href="#">+4 More</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="similar-properties">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Similar Properties</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="similar-box current-hotel">
              <h5>Current Hotel</h5>
              <figure><img src="/Images/hotels/room-3.jpg" alt="" title="" /></figure>
              <div className="content">
                <h6>Hotel</h6>
                <h4>The Signature Inn</h4>
                <p>Near Bangolore train Station</p>
                <div className="review">
                  <p><span>4.1/5</span>2953 review</p>
                </div>
                <ul className="amnities">
                  <li><span><img src="/Images/hotels/icons/RoomServices.png" alt="" title=""/></span>Deluxe Non AC Room</li>
                  <li><span><img src="/Images/hotels/icons/Wi-Fi.png" alt="" title=""/></span>Free Internet</li>
                  <li><span><img src="/Images/hotels/icons/room-services-2.png" alt="" title=""/></span>Room Services</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="similar-box">
              <figure><img src="/Images/hotels/room-3.jpg" alt="" title="" /></figure>
              <div className="content">
                <h6>Hotel</h6>
                <h4>The Signature Inn</h4>
                <p>Near Bangolore train Station</p>
                <div className="review">
                  <p><span>4.1/5</span>2953 review</p>
                </div>
                <ul className="amnities">
                  <li><span><img src="/Images/hotels/icons/RoomServices.png" alt="" title=""/></span>Deluxe Non AC Room</li>
                  <li><span><img src="/Images/hotels/icons/Wi-Fi.png" alt="" title=""/></span>Free Internet</li>
                  <li><span><img src="/Images/hotels/icons/room-services-2.png" alt="" title=""/></span>Room Services</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="similar-box">
              <figure><img src="Images/hotels/room-3.jpg" alt="" title="" /></figure>
              <div className="content">
                <h6>Hotel</h6>
                <h4>The Signature Inn</h4>
                <p>Near Bangolore train Station</p>
                <div className="review">
                  <p><span>4.1/5</span>2953 review</p>
                </div>
                <ul className="amnities">
                  <li><span><img src="Images/hotels/icons/RoomServices.png" alt="" title=""/></span>Deluxe Non AC Room</li>
                  <li><span><img src="Images/hotels/icons/Wi-Fi.png" alt="" title=""/></span>Free Internet</li>
                  <li><span><img src="Images/hotels/icons/room-services-2.png" alt="" title=""/></span>Room Services</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="similar-box">
              <figure><img src="Images/hotels/room-3.jpg" alt="" title="" /></figure>
              <div className="content">
                <h6>Hotel</h6>
                <h4>The Signature Inn</h4>
                <p>Near Bangolore train Station</p>
                <div className="review">
                  <p><span>4.1/5</span>2953 review</p>
                </div>
                <ul className="amnities">
                  <li><span><img src="Images/hotels/icons/RoomServices.png" alt="" title=""/></span>Deluxe Non AC Room</li>
                  <li><span><img src="Images/hotels/icons/Wi-Fi.png" alt="" title=""/></span>Free Internet</li>
                  <li><span><img src="Images/hotels/icons/room-services-2.png" alt="" title=""/></span>Room Services</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="hotel-police">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>Hotel Policies</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="list-4">
              <li>According to government regulation, a valid Photo ID has to be carried by every person above the age of staying 18 at the Signature inn. The identification proofs accepted are Drivers License, Voter card, Passport, ration Card. Without valid ID the guest will not be allowed to check in. </li>
              <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
              <li>According to government regulation, a valid Photo ID has to be carried by every person above the age of staying 18 at the Signature inn. The identification proofs accepted are Drivers License, Voter card, Passport, ration Card. Without valid ID the guest will not be allowed to check in. </li>
              <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </li>
              <li>According to government regulation, a valid Photo ID has to be carried by every person above the age of staying 18 at the Signature inn. The identification proofs accepted are Drivers License, Voter card, Passport, ration Card. Without valid ID the guest will not be allowed to check in. </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="hotel-faq">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h3>FAQ&apos;s About The Signature Inn</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="hotel-faq-list">
              <li>Does Hotel The Signature Inn offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does Hotel The Signature Inn offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does Hotel The Signature Inn offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does Hotel The Signature Inn offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does Hotel The Signature Inn offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div className="modal fade hotel-detailmodal" id="hotelphotos" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
      </div>
      <div className="modal-body">
        <section className="gallery">
          <div className="carousel">
            <input type="radio" id="image1" name="gallery-control" checked/>
            <input type="radio" id="image2" name="gallery-control"/>
            <input type="radio" id="image3" name="gallery-control"/>
            <input type="radio" id="image4" name="gallery-control"/>
            <input type="checkbox" id="fullscreen" name="gallery-fullscreen-control"/>
            <div className="wrap">
              <figure>
                <label htmlFor="fullscreen"> <img src="Images/hotels/img-1.jpg" alt="image1"/> </label>
              </figure>
              <figure>
                <label htmlFor="fullscreen"> <img src="Images/hotels/room.jpg" alt="image2"/> </label>
              </figure>
              <figure>
                <label htmlFor="fullscreen"> <img src="Images/hotels/room-2.jpg" alt="image2"/> </label>
              </figure>
              <figure>
                <label htmlFor="fullscreen"> <img src="Images/hotels/room-3.jpg" alt="image3" /> </label>
              </figure>
            </div>
            <div className="thumbnails">
              <div className="slider">
                <div className="indicator"></div>
              </div>
              <label htmlFor="image1" className="thumb" style={{backgroundImage: "url('Images/hotels/img-1.jpg')"}}></label>
              <label htmlFor="image2" className="thumb" style={{backgroundImage: "url('Images/hotels/room.jpg')"}}></label>
              <label htmlFor="image3" className="thumb" style={{backgroundImage: "url('Images/hotels/room-3.jpg')"}}></label>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
    </div>
  
    <div className="modal fade hotel-detailmodal" id="RoomDetails" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
            <h3 className="modal-title" id="lineModalLabel">Deluxe Triple Bed Non AC Room</h3>
          </div>
          <div className="modal-body">
            <div className="room-details-modal-slider">
              <div id="carouselModal_indicator" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  <div className="carousel-item active"> <img className="d-block w-100" src="Images/hotels/room.jpg" alt="First slide"/> </div>
                  <div className="carousel-item"> <img className="d-block w-100" src="Images/hotels/room-2.jpg" alt="Second slide"/> </div>
                  <div className="carousel-item"> <img className="d-block w-100" src="Images/hotels/room-3.jpg" alt="Third slide"/> </div>
                </div>
                <a className="carousel-control-prev" href="#carouselModal_indicator" role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next" href="#carouselModal_indicator" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a> </div>
            </div>
          </div>
          <div className="content">
            <p>Situated in the heart of the town with all modern facilitys & services to create the finest hotel of the town.</p>
            <h4>Room Ameenities</h4>
            <ul className="list-4 row">
              <li className="col-md-4 col-sm-2">Mineral water - additional charge</li>
              <li className="col-md-4 col-sm-2">Room Services</li>
              <li className="col-md-4 col-sm-2">Laundry Service</li>
              <li className="col-md-4 col-sm-2">Closet In-room Dining</li>
              <li className="col-md-4 col-sm-2">Bathroom</li>
              <li className="col-md-4 col-sm-2">Fan </li>
              <li className="col-md-4 col-sm-2">Daily Housekeeping</li>
            </ul>
            <a href="hotel-booking.php" className="book-now">Book Now</a> </div>
        </div>
      </div>
    </div>
    
    <div className="modal fade videomodal" id="videoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
        
            <div className="embed-responsive embed-responsive-16by9">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/X4p4dFHDQgE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  <script>
  {/* //Packages */}
 
  </script>
  
  <Footer></Footer>
    </>
  )
}

export default HotelDetails;
