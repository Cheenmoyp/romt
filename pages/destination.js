import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

const Destination = () => {
  return (
    <>
    <Header></Header>
    <div className="inner-page-wrapper">
        <div className="d-page-sec1">
            <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                <h2>Bangalore</h2>
                <h3>40 Hotels</h3>
                <p>Bengaluru (also called Bangalore) is the capital of India`&apos;s southern state Karnataka. The center of India`&apos;s high-tech industry, the city is also known for its parks and nightlife<span id="dots">...</span><span id="more">Bangalore is known to be the Silicon Valley of India. It is the IT hub and is the third-largest city in India. Explore the famous attractions of Bangalore city with a professional guide and visit magnificent architectural sites, popular gardens, and historic monuments. Let the guide take you to all the places you wished to visit in the city and wanted to learn about the history and culture of the place. A perfect self-paced guided tour is now possible with Bangalore tour guide package.</span></p>
                <button onClick="myFunction()" id="myBtn" className="rmore-btn-1">Read more</button>
                </div>
            </div>
            </div>
        </div>
        <div className="destination-page-banner">
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-12"> <img src="/Images/destinations/destinations-vanner.jpg" alt="" title=""/> </div>
            </div>
            </div>
        </div>
        <div className="inner-page-search-con">
            <div className="search-con">
            <div className="container">
                <div className="row">
                <div className="col-md-12">
                    <form>
                    <div className="form-control">
                        <input type="text" placeholder="What are you looking for?"/>
                    </div>
                    <div className="form-control">
                        <input id="datepicker" type="text" className="datepicker" data-zdp_readonly_element="false" placeholder="Check In"/>
                    </div>
                    <div className="form-control">
                        <input id="datepicker" type="text" className="datepicker" data-zdp_readonly_element="false" placeholder="Check Out"/>
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
        <div className="hotel-list">
            <div className="container">
            <div className="row">
                <div className="col-md-3">
                <div className="filter-box">
                    <div className="nav-side-menu">
                    <div className="brand">Filters</div>
                    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>
                    <div className="menu-list">
                        <div id="menu-content" className="menu-content collapse out">
                        <div className="filter-list-con">
                            <h4>Popular Filters</h4>
                            <ul>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1"> Resorts</label>
                                <span>50</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">5 Stars</label>
                                <span>50</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">brigade Road</label>
                                <span>50</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">Home Stay</label>
                                <span>50</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">Hotels</label>
                                <span>50</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">Villas</label>
                                <span>50</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">Hostels</label>
                                <span>50</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">Villas</label>
                                <span>50</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">Guest houses</label>
                                <span>50</span></li>
                            </ul>
                        </div>
                        <div className="filter-list-con">
                            <h4>Star Ratings</h4>
                            <ul>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">1 Star</label>
                                <span>70</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">2 Star</label>
                                <span>30</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">3 Star</label>
                                <span>450</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">4 Star</label>
                                <span>80</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">5 Star</label>
                                <span>80</span></li>
                            </ul>
                        </div>
                        <div className="filter-list-con">
                            <h4>Star Ratings</h4>
                            <ul>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">1 Star</label>
                                <span>70</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">2 Star</label>
                                <span>30</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">3 Star</label>
                                <span>450</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">4 Star</label>
                                <span>80</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">5 Star</label>
                                <span>80</span></li>
                            </ul>
                        </div>
                        <div className="filter-list-con">
                            <h4>Star Ratings</h4>
                            <ul>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">1 Star</label>
                                <span>70</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">2 Star</label>
                                <span>30</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">3 Star</label>
                                <span>450</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">4 Star</label>
                                <span>80</span></li>
                            <li>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <label htmlFor="vehicle1">5 Star</label>
                                <span>80</span></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-md-9">
                <div className="row">
                    <div className="hotel-box2 row">
                    <div className="col-md-4">
                    <figure><img src="/Images/hotels/signature.jpg" alt="" title=""/></figure>
                    </div>
                    <div className="col-md-5">
                    <div className="hotel-box2-content">
                        <div className="rating">
                        <ul>
                            <li><img src="/Images/Star-rating.png" alt="" title=""/></li>
                            <li>311 Ratings</li>
                        </ul>
                        </div>
                        <h3><a href="hotel-details.php">The Signature Inn</a></h3>
                        <div className="distance">
                        <p><span><img src="/Images/hotels/icons/location-icon.png"/></span>3km from Bangalore</p>
                        </div>
                        <div className="content">
                        <p>Located just 800 metres from Bangalore City Railway Station and Gandhi Nagar Bus Station, The Signature Inn operates a
                        24-hour front desk and has an-in house restaurant.</p>
                        </div>
                        <div className="amenities">
                        <ul>
                            <li><span><img src="/Images/packages/icons/Safe.png" alt="" title=""/></span>ROMT Safe</li>
                            <li><span><img src="/Images/packages/icons/free-wifi.png" alt="" title=""/></span>Free WIFI</li>
                            <li><span><img src="/Images/packages/icons/Housekeeping.png" alt="" title=""/></span>Hosekeeping</li>
                            <li><a href="#">+More</a></li>
                        </ul>
                        </div>
                        <div className="hotel-box2-footer">
                        
                        </div>
                    </div>
                    
                    </div>
                    <div className="col-md-3 hotel-box2-right">
                        <ul className="rating">
                        <li><span>4.5/5</span>185 Ratings</li>
                        <li><span className="cut-price">₹ 4300</span>₹ 3,700</li>
                        </ul>
                        <a href="hotel-details.php" className="book-now-btn">Book Now</a>
                    </div>
                </div>
                <div className="hotel-box2 row">
                    <div className="col-md-4">
                    <figure><img src="/Images/hotels/Southern-Star-Bangalore.jpg" alt="" title=""/></figure>
                    </div>
                    <div className="col-md-5">
                    <div className="hotel-box2-content">
                        <div className="rating">
                        <ul>
                            <li><img src="/Images/Star-rating.png" alt="" title=""/></li>
                            <li>311 Ratings</li>
                        </ul>
                        </div>
                        <h3><a href="hotel-details.php">Southern Star Bangalore</a></h3>
                        <div className="distance">
                        <p><span><img src="/Images/hotels/icons/location-icon.png"/></span>3km from Bangalore</p>
                        </div>
                        <div className="content">
                        <p>Just 800 metres from UB City Mall, Southern Star is located on Lavelle Road in Bangalore. The hotel is 500 metres from M. G. Road, Brigade Road and Cubbon Park.</p>
                        </div>
                        <div className="amenities">
                        <ul>
                            <li><span><img src="/Images/packages/icons/Safe.png" alt="" title=""/></span>ROMT Safe</li>
                            <li><span><img src="/Images/packages/icons/free-wifi.png" alt="" title=""/></span>Free WIFI</li>
                            <li><span><img src="/Images/packages/icons/Housekeeping.png" alt="" title=""/></span>Hosekeeping</li>
                            <li><a href="#">+More</a></li>
                        </ul>
                        </div>
                        <div className="hotel-box2-footer">
                         
                        </div>
                    </div>
                    
                    </div>
                    <div className="col-md-3 hotel-box2-right">
                        <ul className="rating">
                        <li><span>4.5/5</span>185 Ratings</li>
                        <li><span className="cut-price">₹ 4300</span>₹ 3,700</li>
                        </ul>
                        <a href="hotel-details.php" className="book-now-btn">Book Now</a>
                    </div>
                </div>
                <div className="hotel-box2 row">
                    <div className="col-md-4">
                    <figure><img src="/Images/hotels/Icon-Premier-Hotel-Bhagini.jpg" alt="" title=""/></figure>
                    </div>
                    <div className="col-md-5">
                    <div className="hotel-box2-content">
                        <div className="rating">
                        <ul>
                            <li><img src="/Images/Star-rating.png" alt="" title=""/></li>
                            <li>311 Ratings</li>
                        </ul>
                        </div>
                        <h3><a href="hotel-details.php">Icon Premier Hotel by Bhagini</a></h3>
                        <div className="distance">
                        <p><span><img src="/Images/hotels/icons/location-icon.png"/></span>3km from Bangalore</p>
                        </div>
                        <div className="content">
                        <p>Situated in Bangalore, 3.8 km from The Heritage Centre & Aerospace Museum, Icon Business Hotel by Bhagini features accommodation with a restaurant, 
                        free private parking, a fitness centre and a bar.</p>
                        </div>
                        <div className="amenities">
                        <ul>
                            <li><span><img src="/Images/packages/icons/Safe.png" alt="" title=""/></span>ROMT Safe</li>
                            <li><span><img src="/Images/packages/icons/free-wifi.png" alt="" title=""/></span>Free WIFI</li>
                            <li><span><img src="/Images/packages/icons/Housekeeping.png" alt="" title=""/></span>Hosekeeping</li>
                            <li><a href="#">+More</a></li>
                        </ul>
                        </div>
                        <div className="hotel-box2-footer">
                         
                        </div>
                    </div>
                    
                    </div>
                    <div className="col-md-3 hotel-box2-right">
                        <ul className="rating">
                        <li><span>4.5/5</span>185 Ratings</li>
                        <li><span className="cut-price">₹ 4300</span>₹ 3,700</li>
                        </ul>
                        <a href="hotel-details.php" className="book-now-btn">Book Now</a>
                    </div>
                </div>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 text-center">
                <div className="pegination"> <a href="#"><i className="fa fa-angle-left" aria-hidden="true"></i></a> <a href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">5</a> <a href="#">6</a> <a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i></a> </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Destination;
