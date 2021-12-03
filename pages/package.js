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
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="filter-con">
                            <ul className="filter row">
                            <li>
                                <input type="radio"/>
                                Packages</li>
                            <li>
                                <select>
                                <option>Package Type</option>
                                </select>
                            </li>
                            <li>
                                <label>Budget by Person ( 5000 - 72000 )</label>
                                <br/>
                                <div data-role="rangeslider">
                                <input type="range" name="price-min" id="price-min" value="200" min="0" max="1000"/>
                                </div>
                            </li>
                            <li>
                                <label>Duration ( 1N-9N )</label>
                                <br/>
                                <input type="range" name="price-max" id="price-max" value="800" min="0" max="1000"/>
                            </li>
                            <li className="col">
                                <select>
                                <option>Short by Popularity</option>
                                </select>
                            </li>
                            </ul>
                            <span id="dots"></span>
                            <div id="more">
                            <div className="filter-more row">
                                <div className="col-md-3">
                                <div className="more-f1">
                                    <div id="radioBtn" className="btn-group">
                                        {/* <div className="toggle_radio">
                                            <input type="radio" className="toggle_option" id="first_toggle" name="toggle_option">
                                            <label for="first_toggle">
                                            <p>With Flights</p>
                                            </label>
                                            <input type="radio" checked className="toggle_option" id="second_toggle" name="toggle_option">
                                            <label for="second_toggle">
                                            <p>Without Flights</p>
                                            </label>
                                            <div className="toggle_option_slider"> </div>
                                        </div>
                                        </div>
                                        <div className="pac">
                                        <div className="pr-pac"> Packages </div>
                                        <label className="switch">
                                            <input type="checkbox" checked/>
                                            <span className="slider round"></span> 
                                        </label>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="col-md-3">
                                <div className="filter-list">
                                    <h4>Themes</h4>
                                    <ul>
                                    <li>
                                        <input type="checkbox"/>
                                        Luxury</li>
                                    <li>
                                        <input type="checkbox"/>
                                        Leisure</li>
                                    </ul>
                                </div>
                                </div>
                                <div className="col-md-3">
                                <div className="filter-list">
                                    <h4>Themes</h4>
                                    <ul>
                                    <li>
                                        <input type="checkbox"/>
                                        Places</li>
                                    <li>
                                        <input type="checkbox"/>
                                        Bangalore</li>
                                    <li>
                                        <input type="checkbox"/>
                                        Coorg</li>
                                    <li>
                                        <input type="checkbox"/>
                                        Chikmangalur</li>
                                    <li>
                                        <input type="checkbox"/>
                                        Hampi</li>
                                    <li>
                                        <input type="checkbox"/>
                                        Madurai</li>
                                    </ul>
                                </div>
                                </div>
                                <div className="col-md-3">
                                <div className="filter-list">
                                    <h4>Holiday Type</h4>
                                    <ul>
                                    <li>
                                        <input type="checkbox"/>
                                        Short Breaks</li>
                                    <li>
                                        <input type="checkbox"/>
                                        Wellness</li>
                                    <li>
                                        <input type="checkbox"/>
                                        Most Popular</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <button onClick="myFunctionNew()" id="myBtn" className="more-filter">More<br/>
                        Filter</button>
                        </div>
                    </div>
                    </div>
                </div>
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


