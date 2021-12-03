import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router'
import {decode as base64_decode, encode as base64_encode} from 'base-64';

export default function Search(props) {
    const [searchData, setSearchData] = useState({})
    const [formData, setFormData] = useState({});
    const router = useRouter();
    const handleClick = e => {
        e.preventDefault()
        let url = base64_encode(formData.cityname +'/'+ formData.checkin +'/'+ formData.checkout); 
        router.push(`/destination/${url}/`)
    }

    const handleTextChange = (textData) => {
        setFormData({ ...formData, ...textData });
    };
    console.log(formData);

    return (
        <form>
            <div className="form-control">
                <input type="text" placeholder="What are you looking for?" 
                value = {props && props.cityname}
                onChange={(event) => {
                handleTextChange({
                    cityname: event.target.value,
                });
                }}
                />
            </div>
            <div className="form-control">
                <input id="datepicker" type="text" className="datepicker" data-zdp_readonly_element="false" placeholder="Check In" 
                value = {props && props.checkin}
                onChange={(event) => {
                    handleTextChange({
                        checkin: event.target.value,
                    });
                }}
                />
            </div>
            <div className="form-control">
                <input id="datepicker" type="text" className="datepicker" data-zdp_readonly_element="false" placeholder="Check Out" 
                value = {props && props.checkout}
                onChange={(event) => {
                    handleTextChange({
                        checkout: event.target.value,
                    });
                }}/>
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
    )
}

