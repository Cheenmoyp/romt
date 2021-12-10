import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import Rooms from '../rooms';
import Search from '../../components/search/search';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

const HotelDetails = (response) => {
  return (
    <>
    <Header></Header>
    <div className="inner-page-wrapper">
      <div className="inner-page-search-con">
        <div className="search-con">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
				<Search cityname={response.search[1] && response.search[1]} checkin={response.search[2] && response.search[2]} checkout={response.search[3] && response.search[3]}/>
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
                <li><a href="#">Hotels in {response.hoteldata.city_name}</a></li>
                <li>{response.hoteldata.hotel_name}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="heading-group-2">
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <h2>{response.hoteldata.hotel_name}</h2>
              <p>
                  <div
                  dangerouslySetInnerHTML={{
                    __html: response.hoteldata && response.hoteldata.hotel_description,
                  }}
                />
              </p>
            </div>
            <div className="col-md-3">
              <div className="hotel-sharing">
                <ul>
                  <li><a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i></a></li>
                  <li><a href="#"><i className="fa fa-share-alt" aria-hidden="true"></i></a></li>
                  <li className="h-rating"><a href="#"><i className="fa fa-star-o" aria-hidden="true"></i> {response.hoteldata.star}/5</a></li>
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
                    <figure> <img src={response.hoteldata.image} alt="" title="" /> </figure>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="hotel-detail-bannerbox hotel-gallery">
                    <figure> <a href="#" data-toggle="modal" data-target="#hotelphotos"><img src={response.hoteldata.image} alt="" title=""/></a>
                      <h3><a href="#">25+ Photos</a></h3>
                    </figure>
                  </div>
                  <div className="hotel-detail-bannerbox hotel-video">
                    <figure> <a href="#" className="v-button" data-toggle="modal" data-src="https://youtu.be/X4p4dFHDQgE" data-target="#videoModal"><img src={response.hoteldata.image} alt="" title=""/></a>
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
                      <h4><i className="fa fa-inr" aria-hidden="true"></i> {response.hoteldata.starting_price}</h4>
                      <p>+19 taxes & fees<br/>
                        1 room per night</p>
                    </div>
                    <div className="col-5">
                      <p>{response.hoteldata.max_guest} * Guests<br/>
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
                <h4>Facilities at the {response.hoteldata.hotel_name}</h4>
                <p>Facilities here have been <span>rated {response.hoteldata.star} by 1652 guest</span></p>
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
      <Rooms name={response.hoteldata.hotel_name} room_id={response.hoteldata.hotel_id} search={response.search}/>
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
                  <h4>{response.hoteldata.star}/5</h4>
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
            <h3>FAQ&apos;s About {response.hoteldata.hotel_name}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
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

export async function getServerSideProps(context) {
  
  let url_param = base64_decode(context.params.url).split("/");
    // Fetch data from external API
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_BE}/hotel-details?hotel_id=${url_param[0]}`
    );

    const response = await res.json()
    return { props:  {hoteldata : response.hotel_data, search: url_param} };
}

export default HotelDetails;
