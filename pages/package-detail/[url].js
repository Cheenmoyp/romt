import Head from 'next/head';
import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import axios from 'axios';
import { decode as base64_decode, encode as base64_encode } from 'base-64';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import { useRouter } from 'next/router'
import {
    IconBellRinging2,
    IconX,
    IconPlayerPlay,
    IconChevronRight,
} from "@tabler/icons";
import moment from 'moment';

const PackageDetail = (response) => {
    const router = useRouter()
    const [checkAvailability, setCheckAvailability] = useState(true);
    const [location, setLocation] = useState([]);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [hotelId, setHotelId] = useState();
    const [hotelName, setHotelName] = useState('');
    const [hotels, setHotels] = useState([]);
    const [cart, setCart] = useState({});
    const [extraAdultMessage, setExtraAdultmessage] = useState("");
    const [extraChildMessage, setExtraChildmessage] = useState("");

    const [packageDate, setPackageDate] = useState({ date: new Date() });
    const [selectedPackage, setSelectedPackage] = useState({});
    const [packageInventory, setPackageInventory] = useState([]);
    const [packageAvailability, setPackageAvailability] = useState();

    function destinationList() {
		const fetcher = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-destination-list/2565/TOP`).then(response => {
			return response.data.destinations;
		})
			.catch(error => {
				console.log('error', error);
			});
		fetcher.then(response => {
			if (location.length == 0) {
				setLocation(response)
			}
		})
	}

    useEffect(()=>{
        sessionStorage.removeItem("package_cart");
        setHotels(response.packagehotels);
		destinationList();
    },[])

    const handleBookClick = (data, hotel_id) => {

        setCart({});
        setPackageAvailability();

        let check_availablity_date = moment(packageDate.date).format("DD-MM-YYYY");

        const fetch_package_details_prepare_cart = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/package_booking/get_package_details_by_package_id/${hotel_id}/${data.package_id}/${check_availablity_date}/INR`).then(response => {
            return response.data;
        })
            .catch(error => {
                console.log('error', error);
            });

        fetch_package_details_prepare_cart.then(response => {
            if (response.status === 1) {
                setPackageInventory(response.package_inventory);
                let packageData = response.package_inventory[0]

                let cartItem = {
                    package_type: "",
                    package_id: 0,
                    price: 0,
                    packages: [],
                    tax: [],
                    discounted_price: 0,
                };


                cartItem["package_type"] = packageData.package_name;
                cartItem["package_id"] = packageData.package_id;
                cartItem["room_type_id"] = packageData.room_type_id;
                cartItem["nights"] = packageData.nights;
                cartItem["price"] = 0;
                cartItem["add_room"] = false;
                cartItem["added_to_cart"] = true;
                let total_adults = parseInt(packageData.adults) + parseInt(packageData.extra_person);
                let total_child = parseInt(packageData.max_child) + parseInt(packageData.extra_child);

                let count = [];
                let child_count = [];


                for (let i = 1; i <= total_adults; i++) {
                    let countdata = { option: i, value: i };
                    count.push(countdata);
                }
                for (let j = 1; j <= total_child; j++) {
                    let countdata = { option: j, value: j };
                    child_count.push(countdata);
                }

                cartItem["packages"][0] = {
                    packages: "Package1",
                    adults: count,
                    selected_adult: parseInt(packageData.adults),
                    childs: child_count,
                    selected_child: parseInt(packageData.max_child),
                    selected_infant: 0,
                    extra_adult_price: 0,
                    extra_child_price: 0,
                    bar_price: parseFloat(packageData.discounted_amount),
                    package_date_from : moment(response.converted_package_inventory[0].date_from).format("DD-MM-YYYY"),
                    package_date_to:moment(response.converted_package_inventory[0].date_to).format("DD-MM-YYYY"),
                };


                cart.checkin_date = moment(packageDate.date).format("DD-MM-YYYY");
                cart.checkout_date = moment(packageDate.date).add(cart.nights, "days").format("DD-MM-YYYY");            



                setHotelId(hotel_id);
                setHotelName(data.hotel_name);
                setFormData({ 'hotel_id': hotel_id });
                setCart(cartItem);
                setSelectedPackage(data);
                setModal(true);

            }
        })

    }


    const addClassName = () => {
        setCheckAvailability(false);
    }

    const proceed = () => {

        cart.price = 0;
        let package_price = 0;
        let extra_adult_price = 0;
        let extra_child_price = 0;

        cart.packages.map((pack) => {
            extra_adult_price += pack.extra_adult_price;
            extra_child_price += pack.extra_child_price;
            cart.price += pack.bar_price;
            package_price += parseFloat(pack.bar_price);
        });

        cart.display_price = cart.price + extra_adult_price + extra_child_price;

        cart.tax = [];
        let total_gst_amount = getGstPrice(
            cart.nights,
            cart.packages.length,
            package_price +
            extra_adult_price +
            extra_child_price -
            cart.discounted_price
        );

        cart.tax.push({
            gst_price: total_gst_amount,
            other_tax: [],
        });




        let totalPrice = 0;
        totalPrice += cart.price + extra_adult_price + extra_child_price;
        
        cart.paid_amount = (totalPrice + total_gst_amount - cart.discounted_price).toFixed(2) ;
        cart.paid_amount_per = 100;


        setCart({ ...cart });
        sessionStorage.setItem("package_cart", JSON.stringify(cart));


        let url = base64_encode(hotelId);
        router.push(`/payment-package/${url}`);
    }


    const getGstPrice = (no_of_nights, no_of_rooms, price) => {
        let per_night_price = price / no_of_nights / no_of_rooms;
        let gstPercent = checkGSTPercent(per_night_price);
        let gstPrice = (price * gstPercent) / 100

        return gstPrice;
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

    var obj = [{}];
    const handleFormChange = (params) => {
        setPackageAvailability();
        setPackageDate(params);

        obj.push(params);
        setFormData(obj);
    }

    const handleAdultChange = (e, package_id, packNo) => {
        let invData = getAllInv(package_id);
        let selected_adults = parseInt(e.target.value);
        let update_price = 0;
        let extra_adult_price = 0;
        let no_of_extra_adults = 0;

        //Check For maximum room capacity
        let checkMaxRoomCapacityData = {
            package_id: package_id,
            max_adult: cart.max_people,
            max_child: cart.max_child,
            selected_person: selected_adults,
            room: packNo,
            type: "adult",
        };
        //Check For maximum room capacity

        checkMaxRoomCapacity(checkMaxRoomCapacityData);

        if (selected_adults < invData["max_people"]) {
            extra_adult_price = 0;
            update_price = invData["bar_price"];
        }
        if (selected_adults > invData["max_people"]) {
            extra_adult_price = 0;
            update_price = getPackagePrice(package_id);
            no_of_extra_adults = selected_adults - invData["max_people"];
            extra_adult_price = no_of_extra_adults * invData["extra_adult_price"];
            if (invData["extra_adult_price"] > 0) {
                setExtraAdultmessage(invData["extra_adult_price"]);
            }
        }
        if (selected_adults === invData["max_people"]) {
            extra_adult_price = 0;
            update_price = getPackagePrice(package_id);
        }

        updateExtraAdultPrice(extra_adult_price);
        setCart({...cart});

    };


    const handleChildChange = (e, package_id, packNo) => {
        let selected_child = parseInt(e.target.value); //Selected child
        let invData = getAllInv(package_id);
        let extra_child_price = 0;
        let no_of_extra_child = 0;

        //Check For maximum room capacity
        let checkMaxRoomCapacityData = {
            package_id: package_id,
            max_adult: cart.max_people,
            max_child: cart.max_child,
            room: packNo,
            selected_person: selected_child,
            type: "child",
        };
        checkMaxRoomCapacity(checkMaxRoomCapacityData);

        if (selected_child < invData["max_child"]) {
            extra_child_price = 0;
        }
        if (selected_child > invData["max_child"]) {
            no_of_extra_child = selected_child - invData["max_child"];
            extra_child_price = no_of_extra_child * invData["extra_child_price"];
            if (invData["extra_child_price"] > 0) {
                setExtraChildmessage(invData["extra_child_price"]);
            }
        }
        if (selected_child === invData["max_child"]) {
            extra_child_price = 0;
        }

        updateExtraChildPrice(package_id, extra_child_price, packNo);
        setCart({...cart});
    };


    const getAllInv = (package_id) => {
        var invDetail = {};
        invDetail["bar_price"] = 0;
        invDetail["extra_adult_price"] = 0;
        invDetail["extra_child_price"] = 0;
        invDetail["multiple_occupancy"] = [];
        packageInventory &&
            packageInventory.map((packageData) => {
                if (package_id == packageData.package_id) {
                    invDetail.package_type = packageData.package_name;
                    invDetail.max_people = packageData.adults;
                    invDetail.max_child = packageData.max_child;
                    invDetail.extra_person = packageData.extra_person;
                    invDetail.extra_child = packageData.extra_child;
                    invDetail.bar_price = packageData.discounted_amount;
                    invDetail.extra_adult_price = packageData.extra_person_price;
                    invDetail.extra_child_price = packageData.extra_child_price;
                    invDetail.display_extra_adult_price = (
                        packageData.extra_person_price
                    ).toFixed(2);
                    invDetail.display_extra_adult_price = (
                        packageData.extra_person_price
                    ).toFixed(2);
                    invDetail.display_extra_child_price = (
                        packageData.extra_child_price 
                    ).toFixed(2);
                }
            });
        return invDetail;
    };


    const checkMaxRoomCapacity = (roomCapacityCheckObj) => {
        let max_capacity_status = 0;
        let max_adult = roomCapacityCheckObj.max_adult;
        let max_child = roomCapacityCheckObj.max_child;
        let selected_person = roomCapacityCheckObj.selected_person;
        let type = roomCapacityCheckObj.type;

        if (max_capacity_status === 0) {
            if (type === "adult") cart.packages[0].selected_adult = selected_person;
            if (type === "child") cart.packages[0].selected_child = selected_person;
        }
        if (max_capacity_status === 1) {
            if (
                type === "adult" &&
                cart.packages[0].selected_adult + cart.packages[0].selected_child <=
                max_adult + max_child
            ) {
                cart.packages[0].selected_adult = selected_person;
            }
            if (
                type === "child" &&
                cart.packages[0].selected_adult + cart.packages[0].selected_child <=
                max_adult + max_child
            ) {
                cart.packages[0].selected_child = selected_person;
            }
            if (
                type === "adult" &&
                cart.packages[0].selected_adult + cart.packages[0].selected_child >
                max_adult + max_child
            ) {
                cart.packages[0].selected_adult = selected_person;
                cart.packages[0].selected_child =
                    max_adult + max_child - cart.packages[0].selected_adult;
            }
            if (
                type === "child" &&
                cart.packages[0].selected_adult + cart.packages[0].selected_child >
                max_adult + max_child
            ) {
                cart.packages[0].selected_child = selected_person;
                cart.packages[0].selected_adult =
                    max_adult + max_child - cart.packages[0].selected_child;
            }
        }


        setCart({...cart});
    };


    const getPackagePrice = (package_id) => {
        let curPrice = 0;
        packageInventory &&
            packageInventory.map((packageData) => {
                if (package_id == packageData.package_id) {
                    curPrice = parseFloat(packageData.discounted_amount);
                }
            });
        return curPrice;
    };

    const updateExtraAdultPrice = (extra_adult_price) => {
        cart.packages[0].extra_adult_price = extra_adult_price;
        setCart({ ...cart });
    };


    const updateExtraChildPrice = (extra_child_price) => {
        cart.packages[0].extra_child_price = extra_child_price;
        setCart({ ...cart });
    };



    const checkPackageAvailability = () => {
        let check_availablity_date = moment(packageDate.date).format("DD-MM-YYYY");

        const fetch_package_details = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/package_booking/get_package_details_by_package_id/${selectedPackage.hotel_id}/${selectedPackage.package_id}/${check_availablity_date}/INR`).then(response => {
            return response.data;
        })
            .catch(error => {
                console.log('error', error);
            });

        fetch_package_details.then(response => {
            if (response.status === 1) {
                setPackageInventory(response.package_inventory);

                let packageData = response.converted_package_inventory[0]


                cart.checkin_date = moment(packageDate.date).format("DD-MM-YYYY");
                cart.checkout_date = moment(packageDate.date).add(cart.nights, "days").format("DD-MM-YYYY");




                let packageAvailable = true;
                for (let j = 0; j < packageData.nights; j++) {
                    let isBlocked = false;
                    if (moment(packageData.date_from) <= moment(packageDate.date)) {
                        let pac = packageData.inv.find(
                            (i) =>
                                i.date ==
                                moment(packageDate.date)
                                    .add(j, "days")
                                    .format("YYYY-MM-DD")
                        );
                        if ((pac && pac.block_status == 1) || (pac && pac.no_of_rooms == 0)) isBlocked = true;
                    }
                    if (moment(packageData.date_from) > moment(packageDate.date)) { isBlocked = true };

                    if (isBlocked) packageAvailable = false;
                }

                setPackageAvailability(packageAvailable);

            }
        })

    }

    const getPackageCityHotels = (city) => {
        const fetch_package_city_hotels = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-package-hotel-list-by-destination?group_id=2565&package_name=${response.package_name[1]}&city_id=${city}`).then(responses => {
            return responses.data;
        })
        .catch(error => {
            console.log('error', error);
        });
        fetch_package_city_hotels.then(response => {
            console
            // if (hotels.length  0) {
                setHotels(response.package_hotel_list)
            // }
        })

        
    }
    
    return (
        <>
            <Header></Header>
            <div className="inner-page-wrapper">
                <div className="package-details-banner">
                    <figure> <img src="/Images/packages/packages-details.jpg" alt="" title="" /> </figure>
                </div>
                <div className="packaage-detail-page-con">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="package-page-left">
                                    <div className="package-detail-box-left">
                                        <div className="package-info">
                                            <h2>{response.package_name[1] ? response.package_name[1] : ''} </h2>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="select-hotel-d">
                                                        <select onChange={(event) => {
                                                            getPackageCityHotels(
                                                                event.target.value);}} 
                                                        >
                                                            <option>Select hotel by location</option>
                                                            {response.packages.map((locate, index) => {
                                                                return (
                                                                    <option key={index} value={locate.city_id}
                                                                    
                                                                    >{locate.city_name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="hotel-to-avail-package">
                                                <div className="row">
                                                    <div className="col-md-12 sec-heading">
                                                        <h3>Select Hotel to avail this Package</h3>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    {hotels.length > 0 && hotels.map((slide, index) => {
                                                        return (
                                                            <div className="col-md-3 col-sm-6" key={index}>
                                                                <div className="box-6">
                                                                    <figure>
                                                                        <a href="#" data-toggle="modal" data-target="#RoomDetails" onClick={() => handleBookClick(slide, slide.hotel_id)}>
                                                                            <img src={slide.image} alt="" title="" /></a>
                                                                    </figure>
                                                                    <div className="content">
                                                                        <h4>
                                                                            <a href="#" data-toggle="modal" data-target="#RoomDetails">{slide.hotel_name}</a>
                                                                        </h4>
                                                                        {/* <h5>14,999</h5> */}
                                                                    </div>
                                                                    <div className="boo-now-btn"> <a data-toggle="modal" data-target="#RoomDetails"
                                                                        onClick={() => handleBookClick(slide, slide.hotel_id)}>Book Now</a> </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>

                                            <div className="package-detail-block-body">
                                                <div className="sec-heading">
                                                    <h3>Facilities</h3>
                                                </div>
                                                <ul>
                                                    <li><span><img src="/Images/packages/icons/MobileVoucher.png" alt="" title="" /></span>Mobile Voucher</li>
                                                    <li><span><img src="/Images/packages/icons/Safe.png" alt="" title="" /></span>ROMT Safe</li>
                                                    <li><span><img src="/Images/packages/icons/Swimming.png" alt="" title="" /></span>Swimming Plll</li>
                                                    <li><span><img src="/Images/packages/icons/JeepSafari.png" alt="" title="" /></span>Jeep Safari</li>
                                                    <li><span><img src="/Images/packages/icons/Camp-Fire.png" alt="" title="" /></span>Camp Fire</li>
                                                    <li><span><img src="/Images/packages/icons/free-wifi.png" alt="" title="" /></span>Free WIFI</li>
                                                    <li><span><img src="/Images/packages/icons/Housekeeping.png" alt="" title="" /></span>Housekeeping</li>
                                                    <li><span><img src="/Images/packages/icons/PowerBackup.png" alt="" title="" /></span>Power Backup</li>
                                                </ul>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="package-page-right">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8"></div>
                                <div className="col-md-4">
                                    <div className="package-dtils-rbox">
                                        <div className="package-price">
                                            <ul>
                                                <li>
                                                    <h3>INR <span>14,999</span></h3>
                                                    <span className="off-price">12%off</span></li>
                                                <li>
                                                    <p>Per Adult</p>
                                                </li>
                                                <li>
                                                    <button data-toggle="modal" data-target="#RoomDetails">Book Now</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="package-dtils-rbox">
                                        <div className="package-dtils-rbox-form">
                                            <p className="heading">Get in touch with our travel expert</p>
                                            <Form className="getinTouch-form" id="enquiry-form">
                                                <input type="text" placeholder="Your Name" name="name" required="" value="" />
                                                <input type="email" placeholder="Your Email" name="email" required="" value="" />
                                                <input type="number" placeholder="Phone" name="phone" className="input-number-without-spinner" required="" value="" />
                                                <div className="react-datepicker-wrapper">
                                                    <div className="react-datepicker__input-container">
                                                        <input type="text" id="enquiry-date-input" name="date_of_travel" placeholder="Choose Date of Travel" className="send-enquiry-calendar" value="" readOnly="" />
                                                    </div>
                                                </div>
                                                <input type="number" placeholder="No of People" name="no_of_people" required="" value="" />
                                            </Form>
                                            <textarea form="enquiry-form" placeholder="Message" rows="4" name="message" required=""></textarea>
                                            <ul className="terms-conditions">
                                                <li className="tours-icon-tick">We assure the privacy of your contact data.</li>
                                                <li className="tours-icon-tick">This data will only be used by our team to contact you and no other purposes.</li>
                                            </ul>
                                            <button className="track-enquiry-event-button">Send Enquiry</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}


                </div>
            </div>

            <Modal className="modal fade hotel-detailmodal chek-availability package_booking_modal" id="RoomDetails" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true" show={modal}>
                <Modal.Body>

                    <Button className="close" onClick={() => setModal(!modal)}>
                        <i className="fa fa-close"></i>
                    </Button>
                    <div className="chek-availability-form">
                        <form className="row">
                            <div className="col-sm-12">
                                <label><i className="fa fa-map-marker" aria-hidden="true"></i> {hotelName}</label>
                            </div>
                            <div className="col-sm-3">
                                <label>Date</label>
                                {/* <input id="datepicker" type="text" className="datepicker" data-zdp_readonly_element="false" placeholder="Check In"/> */}
                                <DatePicker
                                    className="form-control"
                                    dateFormat="dd/MM/yy"
                                    placeholderText="DD / MM / YY"
                                    selected={packageDate.date}
                                    name="new_dateofbirth"
                                    required
                                    // onChange={(date) => {
                                    //     handleFormChange(
                                    //         { 'date': moment(new Date(date)).format('DD-MM-YYYY') }
                                    //     );
                                    // }}

                                    onChange={(date) => {
                                        handleFormChange(
                                            { 'date': date }
                                        );
                                    }}
                                />
                            </div>

                            {cart && cart.packages && cart.packages.length > 0 &&
                                <div className="col-sm-3">
                                    <label>Adult</label>
                                    <select value={cart.packages[0].selected_adult}
                                        // onChange={(event) => {
                                        //     handleFormChange(
                                        //         { 'adult': event.target.value }
                                        //     );
                                        // }}

                                        onChange={(e) =>
                                            handleAdultChange(
                                                e,
                                                cart.package_id,
                                                cart.packages[0].packages
                                            )
                                        }

                                    >

                                        <option value={0}>0</option>

                                        {cart.packages[0].adults &&
                                            cart.packages[0].adults.map(
                                                (adult, adult_index) => (
                                                    <option
                                                        key={adult_index}
                                                        value={adult.value}
                                                    >
                                                        {adult.option}
                                                    </option>
                                                )
                                            )}

                                    </select>
                                </div>
                            }


                            {cart && cart.packages && cart.packages.length > 0 &&
                                <div className="col-sm-3">
                                    <label>Child</label>
                                    <select
                                        value={cart.packages[0].selected_child}

                                        // onChange={(event) => {
                                        //     handleFormChange(
                                        //         { 'kid': event.target.value }
                                        //     );
                                        // }}

                                        onChange={(e) =>
                                            handleChildChange(
                                                e,
                                                cart.package_id,
                                                cart.packages[0].packages
                                            )
                                        }
                                    >
                                        <option value={0}>0</option>
                                        {cart.packages[0].childs &&
                                            cart.packages[0].childs.map(
                                                (child, child_index) => (
                                                    <option
                                                        key={child_index}
                                                        value={child.value}
                                                    >
                                                        {child.option}
                                                    </option>
                                                )
                                            )}
                                    </select>
                                </div>
                            }




                            <div className="col-sm-3">
                                <div className="button-con" id="proceed-to-payment">
                                    {/* {checkAvailability ?
                                        <div className="check-availability-btn">
                                            <input type="button" id="CheckAvailability" onClick={() => setCheckAvailability(false)} name="" value="" />
                                        </div>
                                        :
                                        <>
                                            <div className="check-availability-btn">
                                                <input type="button" id="CheckAvailability" name="" value="" />
                                            </div>
                                            <div className="proceed-to-payment available">
                                                <input type="button" id="CheckAvailability" name="" value="Proceed Now" onClick={() => proceed()} />
                                            </div>
                                        </>
                                    } */}



                                    <div className="check-availability-btn">
                                        <input type="button" id="CheckAvailability" onClick={()=>checkPackageAvailability()} name="" value="" />
                                    </div>

                                    {packageAvailability === true && <div className="proceed-to-payment available">
                                        <input type="button" id="CheckAvailability" name="" value="Proceed Now" onClick={() => proceed()} />
                                    </div>
                                    }

                                    {packageAvailability === false && <div className="proceed-to-payment available">
                                        <input className='btn-danger' type="button" id="CheckAvailability" name="" value="Not Available" disabled/>
                                    </div>}
                                    


                                    {/* <input type="button" name="" id="proceed-to-payment-btn" value="Proceed to payment" onClick="location.href='payment-package.php'" /> */}
                                </div>
                            </div>
                        </form>
                        <ul>
                            {extraAdultMessage && <li>
                                <p className="red-text text-darken-1"> * Extra Adult Price - ₹{extraAdultMessage}.</p>
                            </li>
                            }

                            {extraChildMessage &&
                                <li>
                                    <p className="red-text text-darken-1"> * Extra Child Price - ₹{extraChildMessage}.</p>
                                </li>
                            }
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
            {/* </div>
                </div>
            </div> */}
            <Footer></Footer>
        </>
    )
}

export async function getServerSideProps(context) {
    let url_param = base64_decode(context.params.url).split("/");
    // Fetch data from external API
    const res = await fetch(
        
        `${process.env.NEXT_PUBLIC_HOST_BE}/group-package-hotel-list?group_id=${url_param[0]}&package_name=${url_param[1]}`
    );
    const response = await res.json();
    return { props: { packages: response.package_destinations, packagehotels:response.package_hotel_list,package_name: url_param } };
}

export default PackageDetail;
