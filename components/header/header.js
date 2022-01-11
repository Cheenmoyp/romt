import React, { useState, useEffect} from 'react';
// import OwlCarousel from 'react-owl-carousel';
import Image from 'next/image';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

export const Header = () => {
    const [loginmodal, setLoginmodal] = useState(false);
	const handleLoginBoxClick = () => {
        setLoginmodal(!loginmodal);
    }
	//package list
    const [packageList, setPackageList] = useState([]);
    useEffect(()=>{
		destinatinListFetch();
        const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-package-list/2565`).then(response => {
            return response.data.package_details;
        })
        .catch(error => {
            console.log('error', error);
        });
        fetcher.then(response => {
            if(packageList.length == 0 ) {
                setPackageList(response)
            }
        })
    },[])
    

	//package list
    const [destinationList, setDestinatioList] = useState([]);
	function destinatinListFetch() {
		if (!destinationList.length) {
			const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-destination-list/2565/ALL`).then(response => {
				return response.data;
			})
			.catch(error => {
				console.log('error', error);
			});
			fetcher.then(response => {
				setDestinatioList(response.destinations); 
			});
		}
	}
	
	useEffect(()=>{
		var jiniAssist_API=jiniAssist_API||{}, jini_LoadStart=new Date();let s = document.createElement('script');s.type = 'text/javascript';s.async = true;s.id='jini-script-id';s.src = 'https://admin.bookingjini.com/v3/jiniAssist/index.js?api_key=ca3fcd53020d0702dd7c1d1b00de4324';var x = document.getElementsByTagName('script')[0];s.charset='UTF-8';s.setAttribute('Access-Control-Allow-Origin','*');x.parentNode.insertBefore(s, x);
	},[])
	
	
    return (
        <>
        <div className="container">
            <div className="row">
            <div className="col-md-2">
                <div className="logo"> <a href={"/index-new"}> <img layout={'fill'} src="/Images/ROMTlogosvg.svg" alt="" title=""/> </a> </div>
            </div>
            <div className="col-md-7">
                <div className="nav-con">
						
					<input id="collapsible2" className="toggle" type="checkbox" checked="" />
						<label className="lbl-toggle"><i className="fa fa-bars" aria-hidden="true"></i></label>
							<div className="collapsible-content">
							
											 <nav className="navbar navbar-expand-lg navbar-dark">
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
								<li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Destination </a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown">
										<div className="container">
											<div className="row">
												<div className="col-md-12"> 
												<span className="menu-heading">All Destinations</span> 
												  <ul className="menublocks">
													{destinationList && destinationList.map((destination, index) => {
														
														return (
															<li  key={index}> <a className="nav-link active" href={'/destination/'+ base64_encode(destination)} >{destination}</a></li>
														   
														)
													})}
												</ul>
												</div>
											</div>
										</div>
									</div>
								</li>
								<li className="nav-item dropdown">  <a className="nav-link dropdown-toggle" href={"/hotels"} > Hotels </a> </li>
								<li className="nav-item dropdown"> <a  className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Offers & Packages </a >
									<div className="dropdown-menu" aria-labelledby="navbarDropdown">
										<div className="container">
											<div className="row">
												<div className="col-md-4"> 
													<span className="menu-heading">ROMT Offers</span>
														<ul className="nav flex-column">
															<li className="nav-item"> <a  className="nav-link active" href={"/offers"}>ROMT Member Rate</a></li>
								  
														</ul>
												</div>
                                
												<div className="col-md-4">
												<span className="menu-heading">ROMT Packages</span>
												<ul className="nav flex-column">
													{packageList.map((data,index)=>{
														let url = base64_encode(2565 + '/' + data.package_name);
														return (
															<li className="nav-item" key={index}> 
															<a  className="nav-link" href={"/package-detail/"+url}>{data.package_name}</a >
															</li>
														)
													})}
												</ul>
												</div>
                            
											</div>
										</div>
									</div>
							</li>
							<li className="nav-item dropdown"> <a  className="nav-link dropdown-toggle" href="#" > Blog </a ></li>
						</ul>
						</div>
					</nav>	
							
							
							
							</div>
					
						 
						
				  </div>
            </div>
            <div className="col-md-3">
					  <div className="top-btn-group"> 
			 
			 <a  href="#" className="join-us"><i className="fa fa-plus" aria-hidden="true"></i> Contact us
				<div className="contact-us-box">
					<p><strong>Address:</strong>101,Sengupta st, Ram nagar, Coimbatore- 641009</p>
					<p><strong>Phone:</strong>91 733 00 777 44 / 91 733 00 222 77 (24/7 Support)</p>
					<p><strong>Email:</strong>reservations@roomsonmytravel.in</p>
				</div>
			 </a >
		</div>
				
				
				
				</div>
            </div>
			
			
			<Modal className="modal fade sign-in-modal" tabIndex="-1" size="lg" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" show={loginmodal}>
               <Modal.Body>
			   <div className="modal-body seminor-login-modal-body">
					  <button type="button" className="close" data-dismiss="modal" onClick={() => handleLoginBoxClick()} >
						  <span><i className="fa fa-times-circle" aria-hidden="true"></i></span>
					  </button>
						<div className="sign-in-page-wraper">
							<div className="container">
							  <div className="row login-modal-container">
								<div className="col-md-6 div1">
								  <div className="signin-left">
								   <div className="signinpage-logo">
									 <a href="index-new"> <img src="/Images/ROMTlogosvg.svg" alt="" title=""/> </a>
								   </div>
								   <div className="signin-form">
									 <h4>Welcome back, please login to your account</h4>
									 <div className="login-with"><h5>Log in with</h5><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i>
									</a><a href="#"><i className="fa fa-google" aria-hidden="true"></i></a></div>
									 <form>
									   <input type="text" placeholder="Username or Email Address"/>
									   <input type="password" placeholder="Type Password"/>
									   <div className="clearfix"></div>
									   <div className="row">
										 <div className="col"><input type="checkbox" />Remember me</div>
										 <div className="col"><a href="#forgot-password"  data-toggle="modal">Forgot Password</a></div>
									   </div>
									   <input type="submit" value="Login" />
									   <div className="clearfix"></div>
									   <p>Dont have an account? <a href="#register-form-modal"  data-toggle="modal">Register</a></p>
									 </form>
								   </div>
								  </div>
								</div>
								<div className="col-md-6 div2">
								  <div className="sign-in-right">
									<ul>
									  <li><i className="fa fa-bullhorn" aria-hidden="true"></i> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
									  <li><i className="fa fa-car" aria-hidden="true"></i>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
									  <li><i className="fa fa-check" aria-hidden="true"></i> Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
						   
									</ul>
								  </div>
								</div>
							  </div>
							</div>
							</div>
							</div>
				</Modal.Body>
            </Modal>
			
        </div>
        </>
    )
}
