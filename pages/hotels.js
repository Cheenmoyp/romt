import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import Seacrch from '../components/search/search';

const Hotel = () => {

    const [hotelList, setHotelList] = useState([])
    const [startRating, setStarRating] = useState();

    const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/filter?group_id=2565&city_name&star_rating=${startRating}&min_price&max_price`).then(response => {
        return response.data.hotels_data
      })
      .catch(error => {
          console.log('error', error);
      });

    fetcher.then(response => {
        if(hotelList.length == 0 ) {
            setHotelList(response)
        }
    })

    const handleFormChange = (event) => {
        setStarRating(event.target.value);
        setHotelList([]);
    };

    
    return (
        <>
            <Header></Header>
            <div className="inner-page-wrapper">
                <div className="inner-page-search-con">
                    <div className="search-con">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12">
                            <Seacrch />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="inner-page-banner">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <h2>Luxury Resorts Around Bangalore - Upto 70% Off</h2>
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
                                        <input type="checkbox" id="star_rating" name="star_rating" value="1" onChange={(event) => { handleFormChange(event); }}/>
                                        <label htmlFor="star_rating">1 Star</label>
                                        <span>70</span></li>
                                    <li>
                                        <input type="checkbox" id="star_rating" name="star_rating" value="2" onChange={(event) => { handleFormChange(event); }}/>
                                        <label htmlFor="star_rating">2 Star</label>
                                        <span>30</span></li>
                                    <li>
                                        <input type="checkbox" id="star_rating" name="star_rating" value="3" onChange={(event) => { handleFormChange(event); }}/>
                                        <label htmlFor="star_rating">3 Star</label>
                                        <span>450</span></li>
                                    <li>
                                        <input type="checkbox" id="star_rating" name="star_rating" value="4" onChange={(event) => { handleFormChange(event); }}/>
                                        <label htmlFor="star_rating">4 Star</label>
                                        <span>80</span></li>
                                    <li>
                                        <input type="checkbox" id="star_rating" name="star_rating" value="5" onChange={(event) => { handleFormChange(event); }}/>
                                        <label htmlFor="star_rating">5 Star</label>
                                        <span>80</span></li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        {hotelList.length != 0 ?
                            <div className="col-md-9">
                                {hotelList.map((slide, index)=>{
                                    return (
                                        <div className="hotel-box2 row" key={index}>
                                            <div className="col-md-4">
                                            <figure><img src={slide.image} alt="" title=""/></figure>
                                            </div>
                                            <div className="col-md-5">
                                            <div className="hotel-box2-content">
                                                <div className="rating">
                                                <ul>
                                                    <li>
                                                        <StarRatings
                                                            rating={slide.star}
                                                            starRatedColor="orange"
                                                            numberOfStars={5}
                                                            name='rating'
                                                            starDimension="15px"
                                                            starSpacing="1px"
                                                        />
                                                    </li>
                                                    <li>311 Ratings</li>
                                                </ul>
                                                </div>
                                                <h3><a href={'../hotel-details/'+ base64_encode(slide.hotel_id)}>{slide.hotel_name}</a></h3>
                                                <div className="distance">
                                                <p><span><img src="/Images/hotels/icons/location-icon.png"/></span>{slide.city_name}</p>
                                                </div>
                                                <div className="content">
                                                <p>
                                                    <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: slide && slide.hotel_description,
                                                    }}
                                                    />
                                                </p>
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
                                                <ul>
                                                    <li><img src="/Images/hotels/icons/Couple.png" alt="" title=""/>Couple Friendly</li>
                                                    <li>Free Cancellation till 12 Dec 2021</li>
                                                </ul>
                                                </div>
                                            </div>

                                            </div>
                                            <div className="col-md-3 hotel-box2-right">
                                                <ul className="rating">
                                                <li><span>4.5/5</span>185 Ratings</li>
                                                <li><span className="cut-price">₹4300</span>₹{slide.original_price}</li>
                                                 
                                            <li> <a href={'../hotel-details/'+ base64_encode(slide.hotel_id)} className="book-now-btn-destinationsearch">Book Now</a></li>
                                                </ul>
                                     
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            :

                            'No Hotels Found'
                        }
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

export default Hotel;


