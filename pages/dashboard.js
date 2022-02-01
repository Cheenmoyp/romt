import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Loginheader } from '../components/header/loginheader';
import { Footer } from '../components/footer/footer';
import axios from 'axios';
import { useRouter } from 'next/router';
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
    const router = useRouter();
	const [dataList, setDataList] = useState([]);
	const [tokenValue, setTokenValue] = useState('');
	const [selectDate, setSelectDate] = useState(moment().toDate());
	const [statusVal, setStatusVal] = useState('BOOKED');
	React.useEffect(() => {
		if (localStorage) {
			const token_val = localStorage.getItem("userToken") || "";
			console.log("LocalState: ", token_val);
			if (!token_val) {
				router.push(`/index-new`)
			} else {
				setTokenValue(token_val);
				dataLoad();
			}
			
		} else {
			router.push(`/index-new`)
		}
	}, []);
	function changeStatus(e) {
		setStatusVal(e.target.value);
		dataLoad();
	}
	function dataLoad() {
		var url = '';
		if (statusVal == 'BOOKED') {
			url = `${process.env.NEXT_PUBLIC_HOST_BE}/public_user/get_user_booking_list?page=1`;
		} else {
			url = `${process.env.NEXT_PUBLIC_HOST_BE}/public_user/get_user_cancelled_booking_list?page=1`;
		}
		const dataset  = axios.post(url, {'company_id': 2565, 'date': '01-01-2022', 'token': tokenValue}).then(response => {
			console.log('response',response)
			if(response.data.status){
				setDataList(response.data.innerData);
			}
			return response.data;
		})
		.catch(error => {
			console.log('error', error);
		});
	}
	//var token_val = localStorage.getItem('userToken') || "";
	/* if(typeof window !== "undefined") {
		if(localStorage.getItem("userToken")) {
		  console.log( JSON.parse(localStorage.getItem("userToken")));
		} 
	} */
	//console.log('token', token_val);
    return (
        <>
            <Loginheader></Loginheader>
			 <div className="booking-history">
  <div className="booking-history-page-banner">
    <figure><img src="images/booking-history-page-banner.jpg" alt="" /></figure>
  </div>
  <div className="booking-history-sec2">
    <div className="container">
      <div className="row">
        <div className="col-sm-3">
          <h4>Hello,</h4>
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
              <li><a href="#"><span className="icon"><img src="images/icons/dashboard.png" alt="" /></span>Dashboard</a></li>
              <li><a href="#"><span className="icon"><img src="images/icons/profile.png" alt="" /></span>My Profile</a></li>
              <li><a href="#"><span className="icon"><img src="images/icons/support.png" alt="" /></span>Support 24X7</a></li>
              <li><a href="#"><span className="icon"><img src="images/icons/about.png" alt="" /></span>About Us</a></li>
              <li><a href="#"><span className="icon"><img src="images/icons/logout.png" alt="" /></span>Log Out</a></li>
            </ul>
          </div>
        </div>
        <div className="col-md-9">
          <div className="booking-history-sec3-right">
            <div className="booking-history-sec3-right-heading row">
              <div className="col-sm-6">
                <h4>Booking History</h4>
              </div>
              <div className="col-sm-3">
                <DatePicker id="datepicker" dateFormat="MMM yyyy" maxDate={moment().toDate()} className="datepicker form-control" selected={selectDate} placeholder="Select Date" onChange={(date) => {
                    setSelectDate(date)
                }}  />
              </div>
              <div className="col-sm-3">
                <select className="form-control" onChange={(e) => changeStatus(e)} >
                  <option value="BOOKED">Booked</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>
			<div className="booking-history-box">
				<ul className="row">
					<li className="col-md-2">
						<figure><img src="images/hotels/roo-square.jpg" alt="" /></figure>
					</li>
					<li className="col-md-4">
						<h5>Romt Hotel Signature Inn111</h5>
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
						{/* <p><a href="#" >Need Help</a></p> */}
						<p><a href="#" >Cancel Booking</a></p>
						<p><a href="#" >Modify Booking</a></p>
					</li>
				</ul>
			</div>	
			{dataList && dataList.length != 0 ?
				<div>
						
				{dataList && dataList.map((data, index) => {				
					return (
						<div className="booking-history-box" key={index}>
							<ul className="row">
								<li className="col-md-2">
									<figure><img src="images/hotels/roo-square.jpg" alt="" /></figure>
								</li>
								<li className="col-md-4">
									<h5>Romt Hotel Signature Inn111</h5>
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
									<p><a href="#" >Cancel Booking</a></p>
									<p><a href="#" >Modify Booking</a></p>
								</li>
							</ul>
						</div>				   
					)
				})}
				</div>
			:
				<div className="col-md-9">
					<h1 style={{textAlign: 'center'}}>No Booking Founds</h1>
				</div>
			}
            
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


