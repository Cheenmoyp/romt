import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Loginheader } from '../components/header/loginheader';
import { Footer } from '../components/footer/footer';
import axios from 'axios';

const Dashboard = () => {


    return (
        <>
            <Loginheader></Loginheader>
			 <div className="booking-history">
  <div className="booking-history-page-banner">
    <figure><img src="images/booking-history-page-banner.jpg" alt="" title=""/></figure>
  </div>
  <div className="booking-history-sec2">
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <h4>Hello, Cheenmoy</h4>
        </div>
        <div className="col-sm-9">
          <ul className="booking-history-sec2-right row">
            <li className="col-md-3"> ROMT Plan:<span><i className="fa fa-inr" aria-hidden="true"></i> Exclusive </span> </li>
            <li className="col-md-3"> Membership Ends :<span> Mar 27, 2030</span> </li>
            <li className="col-md-3"> You have saved :<span> 205</span> </li>
            <li className="col-md-3"> <a href="#" className="btn-renew">Renew Membership</a> </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div className="booking-history-sec3">
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="booking-history-sec3-left">
            <ul>
              <li><a href="#"><span className="icon"><img src="images/icons/dashboard.png" alt="" title=""/></span>Dashboard</a></li>
              <li><a href="#"><span className="icon"><img src="images/icons/profile.png" alt="" title=""/></span>My Profile</a></li>
              <li><a href="#"><span className="icon"><img src="images/icons/support.png" alt="" title=""/></span>Support 24X7</a></li>
              <li><a href="#"><span className="icon"><img src="images/icons/about.png" alt="" title=""/></span>About Us</a></li>
              <li><a href="#"><span className="icon"><img src="images/icons/logout.png" alt="" title=""/></span>Log Out</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="booking-history-sec3-right">
            <div className="booking-history-sec3-right-heading row">
              <div className="col-sm-9">
                <h4>Booking History</h4>
              </div>
              <div className="col-sm-3">
                <select>
                  <option>Completed</option>
                  <option>Completed</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
            <div className="booking-history-box">
              <ul className="row">
                <li className="col-md-2">
                  <figure><img src="images/hotels/roo-square.jpg" alt="" title/></figure>
                </li>
                <li className="col-md-4">
                  <h5>Romt Hotel Signature Inn</h5>
                  <p>Oct 29, 2021 - Oct 30, 2021</p>
                  <p>2 Guests, 1Room</p>
                </li>
                <li className="col-md-3">
                  <h4>UTYS75</h4>
                </li>
                <li className="col-md-3">
                  <p><strong>Checked Out</strong></p>
                  <p>Pending Amount:<span>₹ 0</span></p>
                  <p><a href="#" >View Details</a></p>
                  <p><a href="#" >Need Help</a></p>
                </li>
              </ul>
            </div>
            <div className="booking-history-box">
              <ul className="row">
                <li className="col-md-2">
                  <figure><img src="images/hotels/roo-square.jpg" alt="" title/></figure>
                </li>
                <li className="col-md-4">
                  <h5>Romt Hotel Signature Inn</h5>
                  <p>Oct 29, 2021 - Oct 30, 2021</p>
                  <p>2 Guests, 1Room</p>
                </li>
                <li className="col-md-3">
                  <h4>UTYS75</h4>
                </li>
                <li className="col-md-3">
                  <p><strong>Checked Out</strong></p>
                  <p>Pending Amount:<span>₹ 0</span></p>
                  <p><a href="#" >View Details</a></p>
                  <p><a href="#" >Need Help</a></p>
                </li>
              </ul>
            </div>
            <div className="booking-history-box">
              <ul className="row">
                <li className="col-md-2">
                  <figure><img src="images/hotels/roo-square.jpg" alt="" title/></figure>
                </li>
                <li className="col-md-4">
                  <h5>Romt Hotel Signature Inn</h5>
                  <p>Oct 29, 2021 - Oct 30, 2021</p>
                  <p>2 Guests, 1Room</p>
                </li>
                <li className="col-md-3">
                  <h4>UTYS75</h4>
                </li>
                <li className="col-md-3">
                  <p><strong>Checked Out</strong></p>
                  <p>Pending Amount:<span>₹ 0</span></p>
                  <p><a href="#" >View Details</a></p>
                  <p><a href="#" >Need Help</a></p>
                </li>
              </ul>
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

export default Dashboard;


