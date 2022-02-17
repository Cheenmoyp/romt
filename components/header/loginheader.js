import React, { useState, useEffect} from 'react';
// import OwlCarousel from 'react-owl-carousel';
import Image from 'next/image';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { useRouter } from 'next/router';

export const Loginheader = () => {
    const [loginmodal, setLoginmodal] = useState(false);
    const [showNavbar, setShowNavbar] = useState('');
    const [showDestinationNav, setShowDestinationNav] = useState('');
    const [showHotelNav, setShowHotelNav] = useState('');
    const [showOfferNav, setShowOfferNav] = useState('');
	//package list
    const [packageList, setPackageList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [otpActual, setOtpActual] = useState('');
    const [error, setError] = useState('');

	const [userLoginData,setUserLoginData] = useState({first_name:'',last_name:''})
	const [userLoggedIn,setUserLoggedIn] = useState(false);


    const router = useRouter();
    var categories = [];
	const handleLoginBoxClick = () => {
		setError('');
        setLoginmodal(!loginmodal);
    }

	
	const handleNavBar = () => {
		if (showNavbar) {
			setShowNavbar(''); 
		} else {
			setShowNavbar('show');
		}
        
    }
	
	const handleDestinationNav = () => {
		if (showDestinationNav) {
			setShowDestinationNav('');
		} else {
			setShowDestinationNav('show');
			setShowHotelNav('');
			setShowOfferNav('');
		}
	}
	const handleHotelNav = () => {
		if (showHotelNav) {
			setShowHotelNav('');
		} else {
			setShowHotelNav('show');
			setShowDestinationNav('');
			setShowOfferNav('');
		}
        
    }
	const handleOfferNav = () => {
		if (showOfferNav) {
			setShowOfferNav('');
		} else {
			setShowOfferNav('show');
			setShowHotelNav('');
			setShowDestinationNav('');
		}
        
    }
    useEffect(()=>{
		destinatinListFetch();
		headerHotelFetch();
		topCityFetch();
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

		//category
		const fetcherCategory  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-hotels-categories/2565`).then(response => {
            return response.data.hotels_categories;
        })
        .catch(error => {
            console.log('error', error);
        });
        fetcherCategory.then(response => {
            if(categoryList.length == 0 ) {
                setCategoryList(response)
            }
        })
    },[])

	//get category index values
	for (const [key, value] of Object.entries(categoryList)) {
		if(key != 'NA'){
			categories.push(key);
		}
	}

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

	
	//hotel list
    const [headerHotelList, setHeaderHotelList] = useState([]);
	function headerHotelFetch() {
		if (!headerHotelList.length) {
			const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-city-and-hotels/2565`).then(response => {
				return response.data;
			})
			.catch(error => {
				console.log('error', error);
			});
			fetcher.then(response => {
				setHeaderHotelList(response.results); 
			});
		}
	}
	
	//top city list
    const [topCityList, setTopCityList] = useState([]);
	function topCityFetch() {
		if (!topCityList.length) {
			const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-destination-list/2565/TOP`).then(response => {
				return response.data;
			})
			.catch(error => {
				console.log('error', error);
			});
			fetcher.then(response => {
				setTopCityList(response.destinations); 
			});
		}
	}
	function submitLogin() {
		//e.preventDefault();
		if (mobile) {
			//const check  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/public_user/fetch_user_login_details/${mobile}/2565`).then(response => {
			const check  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/public_user/fetch_user_login_details/${mobile}/2035`).then(response => {
				return response.data;
			})
			.catch(error => {
				console.log('error', error);
			});
			check.then(response => {
				//setTopCityList(response.destinations); 
				if ( response.status ) {
					const otpsend  = axios.post(`${process.env.NEXT_PUBLIC_HOST_BE}/bookingEngine/send-otp`, {'mobile': mobile}).then(response => {
						console.log('response',response)
						if(response.data.status){
							setOtpActual(response.data.otp_value);
						}
						return response.data;
					})
					.catch(error => {
						console.log('error', error);
					});
				} else {
					setError('Mobile number is not registered');
					//console.log('error', 'invalid')
				}
			});
		} else {
			setError('Enter Registered Mobile Number');
		}
	}
	function otpValidate() {
		//e.preventDefault();
		if (mobile && otp) {
			if (otp == otpActual) {
				//const check  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/public_user/fetch_user_login_details/${mobile}/2565`).then(response => {
				const check  = axios.post(`${process.env.NEXT_PUBLIC_HOST_BE}/public_user/post`, {'mobileno': mobile, 'otp_validity': otp, 'company_id':2035}).then(response => {
					return response.data;
				})
				.catch(error => {
					console.log('error', error);
				});
				check.then(response => {
					//setTopCityList(response.destinations); 
					if ( response.status ) {
						if (otp == otpActual) {
							//router.push(`/dashboard/${response.auth_token}`)
							router.push(`/dashboard`)
						}
					} else {
						setError('Invalid OTP');
						//console.log('error', 'invalid')
					}
				});
			} else {
				setError('Invalid OTP');
				//console.log('error', 'invalid')
			}
		} else {
			setError('Enter OTP');
		}
	}
	
	var keyHotelLocation = 0;
	var keyTopHotel = 0;
	useEffect(()=>{
		var jiniAssist_API=jiniAssist_API||{}, jini_LoadStart=new Date();let s = document.createElement('script');s.type = 'text/javascript';s.async = true;s.id='jini-script-id';s.src = 'https://admin.bookingjini.com/v3/jiniAssist/index.js?api_key=ca3fcd53020d0702dd7c1d1b00de4324';var x = document.getElementsByTagName('script')[0];s.charset='UTF-8';s.setAttribute('Access-Control-Allow-Origin','*');x.parentNode.insertBefore(s, x);
	},[])
	

	useEffect(() => {
		if (sessionStorage.getItem('user_logged_in')) {
			setUserLoggedIn(JSON.parse(sessionStorage.getItem('user_logged_in')));
		}

		if (sessionStorage.getItem('user_logged_in_data')) {
			setUserLoginData(JSON.parse(sessionStorage.getItem('user_logged_in_data')))
		}
	}, [])

	const userLogout = () => {
		sessionStorage.removeItem("user_logged_in")
		sessionStorage.removeItem("user_logged_in_data")
		setUserLoginData({ first_name: '', last_name: ''});
		setUserLoggedIn(false);
		router.push(`/index-new`)
	}


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
						<button className="navbar-toggler" type="button" data-toggle="collapse" onClick={() => handleNavBar()} data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
						<div className={'collapse navbar-collapse '+showNavbar} id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
								<li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" onClick={() => handleDestinationNav()} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Destination </a>
									<div className={'dropdown-menu '+showDestinationNav} aria-labelledby="navbarDropdown">
										<div className="container">
											<div className="row">
												<div className="col-md-5"> 
												<span className="menu-heading">All Destinations</span> 
												  <ul className="menublocks">
													{destinationList && destinationList.map((destination, index) => {
														
														return (
															<li  key={index}> <a className="nav-link active" href={'/destination/'+ base64_encode(destination)} >{destination}</a></li>
														   
														)
													})}
												</ul>
												</div>
												<div className="col-md-3"> 
												<span className="menu-heading">Top Destinations</span> 
												  <ul className="">
													{topCityList && topCityList.map((destination, index) => {
														
														return (
															<li  key={index}> <a className="nav-link active" href={'/destination/'+ base64_encode(destination)} >{destination}</a></li>
														   
														)
													})}
												</ul>
												</div>
												
												<div className="col-md-4"> 
													<span className="menu-heading">Destination Ideas</span> 
												
												</div>
											</div>
										</div>
									</div>
								</li>
								<li className="nav-item dropdown">  <a className="nav-link dropdown-toggle" onClick={() => handleHotelNav()} href={"/hotels"} > Hotels </a> 
								
										<div className={'dropdown-menu '+showHotelNav} aria-labelledby="navbarDropdown">
										<div className="container">
											<div className="row">
												<div className="col-md-4"> 
												<span className="menu-heading">Hotel By Location</span> 
													<ul className="">
														{headerHotelList && headerHotelList.map((headerHotel, index) => {
															if (headerHotel.type == 'city' && keyHotelLocation<=4) {
																keyHotelLocation++;
																return (
																	<li  key={index}> <a className="nav-link active" href={'/destination/'+ base64_encode(headerHotel.name)} >{headerHotel.name}</a></li>
																
																)
															}	
														})}
													</ul>
												</div>
												
												<div className="col-md-4"> 
													<span className="menu-heading">Hotel By Type</span> 
													<ul>
														{categories && categories.map((category, index) => {
															return (
																<li  className="nav-link active " key={index}> <a href={'/hotel-category/'+base64_encode(category)}>{category}</a></li>
															)
														})}
													</ul>
												</div>
													<div className="col-md-4"> 
													<span className="menu-heading">Top Hotels</span> 
													<ul className="">
														{headerHotelList && headerHotelList.map((headerHotel, index) => {
															if (headerHotel.type == 'hotel' && keyTopHotel<=4) {
																keyTopHotel++;
																return (
																	<li  key={index}> <a className="nav-link active" href={'/hotel-details/'+ base64_encode(headerHotel.id)} >{headerHotel.name}</a></li>
																
																)
																
															}	
														})}
													</ul>
												</div>
											</div>
										</div>
									</div>
								
								
								
								
								
								
								
								
								</li>
								<li className="nav-item dropdown"> <a  className="nav-link dropdown-toggle" onClick={() => handleOfferNav()} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Offers & Packages </a >
									<div className={'dropdown-menu '+showOfferNav} aria-labelledby="navbarDropdown">
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
													{packageList && packageList.map((data,index)=>{
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
			
				
			
					  <div className="top-btn-group" style={{paddingRight:'46px'}}> 
			 {/* {userLoggedIn && <a href={'/index-new'} className="sign-in-btn" onClick={() => userLogout()}>{`${userLoginData.first_name} ${userLoginData.last_name}`}<i className="fa fa-sign-out" aria-hidden="true"></i></a>}   */}
			 <a  href="#" className="join-us"><i className="fa fa-plus" aria-hidden="true"></i> Contact us
				<div className="contact-us-box">
					 <h6>For Enquiry</h6>
					<p><strong>Phone:</strong>  82 200 267 77 </p>
					<p><strong>Email:</strong> enquiry@roomsonmytravel.in</p>
				</div>
			 </a >
			 {userLoggedIn && <a  href="#" className="join-us"><i className="fa fa-power-off" aria-hidden="true"></i>
				<div className="contact-us-box">
					 <h6 onClick={() => userLogout()}>Logout({`${userLoginData.first_name} ${userLoginData.last_name}`})</h6>
				</div>
			 </a >}
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
										<span className="text-danger">{error}</span>
									   <input type="text" placeholder="Registered Mobile" onChange={(e) => setMobile(e.target.value)}/>
									   <div >
											<input type="text" style={{width: '70%'}} placeholder="OTP" onChange={(e) => setOtp(e.target.value)} />
											<button type="button" className="btn btn-default btn-warning btn-box" onClick={() => submitLogin()} >Send OTP</button>
									   </div>
									   <div className="clearfix"></div>
									   {/* <div className="row">
										 <div className="col"><input type="checkbox" />Remember me</div>
										 <div className="col"><a href="#forgot-password"  data-toggle="modal">Forgot Password</a></div>
									   </div> 
									   <input type="submit" value="Login" onClick={() => submitLogin()}/>*/}
									   <div>										   
										   <button type="button" style={{width:'100%'}} className="btn btn-default btn-success btn-box" onClick={() => otpValidate()} >Login</button>
									   </div>
									   <div className="clearfix"></div>
									   {/* <p>Dont have an account? <a href="#register-form-modal"  data-toggle="modal">Register</a></p> */}
									   <p></p>
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
