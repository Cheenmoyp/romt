import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import Rooms from '../rooms';
import Search from '../../components/search/search';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import Modal from "react-bootstrap/Modal";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

const HotelDetails = (response) => {
	const [lightboxmodal, setLightboxmodal] = useState(false);
	const [faqList, setFaqList] = useState([]);
	const handleLightBoxClick = () => {
		setLightboxmodal(!lightboxmodal);
	}
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 1
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 1
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 1
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};

	useEffect(() => {
		if (faqList.length == 0) {
			const fetcher = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/hotel-faqs/${response.hoteldata.hotel_id}`).then(response => {
				return response.data
			})
				.catch(error => {
					console.log('error', error);
				});
			fetcher.then(response => {

				setFaqList(response.faqs)
			})
		}
	}, [])


	var checkin = new Date();
	checkin = Date.parse(checkin);
	var checkout_date = new Date();
	checkout_date.setDate(checkout_date.getDate() + 1);
	var checkout = Date.parse(checkout_date);
	var hotel_id = response.hoteldata.hotel_id;
	var q = base64_encode(checkin + "|" + checkout + "|" + hotel_id + "||||");
	var url = "https://roomsonmytravel.bookingjini.com";
	var be_url = url + '/property/?q=' + q;

	//for sticky scroll
	const [scrollval, setScrollval] = useState('');
	const [scrollPrice, setScrollPrice] = useState('');
	useEffect(() => {
		document.addEventListener("scroll", () => {
			const scrollCheck = window.scrollY > 150;
			const scrollCheck2 = window.scrollY > 900;
			console.log('scroll', window.scrollY);
			if (scrollCheck) {
				setScrollval('shrink');
				if (scrollCheck2) {
					setScrollPrice('')
				} else {
					setScrollPrice('shrink')
				}

			} else {
				setScrollval('');
				setScrollPrice('');
			}
		})
	})


	const [totalCartItems, setTotalCartItems] = useState([]);
	const [totalDisplayPrice, setTotalDisplayPrice] = useState(0);
	const [totalPublicCouponPrice, setTotalPublicCouponPrice] = useState(0);

	const [checkinDate, setCheckinDate] = useState();
	const [checkoutDate, setCheckoutDate] = useState();
	const [noOfNight, setNoOfNight] = useState();

	const [editCartItem,setEditCartItem] = useState({})
	const [allowEditCart,setAllowEditCart] = useState(false)
	const [cartIndex,setCartIndex] = useState();




	useEffect(() => {
		let totalPrice = 0;
		let totalDiscountPrice = 0;
		totalCartItems &&
			totalCartItems.length > 0 &&
			totalCartItems.map((cartItem) => {
				let extra_adult_price = 0;
				let extra_child_price = 0;
				cartItem.rooms.map((room) => {
					extra_adult_price += room.extra_adult_price;
					extra_child_price += room.extra_child_price;
				});
				totalDiscountPrice += cartItem.discounted_price;
				totalPrice += cartItem.paid_amount;

			});
		setTotalPublicCouponPrice(totalDiscountPrice);
		setTotalDisplayPrice(totalPrice);


	}, [totalCartItems])


	const functionEditCart = (cartItem,index)=>{
		setEditCartItem(cartItem);
		setAllowEditCart(true);
		setCartIndex(index)
	}


	return (
		<>
			<Header></Header>
			<div className="inner-page-wrapper">
				<div className="inner-page-search-con">
					<div className={`search-con ${scrollval}`}>
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<Search cityid={response.search[0] ? response.search[0] : ''} checkin={response.search[1] ? response.search[1] : ''} checkout={response.search[2] ? response.search[2] : ''} adult={response.search[3] ? response.search[3] : ''} kid={response.search[4] ? response.search[4] : ''} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bred-crumb-ec">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<ul className="h-bred-crumb">
									<li><a href="#">Home</a></li>
									<li><a href="#">Hotels in {response.hoteldata.city_name}</a></li>
									<li>{response.hoteldata.hotel_name}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="heading-group-2">
					<div className="container">
						<div className="row">
							<div className="col-md-9">
								<h2>{response.hoteldata.hotel_name}</h2>
								<p>
									{response.hoteldata.address}
								</p>
							</div>
							<div className="col-md-3">
								<div className="hotel-sharing">
									<ul>


										<li className="h-rating"><a href="#"><i className="fa fa-star-o" aria-hidden="true"></i> {response.hoteldata.star}/5</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="hotel-details-banner">
					<div className="hotel-details-left">
						<div className="container">
							<div className="row">
								<div className="col-md-9">
									<div className="row">
										<div className="col-md-8">
											<div className="hotel-detail-bannerbox">
												<figure >
													<Carousel swipeable={true}
														draggable={true}
														infinite={true}
														responsive={responsive}>
														{response.hoteldata.images && response.hoteldata.images.map((slide, index) => {
															return (
																<img className="hotel-banner-img" src={slide} alt="" title="" key={index} />
															)

														})}
													</Carousel>

												</figure>
											</div>
										</div>
										<div className="col-md-4">
											<div className="hotel-detail-bannerbox hotel-gallery">
												<figure> <a href="#" data-target="#hotelphotos" ><img src={response.hoteldata.image} alt="" title="" /></a>
													<h3> </h3>
												</figure>
											</div>
											<div className="hotel-detail-bannerbox hotel-video">
												<figure> <a href="#" className="v-button"   ><img src={response.hoteldata.image} alt="" title="" /></a>
													<h4 className="video"><a href="#" className="v-button"  >
														<span> </span> </a></h4>
												</figure>
											</div>
										</div>
										<div className="col-md-12">
											{/* <p> */}
											<div
												dangerouslySetInnerHTML={{
													__html: response.hoteldata && response.hoteldata.hotel_description,
												}}
											/>
											{/* </p> */}
										</div>
									</div>
									<div className="hotel-facilities">
										<div className="row">
											<div className="col-md-8">
												<div className="heading-group-2">
													<h4>Facilities at the {response.hoteldata.hotel_name}</h4>
													<p>Facilities here have been <span>rated {response.hoteldata.star} by 1652 guest</span></p>
												</div>
											</div>

										</div>
										<div className="facilitis-with-icon">
											<ul className="row">
												<li className="col"><span className="icon"><img src="/Images/hotels/icons/Free-Parking.png" alt="" title="Free Parking" /></span>Free Parking</li>
												<li className="col"><span className="icon"><img src="/Images/hotels/icons/Wi-Fi.png" alt="" title="Free Wi-Fi" /></span>Free Wi-Fi</li>
												<li className="col"><span className="icon"><img src="/Images/hotels/icons/AirConditioning.png" alt="" title="Air Conditioning" /></span>Air Conditioning</li>
												<li className="col"><span className="icon"><img src="/Images/hotels/icons/RoomServices.png" alt="" title="Room Services" /></span>Room Services</li>
											</ul>
										</div>
										<div className="row amenities">
											<div className="col">
												<div className="amenities-box">
													<h4>Facilities</h4>
													<ul>
														{response.hoteldata.facility.map((slide, index) => {
															if (index < 4) {
																return (
																	// <>
																	<li key={index} >{slide}</li>
																	// </>
																)
															}
														})}
													</ul>
												</div>
											</div>
											<div className="col">
												<div className="amenities-box">
													<h4>   </h4>
													<ul>
														{response.hoteldata.facility.map((slide, index) => {
															if (4 <= index && index < 8) {
																return (
																	// <>
																	<li key={index} >{slide}</li>
																	// </>
																)
															}
														})}
													</ul>
												</div>
											</div>
											<div className="col">
												<div className="amenities-box">
													<h4>  </h4>
													<ul>
														{response.hoteldata.facility.map((slide, index) => {
															if (8 <= index && index < 12) {
																return (
																	// <>
																	<li key={index} >{slide}</li>
																	// </>
																)
															}
														})}
													</ul>
												</div>
											</div>
											<div className="col">
												<div className="amenities-box">
													<h4>  </h4>
													<ul>
														{response.hoteldata.facility.map((slide, index) => {
															if (12 <= index && index < 16) {
																return (
																	// <>
																	<li key={index} >{slide}</li>
																	// </>
																)
															}
														})}
													</ul>
												</div>
											</div>
											<div className="col">
												<div className="amenities-box">
													<h4>   </h4>
													<ul>
														{response.hoteldata.facility.map((slide, index) => {
															if (16 <= index && index < 20) {
																return (
																	// <>
																	<li key={index} >{slide}</li>
																	// </>
																)
															}
														})}
													</ul>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={`hotel-details-right ` + scrollPrice}>
						<div className="container">
							<div className="row">
								<div className="col-md-3 offset-md-9">
									<div className="h-detail-banner-right hoteldetail_right">
										<ul>
											<li>Safe and hygienic places</li>
											<li>Active Social Distance</li>
											<li>Guest & Staff Temperature check</li>
											<li>Safe kitchen practices</li>
										</ul>

										<div className="price">
											<div className="row">
												<div className="col-7">
													<h6>Price starts at</h6>
													<h4><i className="fa fa-inr" aria-hidden="true"></i> {response.hoteldata.starting_price}</h4>

												</div>
												<div className="col-5">
													<p>{response.hoteldata.max_guest} Max. Guests<br />
														1 * Room</p>
												</div>
											</div>
											{/* <a href={be_url}>Book Now</a>  */}
										</div>



									</div>



									{totalCartItems && totalCartItems.length > 0 && <div className="h-detail-banner-right">
										<div className="chkin-chkout">
											<ul>
												<li>
													{checkinDate && <h4>{checkinDate}</h4>}
													<h5>Check In</h5>
												</li>
												<li>
													{noOfNight && <div className="time">
														<h3>{noOfNight}<span>Night</span></h3>
													</div>}
												</li>
												<li>
													{checkoutDate && <h4>{checkoutDate}</h4>}
													<h5>Check Out</h5>
												</li>
											</ul>
										</div>

										{totalCartItems.map((cartItem, id) => (

											<div className="booking-details" key={id}>
												<h6>{cartItem.room_type}({cartItem.plan_type})</h6>
												<h6>Rooms: <span>{cartItem.rooms.length}</span>,
													Adults:
													<span>{cartItem.rooms &&
														cartItem.rooms.reduce((init, room) => {
															return init + room.selected_adult;
														}, 0)}
													</span>,
													Child:<span> {cartItem.rooms &&
														cartItem.rooms.reduce((init, room) => {
															return init + room.selected_child;
														}, 0)}
													</span>
												</h6>
												<div className="b-price">
													<h6>Room Price:  <i className="fa fa-inr"></i>{(cartItem.display_price.toFixed(2))}</h6>
												</div>
												<a className="edit" onClick={() =>functionEditCart(cartItem,id)}><i className="fa fa-pencil" aria-hidden="true"></i></a>
											</div>
										))}

										{totalDisplayPrice > 0 && <div className="view-bu">
											<div id="full-room-pay" className="full-room-pay"><ul className="clearfix"><li>Total Amount</li><li> <i className="fa fa-inr"></i>{totalDisplayPrice.toFixed(2)}</li></ul></div>
										</div>}

										{totalPublicCouponPrice > 0 && <div className="view-bu public-coupon">
											<div id="full-room-pay" className="full-room-pay"><ul className="clearfix"><li>Discount</li><li> <i className="fa fa-inr"></i>{totalPublicCouponPrice.toFixed(2)}</li></ul></div>
										</div>}

										<div>
											<a href="../hotel-booking">
												<button className="prceed-to-payment">
													Continue
												</button>
											</a>
										</div>
									</div>}

								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="view-available-rooms"></div>
				<Rooms name={response.hoteldata.hotel_name} room_id={response.hoteldata.hotel_id} search={response.search} hotel_data={response.hoteldata}
					checkinDate={setCheckinDate} checkoutDate={setCheckoutDate} noOfNight={setNoOfNight} totalCartItems={setTotalCartItems}  editCartItem={editCartItem} allowEditCart={allowEditCart} removeEditAccess={setAllowEditCart} cartIndex={cartIndex}/>

			</div>



			<div className="hotel-police">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>Hotel Policies</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="list-4"
								dangerouslySetInnerHTML={{
									__html: response.hoteldata && response.hoteldata.hotel_policy,
								}}
							/>

						</div>
					</div>
				</div>
			</div>
			<div className="hotel-police">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>Child Policies</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="list-4"
								dangerouslySetInnerHTML={{
									__html: response.hoteldata && response.hoteldata.child_policy,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="hotel-police">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>Cancel Policies</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="list-4"
								dangerouslySetInnerHTML={{
									__html: response.hoteldata && response.hoteldata.cancel_policy,
								}}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="hotel-faq">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<h3>FAQ&apos;s About {response.hoteldata.hotel_name}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							{faqList && faqList.map((slide, index) => {
								return (
									<ul className="hotel-faq-list" key={index}>
										<li>{slide.question}</li>
										<li>{slide.answer}</li>
									</ul>
								)
							})}
							{/* <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
              <li>No, it does not offer any business services</li>
            </ul>
            <ul className="hotel-faq-list">
              <li>Does {response.hoteldata.hotel_name} offer any business services?</li>
              <li>No, it does not offer any business services</li>
		  </ul> */}
						</div>
					</div>
				</div>
			</div>

			<Modal className="modal fade" tabIndex="-1" size="lg" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" show={lightboxmodal}>
				<Modal.Body>
					<div>
						<Carousel swipeable={true}
							draggable={true}
							infinite={true}
							responsive={responsive}>
							{response.hoteldata.images.map((slide, index) => {
								return (
									<div key={index}>
										<img src={slide} />
									</div>
								)
							})}

						</Carousel>
					</div>
				</Modal.Body>
			</Modal>

			<Modal className="modal fade" tabIndex="-1" size="lg" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" show={lightboxmodal}>
				<Modal.Body>

				</Modal.Body>
			</Modal>




			<div className="modal fade videomodal" id="videoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-body">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>

							<div className="embed-responsive embed-responsive-16by9">
								<iframe width="560" height="315" src="https://www.youtube.com/embed/X4p4dFHDQgE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
							</div>
						</div>
					</div>
				</div>
			</div>

			<script>
				{/* //Packages */}

			</script>

			<Footer></Footer>
		</>
	)
}

export async function getServerSideProps(context) {

	let url_param = base64_decode(context.params.url).split("/");
	console.log('psrams', url_param);
	// Fetch data from external API
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_HOST_BE}/hotel-details?hotel_id=${url_param[0]}`
	);

	const response = await res.json()
	return { props: { hoteldata: response.hotel_data, search: url_param } };
}

export default HotelDetails;
