import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-dropdown-select";

export default function Search(props) {
	
	const [city, setCity] = useState(props ? props.cityid : '');
	const [val, setVal] = useState();
    const [searchData, setSearchData] = useState({})
    const [suggestBox, setSuggestBox] = useState(false);
    const [suggestBoxData,setSuggestBoxData] = useState([]);
	const [hotelList, setHotelList] = useState([]);
	const suggestClass = suggestBox ? 'display-block' : 'display-none';
	const [cityList, setCityList] = useState([]);
	const [adult, setAdult] = useState(props.adult ? props.adult : 1);
	const [kid, setKid] = useState(props.kid ? props.kid : 0);
    const router = useRouter();
	var tomorow_date = new Date();
	var today_date = new Date();
	var date_checkin = '';
	var date_checkout = '';
	var cityOption = [];
	var hotelOption = [];
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
		const fetcher2  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-hotels-by-city/2565/${city_id}`).then(response => {
		//const fetcher2  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/check-availability?group_id=2565&city_id=${city_id}&checkin_date=${selectedDateIn}&checkout_date=${selectedDateOut}&no_of_rooms&star_rating&min_price&max_price&amenities`).then(response => {
			//return response.data.hotels_data
			return response.data.hotels
		})
		.catch(error => {
			console.log('error', error);
		});
		fetcher2.then(response => {
			//setHotelList(response);
			//if(hotelList.length == 0 ) {
					
				response && response.map((hotel) => {
					 hotelOption.push({
						"value": hotel.hotel_id,
						"label": hotel.hotel_name,
						"name": hotel.hotel_name,
					})
				});//console.log('cityOption',cityOption);
				setHotelList(hotelOption)
			//}
		})
	}

    const handleTextChange = (textData) => {
		
		setFormData({ ...formData, ...textData });
		setVal(textData.cityid);
		if(textData.cityid) {
			console.log('city', textData.cityid);
			setCity('');
			//loadHotel(textData.cityid);
		}
		if(textData.adult) {
			setAdult(textData.adult);
		}
		if(textData.kid) {
			setKid(textData.kid);
		}
    };

	useEffect(()=>{
		sessionStorage.setItem('be_checkin_checkout',JSON.stringify(formData));
		cityListFetch();
		// if (props.cityid && props.hotelid) {
		// 	loadHotel(props.cityid);
		// }
	},[formData])
	useEffect(()=>{
		setHotelList([])
		// if (props.cityid && props.hotelid) {
		 	loadHotel(formData.cityid);
		// }
	},[formData.cityid])
	
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
					
					response.map((city) => {
                         cityOption.push({
							"value": city.city_id,
							"label": city.city_name,
							"name": city.city_name,
						})
					});//console.log('cityOption',cityOption);
					setCityList(cityOption)
				}
			})
		}
	}
	console.log('hello', cityList.filter(option => 
		option.value == (formData.cityid ? formData.cityid : props.cityid)));
    return (
		<>
        <form>
            <div className="form-control">
				{/* <select className="hotelfield" onChange={(event) => {
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
				</select> */}
				<Select options={cityList} clearOnSelect={true} malti={false} className="hotelfield" placeholder="Select Destination"  clearable={true} onChange={(values) => {
					
                handleTextChange({
                    cityid: values.length?values[0].value:'',
                });}} 
				values = {
					cityList.filter(option => 
					   option.value == (formData.cityid ? formData.cityid : props.cityid))
				 }
				/>
				
            </div>
			<div className="form-control">
				{/* <select className="hotelfield" placeholder="Select Hotels"
				onChange={(event) => {
					handleTextChange({
						hotelid: event.target.value,
					});}} 
				value={props.hotelid}>
					<option value="">Select Hotel</option>
					{hotelList && hotelList.map((hotel,index) => {
						if (props.hotelid == hotel.hotel_id) {
							return (
								<option value={hotel.hotel_id} key={index} selected>{hotel.hotel_name}</option>
							);
						} else {
							return (
								<option value={hotel.hotel_id} key={index}>{hotel.hotel_name}</option>
							);
						} 
						
					})}
				</select> */}
				<Select options={hotelList} clearOnSelect={true} malti={false} className="hotelfield"   placeholder="Select Hotels" clearable={true} onChange={(values) => {
					
					handleTextChange({
						hotelid: values.length?values[0].value:'',
					});}} 
					values = {
						hotelList.filter(option => 
						   option.value == (formData.hotelid ? formData.hotelid : props.hotelid))
					 }
					/>
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
   
			 <div className="btn-group show-on-hover kids-adult">
				  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
					Guests <span className="caret"></span>
				  </button>
					  <ul className="dropdown-menu" role="menu">
						<li> 
							  <div className="form-control ">
							  <span className="label-control">ADULTS (12y +)</span>
							  
								<span className="btn btn-default"  onClick={(event) => {
									if (adult > 1) {
										handleTextChange({
											adult: formData.adult?parseInt(formData.adult)-1:1,
										});
									}
								}} >-</span>
								
								<input type="number" name="" placeholder="Adult" max="3" min="0" value={formData.adult ? formData.adult:adult}
								 onKeyPress="return '0';"  />
								<span className="btn btn-default"  onClick={(event) => {
									if (adult == 0 || adult <=3) {
										handleTextChange({
											adult: formData.adult?parseInt(formData.adult)+1:1,
										});
									}
									
								}} >+</span>
							 </div>
							 
							<div className="form-control" >
							
								<span className="label-control">CHILDREN (Age 12y and below)</span>
								<span className="btn btn-default" onClick={(event) => {
									if (kid >= 0) {
										handleTextChange({
												kid: formData.kid?parseInt(formData.kid)-1:0,
											});
									}
								}} >-</span>
								
								<input type="number" name="" placeholder="Kids" max="2" min="0" value={formData.kid || formData.kid == 0 ? formData.kid: kid} readOnly />
								<span className="btn btn-default" onClick={(event) => {
									if ((kid<=2)) {
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

