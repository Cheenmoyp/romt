import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoomDetailModal from './roomDetailModal';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Modal from "react-bootstrap/Modal";
import moment from "moment";


export default function Rooms(props) {
    let hotel_id = (props && props.search && props.search[0] && props.search[0]) ? props.search[0] : null;
    let checkin = (props && props.search && props.search[2] && props.search[2]) ? props.search[2] : null;
    let checkout = (props && props.search && props.search[3] && props.search[3]) ? props.search[3] : null;

    const [Rooms, setRooms] = useState([]);
    const [roomDetailsId, setRoomDetailsId] = useState();
    const [modal, setModal] = useState(false);
    const [roomDetails, setRoomDetails] = useState();

    const [roomModal, setRoomModal] = useState(true);

    const [addRoom, setAddRoom] = useState();
    const [selectedNoOfRooms, setSelectedNoOfRooms] = useState(1);
    const [cart, setCart] = useState({});

    const [totalCartItems, setTotalCartItems] = useState([]);
    const [selectedRoomTypeId, setSelectedRoomTypeId] = useState([]);


    const [selectedAdults, setselectedAdults] = useState("");
    const [extraAdultMessage, setExtraAdultmessage] = useState("");
    const [extraChildMessage, setExtraChildmessage] = useState("");

    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

    const [publicCoupons, setPublicCoupons] = useState([]);


    // api-key - 644406a7918f871f3a8568c58e56e77b
    // 1993 - hotel_id
    // 17-11-2021 - check-in
    // 18-11-2021 - checkout
    // replace this dynamic url 
    // `${process.env.NEXT_PUBLIC_HOST_BE}/bookingEngine/get-inventory/644406a7918f871f3a8568c58e56e77b/${props.search[0]}/${props.search[2]}/${props.search[3]/INR`
    // const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/bookingEngine/get-inventory/644406a7918f871f3a8568c58e56e77b/1993/17-11-2021/18-11-2021/INR`).then(response => {

    useEffect(() => {
        if (props.allowEditCart === true) {
            Rooms && Rooms.map((room_data) => {
                if (room_data.room_type_id === props.editCartItem.room_type_id) {
                    setAddRoom(room_data);
                }
            })
            setCart(props.editCartItem);
            setModal(true)
        }
    }, [props.allowEditCart])


    useEffect(() => {
        sessionStorage.removeItem("be_cart");
        sessionStorage.removeItem("be_hotel_data");
        sessionStorage.removeItem("be_all_cart_items");
    }, [])

    useEffect(() => {
        setCart({})
        setTotalCartItems([]);
        setTotalCartItems([])
        setSelectedRoomTypeId([])
        props.checkinDate();
        props.checkoutDate();
        props.totalCartItems([]);
        props.noOfNight();

        sessionStorage.removeItem("be_cart");
        sessionStorage.removeItem("be_hotel_data");
        sessionStorage.removeItem("be_all_cart_items");

    }, [props.search[1], props.search[2]])

    useEffect(() => {
        if (props && props.hotel_data) {

            let checkin_checkout_date = JSON.parse(sessionStorage.getItem('be_checkin_checkout'))
            let checkin_date = moment(checkin_checkout_date.checkin).format("DD-MM-YYYY");
            let checkout_date = moment(checkin_checkout_date.checkout).format("DD-MM-YYYY");

            dateRange.startDate = checkin_checkout_date.checkin;
            dateRange.endDate = checkin_checkout_date.checkout;

            setDateRange({ ...dateRange });


            props.checkinDate(moment(checkin_checkout_date.checkin).format("Do MMM"));
            props.checkoutDate(moment(checkin_checkout_date.checkout).format("Do MMM"));

            const fetcher = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/bookingEngine/get-inventory/${props.hotel_data.api_key}/${props.hotel_data.hotel_id}/${checkin_date}/${checkout_date}/INR`).then(response => {

                return response.data.data
            })
                .catch(error => {
                    console.log('error', error);
                });

            fetcher.then(response => {                
                // if (Rooms.length == 0) {
                    //Codes Added for Select No Of Rooms
                    response.map((inv_data) => {
                        let display_no_of_rooms = [];
                        for (let i = 1; i <= inv_data.min_inv; i++) {
                            display_no_of_rooms.push(i);
                        }
                        inv_data.display_no_of_rooms = display_no_of_rooms;
                    });
                    //Codes Added for Select No Of Rooms


                    setRooms(response)
                // }
            })
        }
    }, [props.room_id, props.search[1], props.search[2]])


    // for public coupons
    useEffect(() => {

        if (props && props.hotel_data) {

            let checkin_checkout_date = JSON.parse(sessionStorage.getItem('be_checkin_checkout'))
            let checkin_date = moment(checkin_checkout_date.checkin).format("DD-MM-YYYY");
            let checkout_date = moment(checkin_checkout_date.checkout).format("DD-MM-YYYY");


            const get_public_coupons = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/be_coupons/public/${props.hotel_data.hotel_id}/${checkin_date}/${checkout_date}`).then(response => {

                return response.data.data
            })
                .catch(error => {
                    console.log('error', error);
                });

            get_public_coupons.then(response => {
                setPublicCoupons(response);
            })
        }

    }, [props.search[1], props.search[2]])
    // for public coupons


    // const handleClick = (id, max_people, rack_price, room_type) => {
    //     setRoomDetailsId(id);
    //     var storage = { "room_type": id, "hotel_id": 2881, "room_type_name": room_type, "max_people": max_people, "rack_price": rack_price }
    //     localStorage.setItem("selectedRoom", JSON.stringify(storage));
    //     setRoomModal(true);

    // }

    const handleAddClick = (data, rateplan_data) => {
        let cartItem = {
            room_type: "",
            plan_type: "",
            room_type_id: 0,
            price: 0,
            rooms: [],
            tax: [],
            discounted_price: 0,
            paid_amount: 0,
            paid_amount_per: 0,

            rates_for_coupons: [],
        };

        cartItem["room_type"] = data.room_type;
        cartItem["room_type_id"] = data.room_type_id;

        cartItem["added_to_cart"] = true;
        cartItem["add_room"] = false;
        cartItem["rate_plan_id"] = rateplan_data.rate_plan_id;
        cartItem["max_room_capacity"] = data.max_room_capacity;
        cartItem["max_child"] = data.max_child;
        cartItem["max_people"] = data.max_people;
        cartItem["extra_person"] = data.extra_person;

        cartItem["plan_type"] = rateplan_data.plan_type;
        cartItem["plan_name"] = rateplan_data.plan_name;
        let total_adults = parseInt(data.max_people) + parseInt(data.extra_person);
        let total_child = parseInt(data.max_child) + parseInt(data.extra_child);

        let total_infant = parseInt(data.max_infant);

        let count = [];
        let child_count = [];

        let infant_count = [];
        for (let i = 1; i <= total_adults; i++) {
            let countdata = { option: i, value: i };
            count.push(countdata);
        }
        for (let j = 0; j <= total_child; j++) {
            let countdata = { option: j, value: j };
            child_count.push(countdata);
        }

        for (let k = 0; k <= total_infant; k++) {
            let countdata = { option: k, value: k };
            infant_count.push(countdata);
        }

        let child_no;
        if (data.max_occupancy !== 0) {
            child_no = 0;
        } else {
            child_no = parseInt(data.max_child);
        }

        cartItem["rooms"][0] = {
            room: "Room1",
            adults: count,
            selected_adult: parseInt(data.max_people),
            childs: child_count,
            infants: infant_count,
            selected_infant: 0,
            selected_child: child_no,
            rate_plan_id: rateplan_data.rate_plan_id,
            extra_adult_price: 0,
            extra_child_price: 0,
            bar_price: parseFloat(rateplan_data.bar_price),
            day_wise_rates: rateplan_data.rates

        };
        cartItem["rates_for_coupons"] = rateplan_data.rates;



        cartItem.rooms[0]["bar_price"] = getRoomPrice(data.room_type_id,rateplan_data.rate_plan_id);
        cartItem.rooms[0]["bar_price"] = parseFloat(cartItem.rooms[0]["bar_price"]);
          
        cartItem.rate_plan_id = rateplan_data.rate_plan_id;








        setCart(cartItem);

        setAddRoom(data);
        setModal(true);
    }

    const handleRoomDetailsChange = (event) => {
        var obj = { ...roomDetails };
        obj[event.target.name] = event.target.value;
        setRoomDetails(obj);
        //console.log(roomDetails.rooms);
    }

    const handleConfirm = () => {
        setModal(false);

        cart.price = 0;
        let extra_adult_price = 0;
        let extra_child_price = 0;

        cart.rooms &&
            cart.rooms.map((cartItem) => {
                extra_adult_price += cartItem.extra_adult_price;
                extra_child_price += cartItem.extra_child_price;
                cart.price += cartItem.bar_price;
            });

        cart.display_price = cart.price + extra_adult_price + extra_child_price;

        applyPublicCoupon(cart);

        cart.tax = [];
        let total_gst_amount = calculateGstAmount(cart.rooms);

        cart.tax.push({
            gst_price: total_gst_amount,
            other_tax: [],
        });

        cart.paid_amount = cart.display_price + cart.tax[0].gst_price;
        cart.paid_amount_per = 100;

        setCart({ ...cart });

        if (props.allowEditCart === false) {
            selectedRoomTypeId.push(cart.room_type_id);
            setSelectedRoomTypeId([...selectedRoomTypeId]);

            totalCartItems.push(cart);
            setTotalCartItems([...totalCartItems]);
        }
        else {
            totalCartItems[props.cartIndex] = cart;
            setTotalCartItems([...totalCartItems]);
        }





        sessionStorage.setItem("be_cart", JSON.stringify(cart));
        sessionStorage.setItem("be_all_cart_items", JSON.stringify(totalCartItems));
        props.totalCartItems(JSON.parse(sessionStorage.getItem('be_all_cart_items')));
        sessionStorage.setItem("be_hotel_data", JSON.stringify(props.hotel_data));

        props.removeEditAccess(false);
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

    function myFunctionNew() {
        // var dots = document.getElementById("dots");
        // var moreText = document.getElementById("more");
        // var btnText = document.getElementById("myBtn");

        // if (dots.style.display === "none") {
        // dots.style.display = "inline";
        // btnText.innerHTML = "View More Rooms"; 
        // moreText.style.display = "none";
        // } else {
        // dots.style.display = "none";
        // btnText.innerHTML = "View Less Rooms"; 
        // moreText.style.display = "inline";
        // }
    }

    const totalRoomSelected = (e, minimum_inventory) => {

        let cart_value = cart
        let length_room = cart_value && cart_value.rooms.length;

        for (let i = length_room; i > 1; i--) {
            let no_of_rooms = cart_value && cart_value.rooms.length;
            if (no_of_rooms > 1) {
                cart_value.rooms.splice(no_of_rooms - 1, 1);
            }
            setCart(cart_value);
        }

        let total_rooms = parseInt(e);
        setSelectedNoOfRooms(total_rooms);


        for (let i = 0; i < total_rooms; i++) {
            if (cart_value && cart_value.rooms.length >= minimum_inventory) {
                return false;
            }

            if (i > 0) {
                cart_value.rooms = [...cart_value.rooms, cart_value.rooms[0]];
            }

            cart_value.rooms[i] = { ...cart_value.rooms[i], bar_price: parseFloat(getRoomPrice(cart_value.room_type_id, cart_value.rate_plan_id)) }
            cart_value.rooms[i] = { ...cart_value.rooms[i], room: `Room${i + 1}` }

        }
        setCart(cart_value);
    }



    const getRoomPrice = (room_type_id, rate_plan_id) => {
        let curPrice = 0;
        Rooms &&
            Rooms.map((inv) => {
                if (room_type_id == inv.room_type_id) {
                    inv.rate_plans &&
                        inv.rate_plans.map((rate_plan) => {
                            if (rate_plan_id == rate_plan.rate_plan_id) {
                                rate_plan.rates &&
                                    rate_plan.rates.map((rate) => {
                                        curPrice += parseFloat(rate.bar_price);
                                    });
                            }
                        });
                }
            });
        return curPrice;
    };


    const noOfNights = () => {

        let checkin_date = dateRange && moment(dateRange.startDate).format("YYYY-MM-DD");
        let checkout_date = dateRange && moment(dateRange.endDate).format("YYYY-MM-DD");


        let dt1 = new Date(checkin_date);
        let dt2 = new Date(checkout_date);
        let diffDays = Math.floor(
            (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
                Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
            (1000 * 60 * 60 * 24)
        );

        props.noOfNight(diffDays);

        return diffDays;
    };

    let no_nights = noOfNights();

    const handleAdultChange = (
        e,
        max_occupancy,
        room
    ) => {

        let invData = getAllInv(cart.room_type_id, cart.rate_plan_id);
        let selected_adults = parseInt(e.target.value);
        setselectedAdults(selected_adults);
        let adult = selected_adults - 1;
        let update_price = 0;
        let extra_adult_price = 0;
        let no_of_extra_adults = 0;
        let extra_child_price = 0;
        //Check For maximum room capacity
        let checkMaxRoomCapacityData = {

            max_room_capacity:
                cart.max_room_capacity,
            max_adult: cart.max_people,
            extra_adult: cart.extra_person,
            selected_person: selected_adults,
            max_occupancy,
            room: room,
            type: "adult",
        };

        //Check For maximum room capacity
        checkMaxRoomCapacity(checkMaxRoomCapacityData);
        if (selected_adults < invData["max_people"]) {
            if (invData["max_occupancy"] !== 0) {
                updateExtraChildPrice(

                    extra_child_price,
                    room
                );
            }

            extra_adult_price = 0;
            invData["multiple_occupancy"].map((occupancy) => {

                if (occupancy[adult] == 0 || occupancy[adult] == "" || !occupancy[adult]) {
                    occupancy[adult] = invData["bar_price"];
                }
                if (adult > 0) {
                    update_price += parseFloat(occupancy[adult] / no_nights);
                }
                else {
                    update_price += parseFloat(occupancy[adult]);
                }
            });
        }
        if (selected_adults > invData["max_people"]) {
            extra_adult_price = 0;
            update_price = getRoomPrice(cart.room_type_id, cart.rate_plan_id);
            no_of_extra_adults = selected_adults - invData["max_people"];
            extra_adult_price = no_of_extra_adults * invData["extra_adult_price"];
            setExtraAdultmessage((invData["extra_adult_price"] / no_nights).toFixed());
        }
        if (selected_adults === invData["max_people"]) {
            if (invData["max_occupancy"] !== 0) {
                updateExtraChildPrice(

                    extra_child_price,
                    room
                );
            }
            extra_adult_price = 0;
            update_price = getRoomPrice(cart.room_type_id, cart.rate_plan_id);
        }

        updateExtraAdultPrice(extra_adult_price, room);

        setCart({ ...cart });

    };



    const handleChildChange = (
        e,
        max_occupancy,
        room
    ) => {
        let selected_child = parseInt(e.target.value); //Selected child
        let invData = getAllInv(cart.room_type_id, cart.rate_plan_id);
        let extra_child_price = 0;
        let no_of_extra_child = 0;

        //Check For maximum room capacity
        let checkMaxRoomCapacityData = {
            room_type_id: cart.room_type_id,
            rate_plan_id: cart.rate_plan_id,
            max_room_capacity:
                cart.max_room_capacity,
            max_adult: cart.max_people,
            max_child: cart.max_child,
            max_occupancy,
            extra_adult: cart.extra_person,
            selected_person: selected_child,
            room: room,
            type: "child",
        };
        checkMaxRoomCapacity(checkMaxRoomCapacityData);

        if (max_occupancy !== 0 && selectedAdults == invData["max_people"]) {
            invData["max_child"] = 0;
        }
        if (selected_child < invData["max_child"]) {
            extra_child_price = 0;
        }
        if (selected_child > invData["max_child"]) {
            no_of_extra_child = selected_child - invData["max_child"];
            extra_child_price = no_of_extra_child * invData["extra_child_price"];
            if (invData["extra_child_price"] > 0) {
                setExtraChildmessage((invData["extra_child_price"] / no_nights).toFixed())
            }
        }
        if (selected_child === invData["max_child"]) {
            extra_child_price = 0;
        }
        updateExtraChildPrice(extra_child_price, room);

        setCart({ ...cart });
    };


    const getAllInv = (room_type_id, rate_plan_id) => {
        let invDetail = [];
        invDetail["bar_price"] = 0;
        invDetail["extra_adult_price"] = 0;
        invDetail["extra_child_price"] = 0;
        invDetail["multiple_occupancy"] = [];
        Rooms &&
            Rooms.map((inv) => {
                if (room_type_id == inv.room_type_id) {
                    inv.rate_plans.map((rate_plan) => {
                        if (rate_plan_id == rate_plan.rate_plan_id) {
                            rate_plan.rates.map((rate) => {
                                invDetail["room_type"] = inv.room_type;
                                invDetail["max_people"] = inv.max_people;
                                invDetail["max_child"] = inv.max_child;
                                invDetail["max_occupancy"] = inv.max_occupancy;
                                invDetail["extra_person"] = inv.extra_person;
                                invDetail["extra_child"] = inv.extra_child;
                                invDetail["plan_type"] = rate_plan.plan_type;
                                invDetail["bar_price"] += rate_plan.bar_price;
                                invDetail["extra_adult_price"] += rate.extra_adult_price;
                                invDetail["extra_child_price"] += rate.extra_child_price;
                                invDetail["display_extra_adult_price"] = (
                                    rate.extra_adult_price
                                ).toFixed(2);
                                invDetail["display_extra_child_price"] = (
                                    rate.extra_child_price
                                ).toFixed(2);
                                invDetail["multiple_occupancy"].push(rate.multiple_occupancy);
                            });
                        }
                    });
                }
            });
        return invDetail;
    };


    const checkMaxRoomCapacity = (roomCapacityCheckObj) => {

        let max_capacity_status = roomCapacityCheckObj.max_room_capacity;
        let max_adult = roomCapacityCheckObj.max_adult;
        let extra_adult = roomCapacityCheckObj.extra_adult;
        let selected_person = roomCapacityCheckObj.selected_person;
        let room = roomCapacityCheckObj.room;
        let type = roomCapacityCheckObj.type;
        const { max_occupancy } = roomCapacityCheckObj;
        cart.rooms &&
            cart.rooms.map((roomObj) => {
                if (roomObj.room == room) {
                    if (max_capacity_status === 0) {
                        if (type === "adult") roomObj.selected_adult = selected_person;
                        if (type === "child") roomObj.selected_child = selected_person;
                    }
                    if (max_capacity_status === 1) {


                        if (max_occupancy && max_occupancy !== 0 && max_occupancy !== "") {
                            if (roomObj.selected_adult == max_adult + extra_adult) {
                                roomObj.selected_child = 0;

                            }
                            if (
                                type === "adult" &&
                                roomObj.selected_adult + roomObj.selected_child <= max_occupancy
                            ) {
                                roomObj.selected_adult = selected_person;

                            }

                            if (
                                type === "child" &&
                                roomObj.selected_adult + roomObj.selected_child <= max_occupancy
                            ) {
                                roomObj.selected_child = selected_person;
                            }
                            if (
                                type === "adult" &&
                                roomObj.selected_adult + roomObj.selected_child > max_occupancy
                            ) {
                                roomObj.selected_adult = selected_person;
                                roomObj.selected_child = max_occupancy - roomObj.selected_adult;
                                updateExtraChildPrice(0, room);
                            }
                            if (
                                type === "child" &&
                                roomObj.selected_adult + roomObj.selected_child > max_occupancy
                            ) {
                                roomObj.selected_child = selected_person;
                                roomObj.selected_adult = max_occupancy - roomObj.selected_child;
                                updateExtraAdultPrice(0, room);
                            }
                        }
                        else {
                            if (
                                type === "adult" &&
                                roomObj.selected_adult + roomObj.selected_child <=
                                max_adult + extra_adult
                            ) {
                                roomObj.selected_adult = selected_person;
                            }
                            if (
                                type === "child" &&
                                roomObj.selected_adult + roomObj.selected_child <=
                                max_adult + extra_adult
                            ) {
                                roomObj.selected_child = selected_person;
                            }
                            if (
                                type === "adult" &&
                                roomObj.selected_adult + roomObj.selected_child >
                                max_adult + extra_adult
                            ) {
                                roomObj.selected_adult = selected_person;
                                roomObj.selected_child =
                                    max_adult + extra_adult - roomObj.selected_adult;
                                updateExtraChildPrice(0, room);
                            }
                            if (
                                type === "child" &&
                                roomObj.selected_adult + roomObj.selected_child >
                                max_adult + extra_adult
                            ) {
                                roomObj.selected_child = selected_person;
                                roomObj.selected_adult =
                                    max_adult + extra_adult - roomObj.selected_child;
                                updateExtraAdultPrice(0, room);
                            }
                        }
                    }
                }
            });

        setCart({ ...cart });
    };


    const updateExtraAdultPrice = (
        extra_adult_price,
        room
    ) => {
        cart.rooms &&
            cart.rooms.map((roomObj) => {
                if (roomObj.room == room) {
                    roomObj.extra_adult_price = extra_adult_price;
                }
            });

        setCart({ ...cart });
    };



    const updateExtraChildPrice = (

        extra_child_price,
        room
    ) => {
        cart.rooms &&
            cart.rooms.map((roomObj) => {
                if (roomObj.room == room) {
                    roomObj.extra_child_price = extra_child_price;
                }
            });
        setCart({ ...cart });
    };



    const calculateGstAmount = (rooms) => {

        let from_date = moment(dateRange.startDate).format("YYYY-MM-DD");
        let to_date = moment(dateRange.endDate).format("YYYY-MM-DD");

        let start = moment(dateRange.startDate);
        let end = moment(dateRange.endDate);
        let no_of_days = Math.round(
            moment.duration(end.diff(start)).days()
        );

        let end_date = moment(to_date)
            .subtract(1, "days")
            .format("YYYY-MM-DD");

        let dateArray = getDateArray(from_date, end_date);
        let gstAmount = 0;

        // dateArray &&
        //     dateArray.map((value, index) => {
        //         rooms.map((rates_for_discount) => {
        //             let gst_price = 0;
        //             let total_bar_price = 1;
        //             total_bar_price = (rates_for_discount.bar_price + rates_for_discount.extra_adult_price + rates_for_discount.extra_child_price) / no_of_days
        //             gst_price += total_bar_price


        //             const gstPercent = checkGSTPercent(gst_price);
        //             gstAmount += gst_price * gstPercent / 100;
        //         });
        //     })

        dateArray &&
            dateArray.map((value, index) => {
                rooms.map((rates_for_discount) => {
                    let gst_price = 0;
                    let total_bar_price = 1;
                    let total_pay_price;

                    rates_for_discount.day_wise_rates && rates_for_discount.day_wise_rates.map((day_rate) => {
                        if (value === day_rate.date) {
                            if (rates_for_discount.selected_adult < cart.max_people) {

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

                            if (rates_for_discount.extra_adult_price > 0 && rates_for_discount.no_of_extra_adult && rates_for_discount.no_of_extra_adult > 0) {
                                total_bar_price = total_bar_price + (day_rate.extra_adult_price) * rates_for_discount.no_of_extra_adult;
                            }


                            if (rates_for_discount.extra_child_price > 0 && rates_for_discount.no_of_extra_child && rates_for_discount.no_of_extra_child > 0) {
                                total_bar_price = total_bar_price + (day_rate.extra_child_price) * rates_for_discount.no_of_extra_child;
                            }


                            if (rates_for_discount.public_coupon_discount_price_array && rates_for_discount.public_coupon_discount_price_array.length > 0) {
                                rates_for_discount.public_coupon_discount_price_array.map((pb_coupon_price) => {
                                    if (day_rate.date === pb_coupon_price.date && pb_coupon_price.room === rates_for_discount.room) {
                                        total_pay_price = total_bar_price - pb_coupon_price.public_coupon_discount_price
                                    }
                                })
                            }
                            else {
                                total_pay_price = total_bar_price
                            }

                            gst_price += total_pay_price;
                            const gstPercent = checkGSTPercent(gst_price);
                            gstAmount += gst_price * gstPercent / 100;

                        }
                    })
                });
            })
        return gstAmount;

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


    const checkGSTPercent = (price) => {
        if (price <= 1000) {
            return 0;
        } else if (price > 1000 && price <= 7500) {
            return 12;
        } else if (price > 7500) {
            return 18;
        }
    };


    const handleCancel = () => {
        setModal(!modal)
        setCart({})
        props.removeEditAccess(false);
    }


    // for public coupon
    const applyPublicCoupon = (cart) => {





        let from_date = moment(dateRange.startDate).format("YYYY-MM-DD");
        let to_date = moment(dateRange.endDate).format("YYYY-MM-DD");
        let end_date = moment(to_date)
            .subtract(1, "days")
            .format("YYYY-MM-DD");
        let dateArray = getDateArray(from_date, end_date);



        let discountPrice = 0;
        const appliedDates = [];
        const applied_coupons = [];
        let public_coupon_discount_price_array = [];

        cart && dateArray &&
            dateArray.map((value, index) => {
                publicCoupons &&
                    publicCoupons.length > 0 &&
                    publicCoupons.map((coupon, index) => {
                        if (
                            value == coupon.date &&
                            cart.room_type_id === coupon.room_type_id
                        ) {

                            cart.rooms.map((rates_for_discount) => {


                                let total_bar_price = 1;
                                rates_for_discount.day_wise_rates && rates_for_discount.day_wise_rates.map((day_rate) => {
                                    if (value === day_rate.date) {


                                        if (rates_for_discount.selected_adult < cart.max_people) {

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

                                        discountPrice += (total_bar_price / 100) * coupon.discount;

                                        public_coupon_discount_price_array.push({ room: rates_for_discount.room, date: value, public_coupon_discount_price: (total_bar_price / 100) * coupon.discount })
                                    }
                                })

                                rates_for_discount.public_coupon_discount_price_array = public_coupon_discount_price_array


                            });


                            applied_coupons.push(coupon);
                            cart.discounted_price = discountPrice;

                            cart.appliedCoupons = applied_coupons;
                            appliedDates.push(value);
                        }
                    });

            });


        cart && dateArray &&
            dateArray.map((value, index) => {
                publicCoupons &&
                    publicCoupons.length > 0 &&
                    publicCoupons.map((coupon, index) => {
                        if (
                            value == coupon.date &&
                            coupon.room_type_id === 0 &&
                            !appliedDates.includes(coupon.date)
                        ) {

                            cart.rooms.map((rates_for_discount) => {


                                let total_bar_price = 1;
                                rates_for_discount.day_wise_rates && rates_for_discount.day_wise_rates.map((day_rate) => {
                                    if (value === day_rate.date) {

                                        if (rates_for_discount.selected_adult < cart.max_people) {

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

                                        discountPrice += (total_bar_price / 100) * coupon.discount;

                                        public_coupon_discount_price_array.push({ room: rates_for_discount.room, date: value, public_coupon_discount_price: (total_bar_price / 100) * coupon.discount })

                                    }
                                })

                                rates_for_discount.public_coupon_discount_price_array = public_coupon_discount_price_array

                            });


                            applied_coupons.push(coupon);
                            cart.discounted_price = discountPrice;

                            cart.appliedCoupons = applied_coupons;
                            appliedDates.push(value);
                        }
                    });
            });

        setCart({ ...cart });

    };
    // for public coupon

    const [couponArr, setCouponArr] = useState([]);
    useEffect(() => {
        let coupon_arr = [];
        Rooms &&
            Rooms.map((il) => {
                const coupon_obj = { room_type: il.room_type, coupon_arr: [] };
                publicCoupons.map((c) => {
                    if (c.room_type_id === il.room_type_id || c.room_type_id === 0)
                        coupon_obj.coupon_arr.push(c);
                });
                coupon_arr.push(coupon_obj);
            });
        coupon_arr.length > 0 &&
            coupon_arr.map((ca) => {
                let maxValue = Math.max.apply(
                    Math,
                    ca.coupon_arr.map((coup) => {
                        return coup.discount;
                    })
                );
                ca.max_discount = maxValue;

            });
        setCouponArr(coupon_arr);
    }, [Rooms, publicCoupons]);
    return (
        <>
            <div className="roomes-at-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Rooms at the {props.name}</h3>
                        </div>
                    </div>
                    <div className="packages-filter roomes-at-box-con">
                        <div className="row">
                            {Rooms.map((slide, index1) => {
                                let amenities = slide.allImages;
                                let rateplans = (slide.rate_plans) ? slide.rate_plans : [];
                                return (
                                    <div className="col-md-4" key={index1}>
                                        <div className="rooms-box">
                                            <div className="room-slider">
                                                <div id="carousel2_indicator" className="carousel slide" data-ride="carousel">
                                                    <div className="carousel-inner">
                                                        <Carousel swipeable={true}
                                                            draggable={true}
                                                            infinite={true}
                                                            responsive={responsive}>
                                                            {amenities.map((image, index2) => {
                                                                return (
                                                                    <div className="" key={index2}>
                                                                        <img className="d-block w-100" src={'https://d3ki85qs1zca4t.cloudfront.net/bookingEngine/' + image.image_name} alt="First slide" />
                                                                    </div>
                                                                )
                                                            })}
                                                        </Carousel>
                                                    </div>
                                                </div>
                                                <div>  </div>

                                                {couponArr &&
                                                    couponArr.map((ca, i) => {
                                                        if (
                                                            ca &&
                                                            ca.room_type === slide.room_type &&
                                                            ca.max_discount > 0
                                                        ) {
                                                            return (

                                                                <div className="room-offer" key={i}>
                                                                    {ca.value ? <>{ca.value} <span>%</span><span>Off</span></> : ca.max_discount && <>{ca.max_discount} <span>%</span><span>Off</span></>}
                                                                </div>

                                                            );
                                                        }
                                                    })}

                                            </div>
                                            <h4>{slide.room_type} <span className="pull-right">(Max Capacity: {slide.max_people})</span></h4>
                                            <div className="room-content">
                                                <div className="room-dertails">
                                                    <h6>Amenities</h6>
                                                </div>
                                                <div className="room-am">
                                                    <ul>
                                                        {slide.room_amenities.map((amenities, index3) => {
                                                            return (
                                                                <li key={index3}>{amenities.hotel_amenities_name}</li>
                                                            )
                                                        })}
                                                    </ul>
                                                </div>
                                                <div className="more-add">
                                                    <ul>
                                                        {slide.min_inv > 0 && rateplans.map((rateplan, index4) => {
                                                            return (
                                                                <li key={index4}>
                                                                    <div className="row">
                                                                        <div className="col-4"><h5>{rateplan.plan_name}</h5></div>
                                                                        <div className="col-4">
                                                                            <div className="price">
                                                                                <h6> <i className="fa fa-inr" aria-hidden="true"></i> {rateplan.bar_price}</h6>
                                                                                <p>Per room / Night</p>
                                                                                <p>Excluding GST</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <a href="#" className={selectedRoomTypeId.includes(slide.room_type_id) ? "addroom-btn btn-is-disabled" : "addroom-btn"} data-toggle="modal" data-target=".animate" data-ui-className="a-fadeUp" onClick={() => handleAddClick(slide, rateplan)}>Add Room</a>
                                                                            <div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })}

                                                    </ul>
                                                </div>
                                                {/* <div className=" room-box-footer">
                                                    <ul className="row">
                                                        <li className="col-6">
                                                            <button onClick={() => handleClick(slide.room_type_id, slide.max_people, slide.rack_price, slide.room_type)} id={slide.room_type_id}
                                                            >More Details</button>
                                                        </li>
                                                        <li className="col-6"><a href="../hotel-booking">Book Now</a></li>
                                                    </ul>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </div>

            <Modal className="modal animate add-room-modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-backdrop="true" show={modal}>

                <Modal.Body>

                    {addRoom && <>
                        <ul className="add-room">
                            <li>
                                <label className="text-left">No. Of Rooms</label>
                                <select name="rooms"
                                    value={selectedNoOfRooms}
                                    onChange={(e) =>
                                        totalRoomSelected(
                                            e.target.value,
                                            addRoom.min_inv
                                        )
                                    }
                                >

                                    {addRoom.display_no_of_rooms.map((items, i) => (
                                        <option value={items} key={i}>{items}</option>
                                    ))}

                                </select>


                            </li>


                            {cart && cart.rooms && cart.rooms.map((room, id) => (
                                <li key={id}>
                                    <div className="multiple-room-wrap row">
                                        <div className="col"><label className="one">{room.room}</label></div>
                                        <div className="col">
                                            <span>Adults</span>
                                            <select name="adults" value={room.selected_adult} onChange={(e) =>
                                                handleAdultChange(
                                                    e,
                                                    addRoom.max_occupancy,
                                                    room.room
                                                )} >

                                                <option value={0}>0</option>
                                                {room.adults && room.adults.map((adult, idx) => (
                                                    <option value={adult.value} key={idx}>{adult.option}</option>
                                                ))}

                                            </select>
                                        </div>

                                        <div className="col">
                                            <span>(5 - 12 yrs)</span>
                                            <select name="kids" value={room.selected_child} onChange={(e) =>
                                                handleChildChange(
                                                    e,
                                                    addRoom.max_occupancy,
                                                    room.room
                                                )
                                            }>

                                                {room.childs && room.childs.map((child, idx) => (
                                                    <option value={child.value} key={idx}>{child.option}</option>
                                                ))}
                                            </select>
                                        </div>



                                        <div className="col" >
                                            <span>(0 - 5 yrs)</span>

                                            <select name="infant" value={room.selected_infant} onChange={(event) => {
                                                handleRoomDetailsChange(event)
                                            }}>

                                                {room.infants &&
                                                    room.infants.map(
                                                        (infant, idx) => (
                                                            <option
                                                                key={idx}
                                                                value={infant.value}
                                                            >
                                                                {infant.option}
                                                            </option>
                                                        )
                                                    )}

                                            </select>

                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <ul>
                            {extraAdultMessage && <li>
                                <p className="red-text text-darken-1"> * Extra Adult Price -  <i className="fa fa-inr" aria-hidden="true"></i>{extraAdultMessage}.</p>
                            </li>
                            }

                            {extraChildMessage &&
                                <li>
                                    <p className="red-text text-darken-1"> * Extra Child Price -  <i className="fa fa-inr" aria-hidden="true"></i>{extraChildMessage}.</p>
                                </li>
                            }
                        </ul>
                    </>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-footer">
                        {/* <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModal(!modal) ,setCart({})}>Cancel</button> */}
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCancel}>Cancel</button>
                        {/* <button type="button" className="btn btn-primary confirm" data-dismiss="modal" onClick={handleConfirm}><a href="../hotel-booking">Confirm</a></button> */}
                        <button type="button" className="btn btn-primary confirm" data-dismiss="modal" onClick={handleConfirm}>Confirm</button>

                    </div>
                </Modal.Footer>
            </Modal>

            {roomDetailsId && <RoomDetailModal id={roomDetailsId} roomModal={roomModal} setRoomModal={setRoomModal} rooms={roomDetails && roomDetails.rooms} adults={roomDetails && roomDetails.adults} age={roomDetails && roomDetails.age} kids={roomDetails && roomDetails.kids} hotelid={hotel_id} checkin={checkin} checkout={checkout} />}

        </>
    )
}

