import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import DatePicker from "react-datepicker";
import axios from 'axios';

import "react-datepicker/dist/react-datepicker.css";

export default function Search(props) {
    const [searchData, setSearchData] = useState({})
    const [suggestBox, setSuggestBox] = useState(false);
    const [suggestBoxData,setSuggestBoxData] = useState([]);
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
		if (formData.cityname) { 
			if (formData.searchType == 'CITY') {
				let url = base64_encode(formData.cityname +'/'+ formData.checkin +'/'+ formData.checkout); 
				router.push(`/destination/${url}/`)
			} else {
				let url = base64_encode(formData.searchHotelId); 
				router.push(`hotel-details/${url}`)				
			}
		} else {
			alert('Enter What are you looking for?');
		}
    }

    const handleTextChange = (textData) => {
        setFormData({ ...formData, ...textData });
		setSuggestBox(false);
    };
    console.log(formData);

	
	const suggestClass = suggestBox ? 'display-block' : 'display-none';
	
    const handleKeyUp = (event) => {
		if (event.target.value) {
			setSuggestBox(true);
		} else {
			setSuggestBox(false);
		} 
		axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/query/2565/${event.target.value}`).then(response => {
			
			setSuggestBoxData(response.data.hotels_data);
		  })
		  .catch(error => {
			  console.log('error', error);
		  });
        
    };

    return (
		<>
        <form>
            <div className="form-control">
                <input type="text" placeholder="What are you looking for?" 
                value = {formData.cityname?formData.cityname:props && props.cityname}
				onKeyUp={(event) => { handleKeyUp(event)}}
                onChange={(event) => {
                handleTextChange({
                    cityname: event.target.value,
                });
                }}
                />
				
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
            <div className="form-control dropdown-box">
                <input type="number" name="" placeholder="Adult" />
            </div>
            <div className="form-control" style={{border: "none"}}>
                <input type="number" name="" placeholder="Kids" />
            </div>
            <button className="btn site-button" onClick={handleClick}>
            Search
            </button>
			
        </form>
		<div className={`suggestions-container ${suggestClass}`}>
			<ul>
			
			{
				suggestBoxData.map((slide, index)=>{
						return (
							<>
								<li key={index} className="suggestions-items" onClick={() => {
										handleTextChange({
											cityname: slide.type=='CITY'?slide.city_name:slide.hotel_name,
											searchType: slide.type,
											searchHotelId: slide.type=='CITY'?slide.city_id:slide.hotel_id
										});
										}}
										>{slide.type=='CITY'?slide.city_name:slide.hotel_name}</li>
							</>
						)
					
				})
			}
			
			
			
			</ul>
		</div>
		</>
    )
}

