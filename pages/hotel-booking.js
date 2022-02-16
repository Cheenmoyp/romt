import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import axios from 'axios';
import moment from "moment";

const HotelBooking = () => {

    /* var selectedRoom = window.localStorage.getItem('selectedRoom');
    
    console.log(selectedRoom); */
    const [HotelDetails, setHotelDetails] = useState([]);

    // const fetch  = axios.get(`${process.env.BE_PUBLIC_HOST}/hotel-details?hotel_id=${selectedRoom.hotel_id}`).then(response => {
    //     return response.data.data
    //   })
    //   .catch(error => {
    //       console.log('error', error);
    //   });

    //   fetch.then(response => {
    //     if(HotelDetails && HotelDetails.length == 0 ) {
    //         setHotelDetails(response)
    //     }
    // })
    //     console.log(HotelDetails);



    const [userState, setUserState] = useState({

        firstName: "",
        lastName: "",
        emailId: "",
        countryCode: "+91",
        mobile: "",

    });


    const handleChange = (e, name) => {
        setUserState((prevState) => ({ ...prevState, [name]: e }));
    };

    const [cart, setCart] = useState([]);
    const [hotelData, setHotelData] = useState({});
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [paidServiceData, setPaidServiceData] = useState([]);


    useEffect(() => {

        let checkin_checkout_date = JSON.parse(sessionStorage.getItem('be_checkin_checkout'))
        let checkin_date = moment(checkin_checkout_date.checkin).format("DD-MM-YYYY");
        let checkout_date = moment(checkin_checkout_date.checkout).format("DD-MM-YYYY");


        dateRange.startDate = checkin_date;
        dateRange.endDate = checkout_date;

        setDateRange({ ...dateRange });


        // setCart(JSON.parse(sessionStorage.getItem('be_cart')));
        setCart(JSON.parse(sessionStorage.getItem('updated_cart')));
        setHotelData(JSON.parse(sessionStorage.getItem('be_hotel_data')));
        setPaidServiceData(JSON.parse(sessionStorage.getItem('paid_service_cart')))

    }, [])

    const [{ firstNameErr, lastNameErr, emailIdErr, mobileErr }, setStateErr,] = useState("");


    const proceedForPayment = () => {
        setStateErr({});
        let textRegex = /^[A-Za-z ]*$/;
        let emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!userState.firstName || userState.firstName === "null" || !userState.lastName || userState.lastName === "null") {
            setStateErr({ firstNameErr: "Guest name is required!", lastNameErr: "Guest name is required!" });
            return false;
        }

        if (!textRegex.test(userState.firstName)) {
            setStateErr({ firstNameErr: 'Name should contain only letters!' });
            return false;
        }

        if (!textRegex.test(userState.lastName)) {
            setStateErr({ lastNameErr: 'Name should contain only letters!' });
            return false;
        }

        if (
            !userState.emailId ||
            userState.emailId === "null" ||
            !emailRegex.test(userState.emailId)
        ) {
            setStateErr({ emailIdErr: "Email id should be valid" });
            return false;
        }

        if (
            !userState.mobile ||
            userState.mobile === "null" ||
            userState.mobile.length !== 10
        ) {
            setStateErr({ mobileErr: "Mobile no should be valid" });
            return false;
        }

        let comp = window.location.origin;
        let company_url =
            comp.search("https") > -1
                ? comp.replace("https://", "")
                : comp.replace("http://", "");


        axios.post(`${process.env.NEXT_PUBLIC_HOST_BE}/user/register`, {

            company_url: company_url,
            email_id: userState.emailId,
            mobile: userState.mobile,
            first_name: userState.firstName,
            last_name: userState.lastName,
            company_name: "",
            GST_IN: "",
            address: "",
            zip_code: "",
            country: "",
            state: "",
            city: "",
            identity: "",
            identity_no: "",
            expiry_date: "",
            date_of_birth: "",
            GSTIN: "",

        })
            .then(function (response) {


                if (response.data && response.data.status === 1) {
                    let api_key = hotelData && hotelData.api_key;
                    let hotel_id = hotelData.hotel_id;

                    let from_date = dateRange.startDate && dateRange.startDate;
                    let to_date = dateRange.endDate && dateRange.endDate;

                    let new_book_data = {
                        hotel_id: hotel_id,
                        from_date: from_date,
                        to_date: to_date,
                        cart: cart,
                        visitors_ip: "1.1.1.1",
                        coupon: [],
                        paid_service: paidServiceData,
                        reference: null,


                    }

                    axios.post(`${process.env.NEXT_PUBLIC_HOST_BE}/bookingEngine/bookings/${api_key}`,
                        { ...new_book_data },
                        {
                            headers: {
                                Authorization: `Bearer ${response.data.auth_token}`,
                            },
                        },
                    )
                        .then(function (response_be) {

                            if (response_be.data.status === 1) {

                                var invoice_id = btoa(response_be.data.invoice_id);

                                // let str = window.location.origin;
                                let str = "http://romtbooking.bookingjini.tech";

                                if (str.search("bookingjini.com") >= 0) {
                                    var url =
                                        "https://be.bookingjini.com/payment/" +
                                        invoice_id +
                                        "/" +
                                        response_be.data.invoice_secureHash;
                                } else {
                                    var url =
                                        str +
                                        "/payment/" +
                                        invoice_id +
                                        "/" +
                                        response_be.data.invoice_secureHash;
                                }
                                window.location.assign(url);
                            }
                            else {
                                console.log(response_be.data.message);
                            }


                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                }


            })
            .catch(function (error) {
                console.log(error);
            });

    };

	const [totalDisplayPrice, setTotalDisplayPrice] = useState(0);

    useEffect(() => {
		let totalPrice = 0;
		cart &&
			cart.length > 0 &&
			cart.map((cartItem) => {
				totalPrice += cartItem.paid_amount;
			});
		setTotalDisplayPrice(totalPrice);


	}, [cart])

    return (
        <>
            <Header></Header>
            <div className="inner-page-wrapper">
                <div className="hotel-booking">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                {hotelData && <div className="booking-left">
                                    <div className="booking-page-box row">
                                        <div className="col-sm-3">
                                            <figure><img src={hotelData.image} alt="" title="" /></figure>
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="right">
                                                <h4>{hotelData.hotel_name}</h4>
                                                <h5><i className="fa fa-map-marker" aria-hidden="true"></i> {hotelData.address}</h5>
                                                <h6><span>{`${hotelData.star}/5`}</span></h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                <div className="booking-page-box-2">

                                    {dateRange &&
                                        <div className="row">
                                            <div className="col-md-3">
                                                <p>Check In</p>
                                                {dateRange.startDate && <h5>{dateRange.startDate}</h5>}
                                            </div>
                                            <div className="col-md-3">
                                                <p>Check Out</p>
                                                {dateRange.endDate && <h5>{dateRange.endDate}</h5>}
                                            </div>
                                        </div>
                                    }

                                </div>
                                {cart && cart.map((cartItems,id) => {
                                    return(
                                        <div className="booking-page-box-3" key={id}>
                                            <div className="booking-page-box-3-heading">
                                                <h4>{`${cartItems.rooms && cartItems.rooms.length}Room for ${cartItems.rooms &&
                                                    cartItems.rooms.reduce((init, room) => {
                                                        return init + room.selected_adult;
                                                    }, 0)} Adults`}</h4>
                                            </div>
                                            <div className="booking-page-box-3-content">
                                                <ul>
                                                    <li>
                                                        <h5>{`${cartItems.rooms && cartItems.rooms.length} x ${cartItems.room_type}`}</h5>
                                                    </li>
                                                    <li><img src="/Images/hotels/icons/adult.png" title="" alt="" /><span>{`${cartItems.rooms &&
                                                        cartItems.rooms.reduce((init, room) => {
                                                            return init + room.selected_adult;
                                                        }, 0)} Adults`}</span>{' '}
                                                        
                                                        <span>
                                                            {`${cartItems.rooms &&
                                                                cartItems.rooms.reduce((init, room) => {
                                                                    return init + room.selected_child;
                                                                }, 0)} Child`}
                                                            ,
                                                        </span>
                                                        
                                                        
                                                        <br />
                                                        <span>{cartItems.plan_name}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                                <div className="guest-detail">
                                    <h4>Guest Details</h4>
                                    <form className="row">
                                        <div className="col-sm-2">
                                            <label>Title</label>
                                            <select>
                                                <option>Mr</option>
                                                <option>Mrs</option>
                                            </select>
                                        </div>
                                        <div className="col-sm-5">
                                            <label>First Name</label>
                                            <input type="text" placeholder="" value={userState.firstName || ""} onChange={(e) => handleChange(e.target.value, "firstName")} />
                                            {firstNameErr && (
                                                <p className="red-text text-darken-1">
                                                    {firstNameErr}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-sm-5">
                                            <label>Last Name</label>
                                            <input type="text" placeholder="" value={userState.lastName || ""} onChange={(e) => handleChange(e.target.value, "lastName")} />
                                            {lastNameErr && (
                                                <p className="red-text text-darken-1">
                                                    {lastNameErr}
                                                </p>
                                            )}
                                        </div>
                                        {/* <div className="col-md-12"> <a href="">Add Guest</a> </div> */}
                                        <div className="col-sm-12">
                                            <label>Email Address(Your booking voucher will be sent to this emal address)</label>
                                            <input type="text" placeholder="" value={userState.emailId || ""} onChange={(e) => handleChange(e.target.value, "emailId")} />
                                            {emailIdErr && (
                                                <p className="red-text text-darken-1">
                                                    {emailIdErr}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-sm-12">
                                            <label>Mobile Number</label>
                                            <input type="text" placeholder="" value={userState.mobile || ""} onChange={(e) => handleChange(e.target.value, "mobile")} />
                                            {mobileErr && (
                                                <p className="red-text text-darken-1">
                                                    {mobileErr}
                                                </p>
                                            )}
                                        </div>
                                        {/* <div className="col-sm-12">
                                            <input type="checkbox" />
                                            <label>Enter GST Details (Optional)</label>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {cart && <div className="booking-page-right">
                                    {/* <h4>Price Break-up</h4> */}
                                    <ul className="price-breakup">
                                        {/* <li>
                                <h6>{`${cart.rooms && cart.rooms.length}Room * 1Night`}</h6>
                                Base Price <span className="price">{cart.display_price}</span></li>
                            <li>
                                <h6>Total Discount 
                                <a href="#" className="information"><i className="fa fa-info" aria-hidden="true"></i>
                                <div className="information-box">
                                    <span className="icon"><img src="/Images/icons/comment-ic.png" alt="" title="" /></span>
                                    <h6><i className="fa fa-info" aria-hidden="true"></i>Total Discount</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div> 
                                </a>
                            </h6>
                                <span className="price">329</span></li>
                            <li>
                                <h6>Price after Discount </h6>
                                <span className="price">720</span></li>
                            <li>
                                <h6>Service Fees <a href="#" className="information"><i className="fa fa-info" aria-hidden="true"></i>
                                <div className="information-box">
                                    <span className="icon"><img src="/Images/icons/comment-ic.png" alt="" title="" /></span>
                                    <h6><i className="fa fa-info" aria-hidden="true"></i>Service Fees</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div> 
                                </a></h6>
                                <span className="price">45</span></li>
                            <li>
                                <h6>Donate 10 for COVID-19 <a href="#" className="information"><i className="fa fa-info" aria-hidden="true"></i>
                                <div className="information-box">
                                    <span className="icon"><img src="/Images/icons/comment-ic.png" alt="" title="" /></span>
                                    <h6><i className="fa fa-info" aria-hidden="true"></i>Donate 10 for COVID-19</h6>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div> 
                                </a><br/>
                                Relief and other charity Initiatives T&Cs </h6>
                                <span className="price">10</span></li> */}
                                        {totalDisplayPrice > 0 && <li>
                                            <h6>Total Amount to be paid</h6>
                                            <span className="price">{totalDisplayPrice.toFixed(2)}</span></li>}
                                    </ul>
                                </div>}
                                {/* <div className="booking-supperoffers">
                            <ul className="price-breakup">
                            <li>
                                <h6>ROMT Super Offer</h6>
                                <strong>Congratulation You have saved 110 with ROMT Super Offer</strong> <span className="price">1.049</span></li>
                            </ul>
                        </div> */}
                                {/* <div className="booking-promocode">
                            <input type="text" placeholder="Got A Promocode?"/>
                            <button>Apply</button>
                        </div> */}
                                <div className="booking-buttons">
                                    <button onClick={proceedForPayment}>Proceed for Payment Option</button>
                                    {/* <a href="#">Login now to book the room</a>  */}
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

export default HotelBooking;
