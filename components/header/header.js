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
                <div className="logo"> <a href={"/index-new"}> <img layout={'fill'} src="/Images/ROMTlogosvg.svg" alt="" title=""/> </a> </div>
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
                                <span className="menu-heading">All Destinations</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('coimbatore')}>Coimbatore</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('erode')}>Erode</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('krishnagiri')}>Krishnagiri</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('munnar')}>Munnar</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('yercaud')}>Yercaud</a></li>
                        
                                </ul>
                                </div>
                                
                                <div className="col-md-4">
                                <span className="menu-heading">Top Destinations</span>
                                <ul className="nav flex-column">
                                <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('coimbatore')}>Coimbatore</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('erode')}>Erode</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('krishnagiri')}>Krishnagiri</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('munnar')}>Munnar</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('yercaud')}>Yercaud</a></li>
                                </ul>
                                </div>

                                <div className="col-md-4">
                                <span className="menu-heading">Destination Ideas</span>
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
                                <span className="menu-heading">Hotel By Location</span>
                                <ul className="nav flex-column">
                                <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('coimbatore')}>Coimbatore</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('erode')}>Erode</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('krishnagiri')}>Krishnagiri</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('munnar')}>Munnar</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('yercaud')}>Yercaud</a></li>
                                </ul>
                                </div>
                                <div className="col-md-4">
                                <span className="menu-heading">Top Hotels</span>
                                <ul className="nav flex-column">
                                <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('coimbatore')}>Coimbatore</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('erode')}>Erode</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('krishnagiri')}>Krishnagiri</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('munnar')}>Munnar</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href={'/destination/'+ base64_encode('yercaud')}>Yercaud</a></li>
                                </ul>
                                </div>
                                
                                <div className="col-md-4">
                                <span className="menu-heading">Hotel By Type</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link" href="#"> Luxury</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#"> Boutique</a> </li>
                                    <li className="nav-item"> <a className="nav-link" href="#"> Business</a> </li>
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
                                    <li className="nav-item"> <a className="nav-link active" href="#">ROMT Member Rate</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="#">Stay More, Save More</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="#">ROMT Bed & Breakfast</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="#">ROMT Plus</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="#">ROMT Suites</a></li>
                                    <li className="nav-item"> <a className="nav-link active" href="#">ROMT Pride</a> </li>
                                </ul>
                                </div>
                                
                                <div className="col-md-4">
                                <span className="menu-heading">ROMT Packages</span>
                                <ul className="nav flex-column">
                                    <li className="nav-item"> <a className="nav-link" href={"/package"}>ROMT Special Winter Package</a></li>
                                   
                                </ul>
                                </div>
                            
                            </div>
                            </div>
                        </div>
                        </li>
                       <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" > Blog </a>
                        
                        </li>
                    </ul>
                    </div>
                </nav>
                </div>
            </div>
            <div className="col-md-3">
                <div className="top-btn-group"> <a href='#' className="sign-in-btn"><i className="fa fa-sign-in" aria-hidden="true"></i> Sign In</a> <a href="#" className="join-us">  Contact us</a> </div>
            </div>
            </div>
        </div>
        </>
    )
}
