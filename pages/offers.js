import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import axios from 'axios';

const Package = () => {

    const [HotelList, setHotelList] = useState([]);
    const fetch  = axios.get(`${process.env.NEXT_PUBLIC_HOST}/group-hotel-list/2564`).then(response => {
        return response.data.hotels_data;
      })
      .catch(error => {
          console.log('error', error);
      });

      fetch.then(response => {
        if(HotelList && HotelList.length == 0 ) {
            setHotelList(response)
        }
    })
        console.log('dddd',HotelList);

    return (
        <>
            <Header></Header>
            <div className="inner-page-wrapper">
            <div className="offer-page-banner">
            <figure> <img src="/Images/offer-page-banner.jpg" alt="" title=""/> </figure>
            <div className="offer-baner-heading">
                <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    <h2>More space means bigger savings.</h2>
                    <h5>Special rates for ROMT Members are just the beginning</h5>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="offers-page">
            <div className="container">
                <div className="row">
                <div className="col-md-6"></div>
                <div className="col-md-6"></div>
                </div>
            </div>
            </div>
            <div className="offer-details">
            <div className="container">
                <div className="row">
                <div className="col-md-12 text-center">
                    <p>This offer is valid for booking from January 1,2021, through December 31,2021;for travel through March 31,2022.<br/>
                    See terms and conditions</p>
                </div>
                </div>
            </div>
            </div>
            <div className="offer-search-sec">
            <div className="container">
            <div className="row">
            <div className="col-md-3">
            <h2>Select Hotel</h2>
            </div>
            <div className="col-md-9">
                <form>
                    <select>
                        { HotelList.length != 0 &&
                            HotelList.map((slide, index)=>{
                                return (
                                <option value={slide.hotel_id} key={index}>{slide.hotel_name}</option>
                                )
                            })
                        }
                    </select>
                    <input type="submit" value="Search"/>
                </form>
            </div>
            </div>
            </div>
            </div>
            <div className="offers-box-sec">
            <div className="container">
                <div className="row">
                <div className="col-md-6">
                    <div className="offers-box">
                    <div className="row">
                        <div className="col-md-6">
                        <figure><img src="/Images/offer.jpg" alt="" title=""/></figure>
                        </div>
                        <div className="col-md-6">
                        <div className="content">
                            <h3>Secret Deal</h3>
                            <h5>Unlock your secret deal and get u to 25% Discount</h5>
                            <ul className="list-1">
                            <li>Special discounts on rooms at all hotels</li>
                            <li>100 bonous points to new Green Cover Members</li>
                            <li>100% off on F&B</li>
                            </ul>
                            <a href="#" className="btn5">Use this offers</a> </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="offers-box">
                    <div className="row">
                        <div className="col-md-6">
                        <figure><img src="/Images/offer.jpg" alt="" title=""/></figure>
                        </div>
                        <div className="col-md-6">
                        <div className="content">
                            <h3>Secret Deal</h3>
                            <h5>Unlock your secret deal and get u to 25% Discount</h5>
                            <ul className="list-1">
                            <li>Special discounts on rooms at all hotels</li>
                            <li>100 bonous points to new Green Cover Members</li>
                            <li>100% off on F&B</li>
                            </ul>
                            <a href="#" className="btn5">Use this offers</a> </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="offers-box">
                    <div className="row">
                        <div className="col-md-6">
                        <figure><img src="/Images/offer.jpg" alt="" title=""/></figure>
                        </div>
                        <div className="col-md-6">
                        <div className="content">
                            <h3>Secret Deal</h3>
                            <h5>Unlock your secret deal and get u to 25% Discount</h5>
                            <ul className="list-1">
                            <li>Special discounts on rooms at all hotels</li>
                            <li>100 bonous points to new Green Cover Members</li>
                            <li>100% off on F&B</li>
                            </ul>
                            <a href="#" className="btn5">Use this offers</a> </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="offers-box">
                    <div className="row">
                        <div className="col-md-6">
                        <figure><img src="/Images/offer.jpg" alt="" title=""/></figure>
                        </div>
                        <div className="col-md-6">
                        <div className="content">
                            <h3>Secret Deal</h3>
                            <h5>Unlock your secret deal and get u to 25% Discount</h5>
                            <ul className="list-1">
                            <li>Special discounts on rooms at all hotels</li>
                            <li>100 bonous points to new Green Cover Members</li>
                            <li>100% off on F&B</li>
                            </ul>
                            <a href="#" className="btn5">Use this offers</a> </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Package;


