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
import Button from "react-bootstrap/Button";
import moment from "moment";

const HotelDetails = (response) => {
	const [lightboxmodal, setLightboxmodal] = useState(false);
	const [faqList, setFaqList] = useState([]);
	const [modal1, setModal1] = useState(false);
	const [modal2, setModal2] = useState(false);
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
		// document.addEventListener("scroll", () => {
		// 	const scrollCheck = window.scrollY > 150;
		// 	const scrollCheck2 = window.scrollY > 900;
		// 	if (scrollCheck) {
		// 		setScrollval('shrink');
		// 		if (scrollCheck2) {
		// 			setScrollPrice('')
		// 		} else {
		// 			setScrollPrice('shrink')
		// 		}

		// 	} else {
		// 		setScrollval('');
		// 		setScrollPrice('');
		// 	}
		// })
	})

	const openModal1 = () => {
		setModal1(true)
	}

	const openModal2 = () => {
		setModal2(true)
	}

	const [totalCartItems, setTotalCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [allTotalPriceDisplay, setAllTotalPriceDisplay] = useState(0);
	const [totalCouponDiscountPrice, setTotalCouponDiscountPrice] = useState(0);
	const [totalGst, setTotalGst] = useState(0);


	const [checkinDate, setCheckinDate] = useState();
	const [checkoutDate, setCheckoutDate] = useState();
	const [noOfNight, setNoOfNight] = useState();

	const [editCartItem, setEditCartItem] = useState({})
	const [allowEditCart, setAllowEditCart] = useState(false)
	const [cartIndex, setCartIndex] = useState();

	const [paidServices, setPaidServices] = useState([]);

	const [privateCoupon, setPrivateCoupon] = useState("");
	const [privateCouponErr, setPrivateCouponErr] = useState("");
	const [validCoupon, setValidCoupon] = useState([]);




	useEffect(() => {
		let gst_total_price = 0;
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
				gst_total_price += cartItem.tax[0] && cartItem.tax[0].gst_price;
				totalPrice += cartItem.price + extra_adult_price + extra_child_price;

			});
		setTotalCouponDiscountPrice(totalDiscountPrice);
		setTotalPrice(totalPrice);
		setTotalGst(gst_total_price);

	}, [totalCartItems])


	const functionEditCart = (cartItem, index) => {
		setEditCartItem(cartItem);
		setAllowEditCart(true);
		setCartIndex(index)
	}


	useEffect(() => {
		if (response && response.hoteldata) {
			const get_paid_services = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/paidServices/${response.hoteldata.hotel_id}`).then(resp => {
				return resp.data
			})
				.catch(error => {
					console.log('error', error);
				});

			get_paid_services.then(res => {
				if (res.status === 1) {
					res.paidServices.map((item) => {
						let gst_price = 0;
						if (item.service_tax !== 0) {
							gst_price = item.service_amount * item.service_tax / 100
							item.service_tax_price = gst_price;
						}
						else {
							item.service_tax_price = '-'
						}
					})
					setPaidServices(res.paidServices)
				}
				else {
					setPaidServices([])
				}

			})
		}

	}, [response])


	const handlePrivateCoupon = (value) => {
		setPrivateCoupon(value);
	};

	const applyPrivateCoupon = () => {

		let checkin_checkout_date = JSON.parse(sessionStorage.getItem('be_checkin_checkout'))
		let checkin_date = moment(checkin_checkout_date.checkin).format("DD-MM-YYYY");
		let checkout_date = moment(checkin_checkout_date.checkout).format("DD-MM-YYYY");

		let convert_to_date = moment(checkin_checkout_date.checkout).format('YYYY-MM-DD');
		let end_date = moment(convert_to_date).subtract(1, 'days').format('YYYY-MM-DD');

		let all_selected_room_type_id = [];

		totalCartItems &&
			totalCartItems.map((items) => {
				all_selected_room_type_id.push(items.room_type_id);
			});


		if (response && response.hoteldata) {
			const checkPrivateCoupinCode = axios.post(`${process.env.NEXT_PUBLIC_HOST_BE}/coupons/check_coupon_code`, { 'hotel_id': response.hoteldata.hotel_id, 'checkin_date': checkin_date, 'checkout_date': checkout_date, 'code': privateCoupon }).then(response => {

				if (response.data.status === 1) {
					let coupon_to_date = moment(response.data.data.valid_to).format('YYYY-MM-DD');
					let coupon_end_date = moment(coupon_to_date).subtract(1, 'days').format('YYYY-MM-DD');

					let check_out_date = moment(end_date);
					let coupon_expiry_date = moment(coupon_end_date);

					if (check_out_date <= coupon_expiry_date) {
						if (response.data.data.room_type_id === 0) {
							setValidCoupon([response.data.data]);
							setModal1(false);
							setPrivateCouponErr('');


						} else {
							if (all_selected_room_type_id.includes(response.data.data.room_type_id)) {
								setValidCoupon([response.data.data]);
								setModal1(false);
								setPrivateCouponErr('');

							} else {
								setPrivateCouponErr(
									'Sorry, This coupon is not applicable to the selected room types!'
								);
							}
						}
					} else {
						setPrivateCouponErr('Sorry, This Coupon Validity has expired!');
					}
				} else {
					setPrivateCouponErr('Invalid coupon');
				}


			})
				.catch(error => {
					console.log('error', error);
				});
		}

	}


	useEffect(() => {
		let totaldiscountprice = 0;
		if (validCoupon[0]) {
			let gst_total_price = 0;
			totaldiscountprice = checkForDates(validCoupon);
			setTotalCouponDiscountPrice(totaldiscountprice);

			totalCartItems.length > 0 &&
				totalCartItems.map((cartItem) => {
					if (validCoupon[0].room_type_id === 0 || validCoupon[0].room_type_id === cartItem.room_type_id) {
						let gstAmount = calculateGstAmount(cartItem.rooms, cartItem.max_people).toFixed(2);
						cartItem.gst_price_after_coupon = parseFloat(gstAmount);
						cartItem.tax[0].gst_price = parseFloat(gstAmount);
					}
					gst_total_price += cartItem.tax[0].gst_price;
				});
				setTotalGst(gst_total_price);
		}
	}, [validCoupon]);


	const checkForDates = (coupon) => {
		let checkin_checkout_date = JSON.parse(sessionStorage.getItem('be_checkin_checkout'))

		let from_date = moment(checkin_checkout_date.checkin).format("YYYY-MM-DD");
		let to_date = moment(checkin_checkout_date.checkout).format("YYYY-MM-DD");
		let end_date = moment(to_date).subtract(1, "days").format("YYYY-MM-DD");


		let dateArray = getDateArray(from_date, end_date);

		let coupon_start_date = moment(coupon[0].valid_from).format("YYYY-MM-DD");
		let coupon_to_date = moment(coupon[0].valid_to).format("YYYY-MM-DD");
		let coupon_end_date = moment(coupon_to_date).subtract(1, "days").format("YYYY-MM-DD");

		let couponArray = getDateArray(coupon_start_date, coupon_end_date);

		let discountPrice = 0;
		totalCartItems &&
			totalCartItems.map((cartItem) => {
				let private_discount_price = 0;
				if (coupon[0].room_type_id === 0) {
					dateArray &&
						dateArray.map((value, index) => {
							if (couponArray && couponArray.length > 0) {
								if (couponArray.includes(value)) {
									cartItem.rooms.map((rates_for_discount) => {

										let total_bar_price = 1;
										rates_for_discount.day_wise_rates && rates_for_discount.day_wise_rates.map((day_rate) => {
											if (value === day_rate.date) {
												if (rates_for_discount.selected_adult < cartItem.max_people) {
													if (day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1] == 0 || day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1] == "" || !day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1]) {
														total_bar_price = day_rate.bar_price
													}
													else {
														total_bar_price = parseFloat(day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1])
													}
												}
												else {
													total_bar_price = day_rate.bar_price
												}

												discountPrice += (total_bar_price / 100) * coupon[0].discount;
												private_discount_price += (total_bar_price / 100) * coupon[0].discount;
											}
										})
									});
								}
							}
						});
				} else {
					if (coupon[0].room_type_id === cartItem.room_type_id) {
						dateArray &&
							dateArray.map((value, index) => {
								if (couponArray && couponArray.length > 0) {
									if (couponArray.includes(value)) {
										cartItem.rooms.map((rates_for_discount) => {

											let total_bar_price = 1;
											rates_for_discount.day_wise_rates && rates_for_discount.day_wise_rates.map((day_rate) => {
												if (value === day_rate.date) {

													if (rates_for_discount.selected_adult < cartItem.max_people) {
														if (day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1] == 0 || day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1] == "" || !day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1]) {
															total_bar_price = day_rate.bar_price
														}
														else {
															total_bar_price = parseFloat(day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1])
														}
													}
													else {
														total_bar_price = day_rate.bar_price
													}

													discountPrice += (total_bar_price / 100) * coupon[0].discount;
													private_discount_price += (total_bar_price / 100) * coupon[0].discount;
												}
											})

										});
									}
								}
							});
					} else {
						discountPrice += cartItem.discounted_price;
						private_discount_price += cartItem.discounted_price;
					}
				}
				cartItem.private_discount_price = private_discount_price
			});
		return discountPrice;
	};


	const getDateArray = (startDate, stopDate) => {
		var dateArray = [];
		var currentDate = moment(startDate);
		var stopDate = moment(stopDate);
		while (currentDate <= stopDate) {
			dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
			currentDate = moment(currentDate).add(1, "days");
		}
		return dateArray;
	};


	const calculateGstAmount = (rooms, max_people) => {
		let checkin_checkout_date = JSON.parse(sessionStorage.getItem('be_checkin_checkout'))
		let from_date = moment(checkin_checkout_date.checkin).format("YYYY-MM-DD");
		let to_date = moment(checkin_checkout_date.checkout).format("YYYY-MM-DD");
		let end_date = moment(to_date).subtract(1, "days").format("YYYY-MM-DD");

		let dateArray = getDateArray(from_date, end_date);

		let gstAmount = 0;

		let coupon_start_date = moment(validCoupon[0].valid_from).format("YYYY-MM-DD");
		let coupon_to_date = moment(validCoupon[0].valid_to).format("YYYY-MM-DD");
		let coupon_end_date = moment(coupon_to_date).subtract(1, "days").format("YYYY-MM-DD");

		let couponArray = getDateArray(coupon_start_date, coupon_end_date);
		dateArray &&
			dateArray.map((value, index) => {
				if (couponArray && couponArray.length > 0) {
					if (couponArray.includes(value)) {
						rooms.map((rates_for_discount) => {
							let discountPrice = 0;
							let total_bar_price = 1;
							let gst_price;
							let bar_price_for_discount = 1;
							rates_for_discount.day_wise_rates && rates_for_discount.day_wise_rates.map((day_rate) => {
								if (value === day_rate.date) {
									if (rates_for_discount.selected_adult < max_people) {
										if (day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1] == 0 || day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1] == "" || !day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1]) {
											total_bar_price = day_rate.bar_price
											bar_price_for_discount = day_rate.bar_price

										}
										else {
											total_bar_price = parseFloat(day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1])
											bar_price_for_discount = parseFloat(day_rate.multiple_occupancy[rates_for_discount.selected_adult - 1])

										}

									}
									else {
										total_bar_price = day_rate.bar_price
										bar_price_for_discount = day_rate.bar_price
									}

									if (rates_for_discount.extra_adult_price > 0 && rates_for_discount.no_of_extra_adult && rates_for_discount.no_of_extra_adult > 0) {
										total_bar_price = total_bar_price + (day_rate.extra_adult_price) * rates_for_discount.no_of_extra_adult;
									}

									if (rates_for_discount.extra_child_price > 0 && rates_for_discount.no_of_extra_child && rates_for_discount.no_of_extra_child > 0) {
										total_bar_price = total_bar_price + (day_rate.extra_child_price) * rates_for_discount.no_of_extra_child;
									}

									discountPrice += (bar_price_for_discount / 100) * validCoupon[0].discount;
									gst_price = total_bar_price - discountPrice;
									const gstPercent = checkGSTPercent(gst_price);
									gstAmount += gst_price * gstPercent / 100;

								}
							})
						});
					}
				}
			});
		return gstAmount;
	};


	const checkGSTPercent = (price) => {
		if (price <= 1000) {
			return 0;
		} else if (price > 1000 && price <= 7500) {
			return 12;
		} else if (price > 7500) {
			return 18;
		}
	};


	const [paidServiceCart, setPaidServiceCart] = useState([]);
	const [limitMessage, setLimitMessage] = useState("");
	const [serviceAddMessage, setServiceAddMessage] = useState("");
	const addService = (service) => {
		let noPaidServiceCart = true;
		let newPaidserviceCart = [];
		paidServiceCart &&
			paidServiceCart.map((paidService) => {
				if (paidService.service_no == service.paid_service_id) {
					if (paidService.qty < 3) {
						paidService.qty += 1;
						noPaidServiceCart = false;
						setLimitMessage("");
					} else {
						noPaidServiceCart = false;
						setLimitMessage("You cannot add more than 3 add-on services!");
					}
				}
			});
		newPaidserviceCart = [...paidServiceCart];
		if (noPaidServiceCart) {
			let paidServiceObject = {
				service_no: service.paid_service_id,
				service_name: service.service_name,
				price: service.service_amount,
				display_price: service.service_amount,
				qty: 1,
				service_tax: service.service_tax
			};
			newPaidserviceCart = [...paidServiceCart];
			newPaidserviceCart.push(paidServiceObject);
		}
		setPaidServiceCart(newPaidserviceCart);
		setServiceAddMessage("A service has been added !");
	};


	const removeService = (paidService) => {
		paidServiceCart &&
			paidServiceCart.map((paidServiceIncart, index) => {
				if (paidServiceIncart.service_no === paidService.service_no) {
					paidServiceCart.splice(index, 1);
				}
			});
		let newPaidserviceCart = [...paidServiceCart];
		setPaidServiceCart(newPaidserviceCart);
		setServiceAddMessage("");
	};

	//Set the Total Price  After the paid service
	const [totalPaidService, setTotalPaidService] = useState(0);


	const totalPaidServicePrice = () => {
		let paid_service_total = 0;
		let display_paid_service_total = 0;
		let total_gst_price_for_paid_service = 0;
		let total_paid_service_price = 0
		setTotalPaidService(paid_service_total);
		paidServiceCart &&
			paidServiceCart.map((paidService) => {
				paid_service_total += (paidService.price * paidService.qty);
				display_paid_service_total +=
					paidService.display_price * paidService.qty;
				total_gst_price_for_paid_service += (paidService.price * paidService.service_tax / 100) * paidService.qty;
			});
		total_paid_service_price = paid_service_total + total_gst_price_for_paid_service
		setTotalPaidService(total_paid_service_price);
	};



	useEffect(() => {
		totalPaidServicePrice();
	}, [paidServiceCart, totalCartItems]);


	useEffect(() => {

		setAllTotalPriceDisplay(
			(
				totalPrice +
				totalGst -
				totalCouponDiscountPrice +
				totalPaidService
			).toFixed(2)
		);

		totalCartItems.map((cartItem) => {
			cartItem.paid_amount =
				totalPrice +
				totalGst -
				totalCouponDiscountPrice +
				totalPaidService
			cartItem.paid_amount_per = 100;

			if (cartItem.private_discount_price) {
				cartItem.discounted_price = cartItem.private_discount_price
			}
		});

	}, [
		totalPrice,
		totalCouponDiscountPrice,
		totalGst,
		totalPaidService,
		totalCartItems,
	]);

	const sendUpdatedCartData = () =>{
		sessionStorage.setItem("updated_cart", JSON.stringify(totalCartItems));
		sessionStorage.setItem("paid_service_cart",JSON.stringify(paidServiceCart))
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
											<div className="col-md-12">
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
											<div class="col-md-12">
												<h4>Facilities</h4>
											</div>
											<div className="col">
												<div className="amenities-box">
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
												<a className="edit" onClick={() => functionEditCart(cartItem, id)}><i className="fa fa-pencil" aria-hidden="true"></i></a>
											</div>
										))}



										{paidServiceCart && paidServiceCart.length > 0 && paidServiceCart.map((paidServiceIncart, i) => (

											<div className="booking-details" key={i}>
												<div className="b-price">
													<h6>{paidServiceIncart.qty}&nbsp; x &nbsp;{paidServiceIncart.service_name}&nbsp;:  <i className="fa fa-inr"></i>{paidServiceIncart.price * paidServiceIncart.qty}</h6>
												</div>
												<div className="b-price">
													<h6>GST:  <i className="fa fa-inr"></i>{(paidServiceIncart.price * paidServiceIncart.service_tax / 100) * paidServiceIncart.qty}</h6>
												</div>

												<a className="edit" onClick={() => removeService(paidServiceIncart)}><i className="fa fa-times" aria-hidden="true"></i></a>
											</div>
										))}



										{allTotalPriceDisplay > 0 && <div className="view-bu">
											<div id="full-room-pay" className="full-room-pay"><ul className="clearfix"><li>Total Amount</li><li> <i className="fa fa-inr"></i>{allTotalPriceDisplay}</li></ul></div>
										</div>}

										{totalCouponDiscountPrice > 0 && <div className="view-bu public-coupon">
											<div id="full-room-pay" className="full-room-pay"><ul className="clearfix"><li>Discount</li><li> <i className="fa fa-inr"></i>{totalCouponDiscountPrice.toFixed(2)}</li></ul></div>
										</div>}

										<div className="cupon-click">
											<ul>
												<li>Have a coupon code ?<br /><span onClick={openModal1}>Click Here</span></li>
												<li><span onClick={openModal2}>Click Here</span>for addon services</li>
											</ul>
										</div>

										<div>
											<a href="../hotel-booking">
												<button className="prceed-to-payment" onClick={sendUpdatedCartData}>
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
					checkinDate={setCheckinDate} checkoutDate={setCheckoutDate} noOfNight={setNoOfNight} totalCartItems={setTotalCartItems} editCartItem={editCartItem} allowEditCart={allowEditCart} removeEditAccess={setAllowEditCart} cartIndex={cartIndex} />
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

			<Modal className="modal fade cupon-modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-backdrop="true" show={modal1}>
				<Modal.Body>
					<Button variant="close" onClick={() => setModal1(false)}>
					</Button>
					<h3>Apply Coupon Here</h3>
					<div className="modal-cupons">
						<div className="row">
							{/* <div className="col-md-6">
								<div className="coupon-card text-center">
									<p className="coupon-message text-center">Applicable For: <span>ALL</span></p>
									<h3 className="text-center">Save Upto</h3>
									<div className="coupon-discount green"><span>37<div>%</div></span></div>
									<div className="coupon-code"><span>testpublic37</span></div>
									<div className="coupon-apply-button"><a>Applied <i className="material-icons icon"></i></a></div>
									<p className="coupon-message center-align"><span className="coupon-border">Valid From:22-Jan</span><span className="coupon-border">Valid To:01-Mar</span></p>
								</div>
							</div>
							<div className="col-md-6">
								<div className="coupon-card text-center">
									<p className="coupon-message text-center">Applicable For: <span>ALL</span></p>
									<h3 className="text-center">Save Upto</h3>
									<div className="coupon-discount green"><span>37<div>%</div></span></div>
									<div className="coupon-code"><span>testpublic37</span></div>
									<div className="coupon-apply-button"><a>Applied <i className="material-icons icon"></i></a></div>
									<p className="coupon-message center-align"><span className="coupon-border">Valid From:22-Jan</span><span className="coupon-border">Valid To:01-Mar</span></p>
								</div>
							</div> */}
							<div className="col-md-12">
								<div className="cupon-apply-form">
									<form>
										<input type="text" placeholder="Have a coupon code type here" value={privateCoupon} onChange={(e) => handlePrivateCoupon(e.target.value)} />
										<a className="coupon-btn" onClick={applyPrivateCoupon}>Apply </a>
									</form>
									{privateCouponErr && <p className='text-center text-danger'>{privateCouponErr}</p>}
								</div>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>

			<Modal className="modal fade cupon-modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" data-backdrop="true" show={modal2}>
				<Modal.Body>
					<Button variant="close" onClick={() => setModal2(false)}>
					</Button>
					<h3>Get The Extra Paid Services</h3>
					<div className="modal-cupons">
						<div className="row">
							<div className="col-md-12 text-center">
								<div className="extra-paid">
									<ul className="row">
										<li className="col-md-3"><h4>Service Name</h4></li>
										<li className="col-md-3"><h4>Service Amount</h4></li>
										<li className="col-md-3"><h4>GST</h4></li>
										<li className="col-md-3"></li>
									</ul>

									{paidServices &&
										paidServices.length > 0 &&
										paidServices.map((paidService, id) => {
											return (
												<ul className="row">
													<li className="col-md-3">{paidService.service_name}</li>
													<li className="col-md-3"><i className="fa fa-inr" aria-hidden="true"></i>{paidService.service_amount}</li>

													{paidService.service_tax_price !== "-" ?
														<li className="col-md-3"><i className="fa fa-inr" aria-hidden="true"></i>{paidService.service_tax_price}({paidService.service_tax}%)</li>
														:
														<li className="col-md-3">-</li>
													}
													<li className="col-md-3"><a className="service-btn" onClick={() => addService(paidService)}>Add Service</a></li>
												</ul>
											)
										})}
									{serviceAddMessage && <p className="text-center text-danger">{serviceAddMessage}</p>}
									{limitMessage && <p className="text-center text-danger">{limitMessage}</p>}

								</div>
							</div>

						</div>
					</div>
				</Modal.Body>
			</Modal>

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
