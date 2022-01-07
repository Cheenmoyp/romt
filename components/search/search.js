import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

export default function Search(props) {
	
    const [searchData, setSearchData] = useState({})
    const [suggestBox, setSuggestBox] = useState(false);
    const [suggestBoxData,setSuggestBoxData] = useState([]);
	const [hotelList, setHotelList] = useState([]);
	const suggestClass = suggestBox ? 'display-block' : 'display-none';
	const [cityList, setCityList] = useState([]);
    const router = useRouter();
	console.log('props', props);
	var tomorow_date = new Date();
	var today_date = new Date();
	var date_checkin = '';
	var date_checkout = '';
	// add a day
	tomorow_date.setDate(tomorow_date.getDate() + 1);
	if (props.checkin) {
		date_checkin = {
                        checkin: new Date(props.checkin),
                        checkout: new Date(props.checkout),
                    }
	} else {
		date_checkin = {
                        checkin: today_date,
                        checkout: tomorow_date,
                    }
	}
	
    const [formData, setFormData] = useState({ ...date_checkin });
	//setFormData();
	const handleClick = e => {
        e.preventDefault()
		
		if (formData.cityid && formData.hotelid) { 
			let url = base64_encode(formData.hotelid+'/'+formData.cityid+'/'+moment(formData.checkin).format("MM-DD-YYYY") +'/'+ moment(formData.checkout).format("MM-DD-YYYY") +'/'+formData.adult+'/'+formData.kid); 

			router.push(`/hotel-details/${url}`)
		} else {
			alert('Enter What are you looking for?');
		}
    }
	
	
	function loadHotel(city_id) {
		setHotelList([]);
		const fetcher2  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-hotels-by-city/2565/${city_id}`).then(response => {
			return response.data.hotels
		})
		.catch(error => {
			console.log('error', error);
		});
		fetcher2.then(response => {
			setHotelList(response);
		})
	}

    const handleTextChange = (textData) => {
		setFormData({ ...formData, ...textData });
		if(textData.cityid) {
			loadHotel(textData.cityid);
		}
    };

	useEffect(()=>{
		sessionStorage.setItem('be_checkin_checkout',JSON.stringify(formData));
		cityListFetch();
		if (props.cityid && props.hotelid) {
			loadHotel(props.cityid);
		}
	},[formData])
	
	function cityListFetch() {
		if(cityList.length == 0) {
			const fetcher1  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-city-list/2565`).then(response => {
				return response.data.cities
			})
			.catch(error => {
				console.log('error', error);
			});
			fetcher1.then(response => {
				if(cityList.length == 0 ) {
					setCityList(response)
				}
			})
		}
	}
	
    return (
		<>
        <form>
            <div className="form-control">
				<select className="hotelfield" onChange={(event) => {
                handleTextChange({
                    cityid: event.target.value,
                });}} 
				value={props.cityid}
				>
					<option value="">Select</option>
					{cityList.map((city,index) => {
						/* if (props.cityid == city.city_id) {
							return (
								<option value={city.city_id} key={index} selected>{city.city_name}</option>
							);
						} else { */
							return (
								<option value={city.city_id} key={index}>{city.city_name}</option>
							);
						/* } */
						
					})}
				</select>
				
            </div>
			<div className="form-control">
				<select className="hotelfield" placeholder="Select Hotels"
				onChange={(event) => {
					handleTextChange({
						hotelid: event.target.value,
					});}} 
				value={props.hotelid}>
					<option value="">Select</option>
					{hotelList.map((hotel,index) => {
						/* if (props.hotelid == hotel.hotel_id) {
							return (
								<option value={hotel.hotel_id} key={index} selected>{hotel.hotel_name}</option>
							);
						} else { */
							return (
								<option value={hotel.hotel_id} key={index}>{hotel.hotel_name}</option>
							);
						/* } */
						
					})}
				</select>
				
            </div>
            <div className="form-control">
                
				<DatePicker id="datepicker" className="datepicker" selected={formData.checkin?formData.checkin :''} placeholder="Check In" onChange={(date) => {
                    handleTextChange({
                        checkin: date,
                    });
                }} />
            </div>
            <div className="form-control">
               
				<DatePicker id="datepicker" className="datepicker" selected={formData.checkout?formData.checkout :''} placeholder="Check Out" onChange={(date) => {
                    handleTextChange({
                        checkout: date,
                    });
                }} />
            </div>
            
            <button className="btn site-button" onClick={handleClick}>
            Search
            </button>
			
        </form>
		
		</>
    )
}

