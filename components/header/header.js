import React, { useState, useEffect} from 'react';
// import OwlCarousel from 'react-owl-carousel';
import Image from 'next/image';
import {decode as base64_decode, encode as base64_encode} from 'base-64';

export const Header = () => {
    return (
        <>
        <div className="container">
            <div className="row">
            <div className="col-md-2">
                <div className="logo"> <a href="/index-new"> <img layout={'fill'} src="/Images/ROMTlogosvg.svg" alt="" title=""/> </a> </div>
            </div>
            <div className="col-md-7">
                <div className="nav-con">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Destination </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div className="container">
                            <div className="row">
                                <div className="col-md-4"> 
                                <span className="menu-heading">Destination By Places</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('coimbatore') }>Coimbatore</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="/destination">Mumbai</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="/destination">Delhi</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="/destination">Jaipur</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="/destination">Pune</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="/destination">Chandigarh</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="/destination">Chennai</a> </li>
                                </ul>
                                </div>
                                
                                <div className="col-md-4">
                                <span className="menu-heading">Top Destinations</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link" href="#">Mysore</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Erode</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Bangolore</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Valparai</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Mysore</a> </li>
                                </ul>
                                </div>

                                <div className="col-md-4">
                                <span className="menu-heading">By Packages</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link" href="#">Premium Resort</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Standard Resort</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Business & Leisure Hotel</a> </li>
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>
                        </li>
                        <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Hotels </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div className="container">
                            <div className="row">
                                <div className="col-md-4"> 
                                <span className="menu-heading">Hotel By Places</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link active" href="hotel.php">Bangalore</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="hotel.php">Mumbai</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="hotel.php">Delhi</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="hotel.php">Jaipur</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="hotel.php">Pune</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="#">Chandigarh</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="#">Chennai</a> </li>
                                </ul>
                                </div>
                                <div className="col-md-4">
                                <span className="menu-heading">Top Hotels</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link" href="#">Mysore</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Erode</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Bangolore</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Valparai</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Mysore</a> </li>
                                </ul>
                                </div>
                                
                                <div className="col-md-4">
                                <span className="menu-heading">Hotels By Packages</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link" href="#">Premium Resort</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Standard Resort</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#">Business & Leisure Hotel</a> </li>
                                </ul>
                                </div>
                                
                            </div>
                            </div>
                            
                        </div>
                        </li>
                        <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Offers & Packages </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <div className="container">
                            <div className="row">
                                <div className="col-md-4"> 
                                <span className="menu-heading">ROMT Offers</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Member Rate</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="offers.php">Stay More, Save More</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Bed & Breakfast</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Plus</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Suites</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Pride</a> </li>
                                </ul>
                                </div>
                                
                                <div className="col-md-4">
                                <span className="menu-heading">ROMT Packages</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link" href="/package">Exclusive Packages</a></li>
                                    <li className="nav-item"> <a className="nav-link" href="/package">VIP Premiere Offer</a></li>
                                    <li className="nav-item"> <a className="nav-link" href="/package">Where Next Offer</a></li>
                                    <li className="nav-item"> <a className="nav-link" href="/package">Last Minute Escapes</a> </li>
                                </ul>
                                </div>
                            
                            </div>
                            </div>
                        </div>
                        </li>
                        <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="membership.php" > Membership </a>
                        
                        </li>
                    </ul>
                    </div>
                </nav>
                </div>
            </div>
            <div className="col-md-3">
                <div className="top-btn-group"> <a href="signIn.php" className="sign-in-btn"><i className="fa fa-sign-in" aria-hidden="true"></i> Sign In</a> <a href="#" className="join-us"><i className="fa fa-plus" aria-hidden="true"></i> Join Us</a> </div>
            </div>
            </div>
        </div>
        </>
    )
}
