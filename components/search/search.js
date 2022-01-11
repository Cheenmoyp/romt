import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export default function Search(props) {
	
	const [city, setCity] = useState(props ? props.cityid : '');
	const [val, setVal] = useState();
    const [searchData, setSearchData] = useState({})
    const [suggestBox, setSuggestBox] = useState(false);
    const [suggestBoxData,setSuggestBoxData] = useState([]);
	const [hotelList, setHotelList] = useState([]);
	const suggestClass = suggestBox ? 'display-block' : 'display-none';
	const [cityList, setCityList] = useState([]);
    const router = useRouter();
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
			alert('Select Destination and Hotel');
		}
    }
	
	
	function loadHotel(city_id) {
		setHotelList([]);
		var selectedDateIn = formData.checkin?moment(formData.checkin).format("YYYY-MM-DD"):moment(date_checkin.checkin).format("YYYY-MM-DD");
		var selectedDateOut = formData.checkout?moment(formData.checkout).format("YYYY-MM-DD"):moment(date_checkin.checkout).format("YYYY-MM-DD");
		//const fetcher2  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-hotels-by-city/2565/${city_id}`).then(response => {
		const fetcher2  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/check-availability?group_id=2565&city_id=${city_id}&checkin_date=${selectedDateIn}&checkout_date=${selectedDateOut}&no_of_rooms&star_rating&min_price&max_price&amenities`).then(response => {
			return response.data.hotels_data
		})
		.catch(error => {
			console.log('error', error);
		});
		fetcher2.then(response => {
			setHotelList(response);
		})
	}

    const handleTextChange = (textData) => {
		console.log(textData);
		setFormData({ ...formData, ...textData });
		setVal(textData.cityid);
		if(textData.cityid) {
			console.log('city', textData.cityid);
			setCity('');
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
				value={city ? city : val}
				>
					<option value="">Select Destination</option>
					{cityList.map((city,index) => {
						if (city == city.city_id) {
							return (
								<option value={city.city_id} key={index} selected>{city.city_name}</option>
							);
						} else { 
							return (
								<option value={city.city_id} key={index} >{city.city_name}</option>
							);
							} 
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
					<option value="">Select Hotel</option>
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
                
				<DatePicker id="datepicker" minDate={moment().toDate()} className="datepicker" selected={formData.checkin?formData.checkin :''} placeholder="Check In" onChange={(date) => {
                    handleTextChange({
                        checkin: date,
                    });
                }} />
            </div>
            <div className="form-control">
               
				<DatePicker id="datepicker" minDate={formData.checkin} className="datepicker" selected={formData.checkout?formData.checkout :''} placeholder="Check Out" onChange={(date) => {
                    handleTextChange({
                        checkout: date,
                    });
                }} />
            </div>
   
			 <div class="btn-group show-on-hover kids-adult">
				  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
					Guests <span class="caret"></span>
				  </button>
					  <ul class="dropdown-menu" role="menu">
						<li> 
							  <div className="form-control ">
							  <span className="label-control">ADULTS (12y +)</span>
								<span className="btn btn-default" disabled={formData.adult?true:false}  onClick={(event) => {
									if (!formData.adult) {
										handleTextChange({
											adult: formData.adult?parseInt(formData.adult)-1:0,
										});
									}
								}} >-</span>
								
								<input type="number" name="" placeholder="Adult" max="4" min="0" value={formData.adult ? formData.adult:props.adult}
								onChange={(event) => {
									handleTextChange({
										adult: event.target.value,
									});
								}}  onKeyPress="return '0';"  />
								<span className="btn btn-default"  onClick={(event) => {
									if (formData.adult<=4) {
										handleTextChange({
											adult: formData.adult?parseInt(formData.adult)+1:1,
										});
									}
									
								}} >+</span>
							 </div>
							 
							<div className="form-control" >
							
								<span className="label-control">CHILDREN (Age 12y and below)</span>
								<span className="btn btn-default" disabled={formData.kid?true:false}  onClick={(event) => {
									if (!formData.kid) {
										handleTextChange({
												kid: formData.kid?parseInt(formData.kid)-1:0,
											});
									}
								}} >-</span>
								
								<input type="number" name="" placeholder="Kids" max="3" min="0" value={formData.kid ? formData.kid:props.kid} readOnly onChange={(event) => {
									
									handleTextChange({
											kid: event.target.value,
										});
								}} />
								<span className="btn btn-default" onClick={(event) => {
									if ((formData.kid<=2)) {
										handleTextChange({
											kid: formData.kid?parseInt(formData.kid)+1:1,
										});
									}
								}} >+</span>
							</div>
						
						</li>
						 
					  </ul>
				  </div>
   
   
   
   
   
            <button className="btn site-button" onClick={handleClick}>
            Search
            </button>
			
        </form>
		
		</>
    )
}

