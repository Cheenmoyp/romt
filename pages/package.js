import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

const Package = () => {
    return (
        <>
            <Header></Header>
            <div className="inner-page-wrapper">
                <div className="packages-page-banner">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active"> <img src="/Images/packages/packages-slider.jpg" className="d-block w-100" alt="..."/> </div>
                        <div className="carousel-item"> <img src="/Images/packages/packages-slider.jpg" className="d-block w-100" alt="..."/> </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a> </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="packages-filter">
                   
                <div className="packages-con">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                        <div className="package-box">
                            <figure><a href="package-detail"><img src="/Images/packages/package-1.jpg" alt="" title=""/></a></figure>
                            <div className="p-content">
                            <h3><a href="package-detail">Tranquil Homestay</a></h3>
                            <div className="facilities">
                                <ul>
                                <li><img src="/Images/packages/icons/Hotels.png" alt="" title=""/><span>2 Hotels</span></li>
                                <li><img src="/Images/packages/icons/Camp-Fire.png" alt="" title=""/><span>Camp Fire</span></li>
                                <li><img src="/Images/packages/icons/JeepSafari.png" alt="" title=""/><span>Jeep Safari</span></li>
                                <li><img src="/Images/packages/icons/Swimming.png" alt="" title=""/><span>Swimming </span></li>
                                <li><img src="/Images/packages/icons/Trekking.png" alt="" title=""/><span>Trekking </span></li>
                                </ul>
                            </div>
                            <div className="p-price">
                                <h4>2N 3D Bangalore</h4>
                                <h6>9999/- <span>Per person</span></h6>
                            </div>
                            </div>
                        </div>
                        </div>
                   
                       
                    </div>
                    </div>
                </div>
                <div className="packages-by-destination">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="heading-group">
                            <h3>Packages by destination</h3>
                            <p>Make beautiful memories with your Soulmate</p>
                            <a href="#">View All `&gt;``&gt;`</a> </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                        <div className="p-by-box">
                            <figure> <a href="package-detail"><img src="/Images/destinations/kolkata.jpg" alt="" title=""/></a> </figure>
                            <h4><a href="#">Kolkata</a></h4>
                        </div>
                        </div>
                        <div className="col-sm-3">
                        <div className="p-by-box">
                            <figure> <a href="package-detail"><img src="/Images/destinations/mumbai.jpg" alt="" title=""/></a> </figure>
                            <h4><a href="#">Mumbai</a></h4>
                        </div>
                        </div>
                        <div className="col-sm-3">
                        <div className="p-by-box">
                            <figure> <a href="#"><img src="/Images/destinations/banglore.jpg" alt="" title=""/></a> </figure>
                            <h4><a href="#">Banglore</a></h4>
                        </div>
                        </div>
                    <div className="col-sm-3">
                        <div className="p-by-box">
                            <figure> <a href="#"><img src="/Images/destinations/chennai.jpg" alt="" title=""/></a> </figure>
                            <h4><a href="#">Chennai</a></h4>
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


