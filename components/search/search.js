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
	const [cityValue, setCityValue] = useState('');
	const [dropdownStatus, setDropdownStatus] = useState('');
	const [adult, setAdult] = useState(props.adult && props.adult!='undefined' ? props.adult : 1);
	const [kid, setKid] = useState(props.kid && props.kid!='undefined' ? props.kid : 0);
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
		console.log(formData);
		if (formData.cityid) { 
			let selected_data = cityList.filter(option => option.value == (formData.cityid ? formData.cityid : props.cityid));
			
		//console.log(selected_data);return;
			if (selected_data && selected_data[0].type == 'hotel') {
				let url = base64_encode(formData.cityid+'/'+moment(formData.checkin).format("MM-DD-YYYY") +'/'+ moment(formData.checkout).format("MM-DD-YYYY") +'/'+formData.adult+'/'+formData.kid);
				router.push(`/hotel-details/${url}`)
			} else {
				let url = base64_encode(selected_data[0].label+'/'+formData.cityid+'/'+moment(formData.checkin).format("MM-DD-YYYY") +'/'+ moment(formData.checkout).format("MM-DD-YYYY") +'/'+(formData.adult ? formData.adult : adult)+'/'+(formData.kid ? formData.kid : kid));
				router.push(`/destination/${url}`)
			}			
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
			cityValueSet(cityList,textData.cityid);
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
	// useEffect(()=>{
	// 	setHotelList([])
	// 	// if (props.cityid && props.hotelid) {
	// 	 	loadHotel(formData.cityid);
	// 	// }
	// },[formData.cityid])
	
	function cityListFetch() {
		if(cityList.length == 0) {
			//const fetcher1  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-city-list/2565`).then(response => {
			//return response.data.cities
			const fetcher1  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-city-and-hotels/2565`).then(response => {
				return response.data.results
			})
			.catch(error => {
				console.log('error', error);
			});
			fetcher1.then(response => {
				if(cityList.length == 0 ) {
					
					response.map((city) => {
                         cityOption.push({
							"value": city.id,
							"label": city.name,
							"type": city.type
						})
					});
					setCityList(cityOption);
					cityValueSet(cityOption,formData.cityid ? formData.cityid : props.cityid)
				}
			})
		}
	}
	function loadTextChange(value) {
		setCityValue(value);
	}
	function cityValueSet(cityListValue, cityidVal) {
		var citySelected = cityListValue.filter(option => option.value == (cityidVal))?cityListValue.filter(option => option.value == (cityidVal))[0]:'';
		setCityValue(citySelected?citySelected.label:'');
	}
	//var citySelected = cityList.filter(option => option.value == (formData.cityid ? formData.cityid : props.cityid))?cityList.filter(option => option.value == (formData.cityid ? formData.cityid : props.cityid))[0]:'';
	//console.log('hello', JSON.parse(citySelected).label);
	console.log('hello', cityValue);
    return (
		<>
        <form>
            <div className="form-control" tabIndex={0}
			
				onFocus={()=> { setDropdownStatus('show-dropdown') }}
				onBlur={()=> { setDropdownStatus('') }}
			
			>
				<input type="search" placeholder="What are you looking for?" 
                value={cityValue ? cityValue:''}
                onChange={(event) => {
					loadTextChange(event.target.value);
                }}
                />
				
				<ul className={`dropdown-content `+ dropdownStatus} >
					{cityList.map((city,index) => {
						
						if (city.label.toLowerCase().includes(cityValue.toLowerCase())){
							return (
								<li onClick={(e) => {
									setDropdownStatus('');
									setCityValue('');								
									handleTextChange({
										cityid: city.value
									});}} 
									key={index}>{city.label}</li>
							);
						}
						
					})}
				 </ul>
				{/* <Select options={cityList} clearOnSelect={true} malti={false} className="hotelfield" placeholder="Select Destination"  clearable={true} onChange={(values) => {
					
                handleTextChange({
                    cityid: values.length?values[0].value:'',
                });}} 
				values = {
					cityList.filter(option => 
					   option.value == (formData.cityid ? formData.cityid : props.cityid))
				 }
				/> */}
				
            </div>
			<div className="form-control">
				
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
   
			 <div className="btn-group show-on-hover kids-adult  guestbar">
				  <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
					Guests <span className="caret"></span><br />
					<small>{formData.kid || formData.kid == 0 ? formData.kid: kid} Kid, {formData.adult ? formData.adult:adult} Adult</small>
				  </button>
					  <ul className="dropdown-menu" role="menu">
						<li> 
							  <div className="form-control ">
							  <span className="label-control">ADULTS (12y +)</span>
							  
								<span className="btn btn-default bgd-count"  onClick={(event) => {
									if (adult > 1) {
										handleTextChange({
											adult: formData.adult?parseInt(formData.adult)-1:1,
										});
									}
								}} >-</span>
								
								<input className="counter-box-new" type="number" name="" placeholder="Adult" max="3" min="0" value={formData.adult ? formData.adult:adult}
								 onKeyPress="return '0';"  />
								<span className="btn btn-default bgd-count"  onClick={(event) => {
									if (adult == 0 || adult <=3) {
										handleTextChange({
											adult: formData.adult?parseInt(formData.adult)+1:1,
										});
									}
									
								}} >+</span>
							 </div>
							 
							<div className="form-control" >
							
								<span className="label-control">CHILDREN (Age 12y and below)</span>
								<span className="btn btn-default bgd-count  " onClick={(event) => {
									if (kid >= 0) {
										handleTextChange({
												kid: formData.kid?parseInt(formData.kid)-1:0,
											});
									}
								}} >-</span>
								
								<input className="counter-box-new" type="number" name="" placeholder="Kids" max="2" min="0" value={formData.kid || formData.kid == 0 ? formData.kid: kid} readOnly />
								<span className="btn btn-default bgd-count" onClick={(event) => {
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

