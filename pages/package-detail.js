import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

const PackageDetail = () => {
    return (
        <>
            <Header></Header>
            <div className="inner-page-wrapper" >
                <div className="package-details-banner">
                <figure>
                    <img src="/Images/packages/packages-details.jpg" alt="" title=""/>
                </figure>
                </div>
                <div className="packaage-detail-page-con" >
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="package-detail-box-left">
                            <div className="package-info">
                                <h2>Yercaud, Munnar and Mysore</h2>
                                <div className="package-review">
                                <ul>
                                    <li><span className="banner__avg-rating">4.5 / 5</span>(28 Reviews)</li>
                                    <li><i className="fa fa-clock-o" aria-hidden="true"></i> 6D/5N</li>
                                    <li><i className="fa fa-map-marker" aria-hidden="true"></i> Coorg</li>
                                </ul>
                                </div>
                                <div className="package-detail-block-body">
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
                            <div className="package-detail-box-left">
                            <div className="package-info">
                                <h2>Yercaud Highlights</h2>
                            <ul className="highlight-list">
                                <li>Yercaud, also known as the `&quot;`Jewel of the South`&quot;` is perfect for a getaway, a family vacation, or a simple retreat from daily life</li>
                                <li>At ROME we have various options for you to choose from, to have a great and fun-filled experience</li>
                                <li>To add up to the excitement, you can enjoy an extended stay at `&quot;`Bison Rise - Yercaud`&quot;`.</li>
                                <li>Pay for 2 nights and stay 3 nights! With this package you will receive 1 night free</li>
                            </ul>

                            </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="package-dtils-rbox">
                            <div className="package-price"> 
                                <ul>
                                <li><h3>INR <span>9,999</span></h3><span className="off-price">12%off</span></li>
                                <li><p>Per Adult</p></li>
                                <li><button data-toggle="modal" data-target="#RoomDetails">Book Now</button></li>
                                </ul>
                                
                            </div>
                            </div>
                            <div className="package-dtils-rbox">
                                <div className="package-dtils-rbox-form">
                                    <p className="heading">Get in touch with our travel expert</p>
                                    {/* <form className="getinTouch-form" id="enquiry-form" method="" action=""> */}
                                        <input type="text" placeholder="Your Name" name="name" required="" value=""/>
                                        <input type="email" placeholder="Your Email" name="email" required="" value=""/>
                                        <input type="number" placeholder="Phone" name="phone" className="input-number-without-spinner" required="" value=""/>
                                            <div className="react-datepicker-wrapper">
                                                <div className="react-datepicker__input-container">
                                                    <input type="text" id="enquiry-date-input" name="date_of_travel" placeholder="Choose Date of Travel" className="send-enquiry-calendar" value="" readOnly=""/>
                                                </div>
                                            </div>
                                            <input type="number" placeholder="No of People" name="no_of_people" required="" value=""/>
                                    {/* </form> */}
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
                    
                <div className="hotel-to-avail-package">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12 sec-heading">
                        <h3>Select Hotel to avail this Package</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-2">
                        <div className="box-6">
                            <figure><a href="#" data-toggle="modal" data-target="#RoomDetails">
                                <img src="/Images/packages/the-signature-inn.jpg" alt="" title="" /></a></figure>
                            <div className="content">
                            <h4><a href="#" data-toggle="modal" data-target="#RoomDetails">The Signature Inn</a></h4>
                            <h5>3,700</h5>
                            </div>
                            <div className="boo-now-btn">
                            <a href="#" data-toggle="modal" data-target="#RoomDetails" >Book Now</a>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4 col-sm-2">
                        <div className="box-6">
                            <figure><a href="#">
                                <img src="/Images/packages/TheLeelaPalaceBangalore.jpg" alt="" title="" /></a></figure>
                            <div className="content">
                            <h4><a href="#">The Leela Palace Bangalore</a></h4>
                            <h5>3,700</h5>
                            </div>
                            <div className="boo-now-btn">
                            <a href="#" data-toggle="modal" data-target="#RoomDetails" >Book Now</a>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4 col-sm-2">
                        <div className="box-6">
                            <figure><a href="#">
                                <img src="/Images/packages/SouthernStarBangalore.jpg" alt="" title="" /></a></figure>
                            <div className="content">
                            <h4><a href="#">Southern Star Bangalore</a></h4>
                            <h5>3,700</h5>
                            </div>
                            <div className="boo-now-btn">
                            <a href="#" data-toggle="modal" data-target="#RoomDetails" >Book Now</a>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4 col-sm-2">
                        <div className="box-6">
                            <figure><a href="#">
                                <img src="/Images/packages/SouthernStarBangalore.jpg" alt="" title="" /></a></figure>
                            <div className="content">
                            <h4><a href="#">Southern Star Bangalore</a></h4>
                            <h5>3,700</h5>
                            </div>
                            <div className="boo-now-btn">
                            <a href="#" data-toggle="modal" data-target="#RoomDetails" >Book Now</a>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4 col-sm-2">
                        <div className="box-6">
                            <figure><a href="#">
                                <img src="/Images/packages/the-signature-inn.jpg" alt="" title="" /></a></figure>
                            <div className="content">
                            <h4><a href="#">The Signature Inn</a></h4>
                            <h5>3,700</h5>
                            </div>
                            <div className="boo-now-btn">
                            <a href="#" data-toggle="modal" data-target="#RoomDetails" >Book Now</a>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-4 col-sm-2">
                        <div className="box-6">
                            <figure><a href="#">
                                <img src="/Images/packages/TheLeelaPalaceBangalore.jpg" alt="" title="" /></a></figure>
                            <div className="content">
                            <h4><a href="#">The Leela Palace Bangalore</a></h4>
                            <h5>3,700</h5>
                            </div>
                            <div className="boo-now-btn">
                            <a href="#" data-toggle="modal" data-target="#RoomDetails" >Book Now</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                    
                <div className="write-review-sec">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12">
                            <div className="write-review-box">
                            <div className="row">
                                <div className="co-sm-3">
                                    <h4>Write your review</h4>
                                </div>
                                <div className="col-sm-9">
                                    <p>Please <a href="#">log in</a> to submit a review.</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                        
                <div className="all-reviews">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12">
                            <div className="package-info">
                            <h2>All Reviews</h2>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-sm-6">
                            <div className="package-review-box">
                            <div className="top row">
                                <div className="col-4 Date">06 Jan, 2021</div>
                                <div className="col-4"><figure>
                                    <img src="/Images/client.jpg" alt="" title="" /></figure></div>
                                <div className="col-4 review">
                                <span>Good</span>
                                <div className="review-star">
                                    <img src="/Images/Star-rating.png" alt=""/></div>
                                </div>
                            </div>
                            <h5 className="name">Yashbeer Yashbeer </h5>
                            <div className="content">
                                <p>I visited Coorg last month with my friends and all that we ever wanted is adventure. This property made it to our exeption. There were so many fun activities to enjoy here that we wish we could extend our stay. There was also..</p>
                                <a href="#">Read More</a>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="package-review-box">
                            <div className="top row">
                                <div className="col-4 Date">06 Jan, 2021</div>
                                <div className="col-4"><figure><img src="/Images/client.jpg" alt="" title="" /></figure></div>
                                <div className="col-4 review">
                                <span>Good</span>
                                <div className="review-star"><img src="/Images/Star-rating.png" alt=""/></div>
                                </div>
                            </div>
                            <h5 className="name">Yashbeer Yashbeer </h5>
                            <div className="content">
                                <p>I visited Coorg last month with my friends and all that we ever wanted is adventure. This property made it to our exeption. There were so many fun activities to enjoy here that we wish we could extend our stay. There was also..</p>
                                <a href="#">Read More</a>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                        
                <div className="p-related-stay">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12">
                            <h3 className="heding-btmborder">Related Stay</h3>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12 no-padding">
                            <div id="relatedstay" className="owl-carousel">
                            <div className="post-slide">
                                <div className="relte-box">
                                <figure>
                                    <a href="#"><img src="/Images/packages/AScenicBungalowEscapadeInTheLunch.jpg" alt=""/></a>
                                    <span>Coorg</span>
                                </figure>
                                <div className="content">
                                    <h5><a href="#">A Scenic Bungalow Escapade In The Lunch</a></h5>
                                    <div className="rating">
                                    <ul>
                                    <li><img src="/Images/Star-rating.png" alt="" title="" /></li>
                                    <li>4.5 (24 Review)</li>
                                    </ul>
                                    </div>
                                    <div className="price">1.788 <span className="cut-price">2,000</span></div>
                                </div>
                                </div>
                            </div>
                            <div className="post-slide">
                                <div className="relte-box">
                                <figure>
                                    <a href="#">
                                        <img src="/Images/packages/AScenicBungalowEscapadeInTheLunch.jpg" alt=""/>
                                    </a>
                                    <span>Coorg</span>
                                </figure>
                                <div className="content">
                                    <h5><a href="#">A Scenic Bungalow Escapade In The Lunch</a></h5>
                                    <div className="rating">
                                    <ul>
                                    <li><img src="/Images/Star-rating.png" alt="" title="" /></li>
                                    <li>4.5 (24 Review)</li>
                                    </ul>
                                    </div>
                                    <div className="price">1.788 <span className="cut-price">2,000</span></div>
                                </div>
                                </div>
                            </div>           
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                        
                <div className="p-related-stay related-tours">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12">
                            <h3 className="heding-btmborder">Related Tours</h3>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col-md-12 no-padding">
                            <div id="related-tours" className="owl-carousel">
                            <div className="post-slide">
                                <div className="relte-box">
                                <figure>
                                    <a href="#">
                                        <img src="/Images/packages/AScenicBungalowEscapadeInTheLunch.jpg" alt=""/>
                                    </a>
                                    <span>Coorg</span>
                                </figure>
                                <div className="content">
                                    <h5><a href="#">A Scenic Bungalow Escapade In The Lunch</a></h5>
                                    <div className="rating">
                                    <ul>
                                    <li><img src="/Images/Star-rating.png" alt="" title="" /></li>
                                    <li>4.5 (24 Review)</li>
                                    </ul>
                                    </div>
                                    <div className="price">1.788 <span className="cut-price">2,000</span></div>
                                </div>
                                </div>
                            </div>
                            <div className="post-slide">
                                <div className="relte-box">
                                <figure>
                                    <a href="#"><img src="/Images/packages/AScenicBungalowEscapadeInTheLunch.jpg" alt=""/></a>
                                    <span>Coorg</span>
                                </figure>
                                <div className="content">
                                    <h5><a href="#">A Scenic Bungalow Escapade In The Lunch</a></h5>
                                    <div className="rating">
                                    <ul>
                                    <li><img src="/Images/Star-rating.png" alt="" title="" /></li>
                                    <li>4.5 (24 Review)</li>
                                    </ul>
                                    </div>
                                    <div className="price">1.788 <span className="cut-price">2,000</span></div>
                                </div>
                                </div>
                            </div>           
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                        
                <div className="package-policies">
                <div className="container">
                    <div className="row">
                    <div className="col-md-12">
                        <div className="package-policies-wraper">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="package-info">
                                <h2>A Tranquil Homestay Amidst Cofee plantations in Coorg Polici</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                            <div className="policy-box">
                                <h5>Confirmation Policy</h5>
                                    <ul className="highlight-list">
                                        <li>The customer receives a confirmation voucher via email within 24 hours of successful booking</li>
                                        <li>In case the preferred slots are unavailable, an alternate schedule of the customer’s preference will be arranged and a new confirmation voucher will be sent via email.</li>
                                        <li>Alternatively, the customer may choose to cancel their booking before confirmation and a full refund will be processed.</li>
                                    </ul>
                                    <br/>
                                <h5>Refund Policy</h5>
                                    <ul className="highlight-list">
                                        <li>The applicable refund amount will be processed within 10 business days.</li>
                                        <li>All applicable refunds will be done in the traveler`&apos;`s Thrillophilia wallet as Thrillcash.</li>
                                    </ul>   
                                </div>
                            </div>
                            <div className="col-md-6">
                            <div className="policy-box">
                                <h5>Cancellation Policy</h5>
                                <ul className="highlight-list">
                                        <li>If cancellation are made 30 days before the date of travel then 25.0% of total tour cost will be charged as cancellation fees</li>
                                        <li>If cancellation are made 15 days to 30 days before the date of travel then 50.0% of total tour cost will be charged as cancellation fees</li>
                                        <li>If cancellation are made 0 days to 15 days before the date of travel then 100.0% of total tour cost will be charged as cancellation fees</li>
                                </ul>
                                <br/>
                                <h5>Payment Terms Policy</h5>
                                <ul className="highlight-list">
                                        <li>100.0% of total tour cost will have to be paid 0 days before the date of booking</li>
                                </ul>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                        
                </div>
            </div>

            <div className="modal fade hotel-detailmodal chek-availability" id="RoomDetails" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
                    </div>
                    <div className="modal-body">
                        <div className="chek-availability-form">
                        <form className="row">
                            <div className="col-sm-3">
                            <label><i className="fa fa-map-marker" aria-hidden="true"></i> Signature Inn</label>
                            </div>
                            <div className="col-sm-2">
                            <input id="datepicker" type="text" className="datepicker" data-zdp_readonly_element="false" placeholder="Check In"/>
                            </div>
                            <div className="col-sm-2">
                            <select>
                                <option>Adult 2</option>
                                <option>Adult 3</option>
                                <option>Adult 4</option>
                            </select>
                            </div>
                            <div className="col-sm-2">
                            <select>
                                <option>kids 1</option>
                                <option>Adult 2</option>
                                <option>Adult 3</option>
                            </select>
                            </div>
                            <div className="col-sm-3">
                            <input type="button" id="CheckAvailability" name="" value="Check Availability"/>
                            </div>
                        </form>
                    </div>
                    
                    </div>
                </div>
                </div>
            </div>
        <Footer></Footer>
    </>
    )
}

export default PackageDetail;
