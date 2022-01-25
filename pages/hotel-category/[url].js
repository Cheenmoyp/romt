import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import Seacrch from '../../components/search/search';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import ReactPaginate from 'react-paginate';

const HotelCategory = (props) => {
    const [hotelList, setHotelList] = useState([])
    const [starRating, setStarRating] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [maxPrice, setMaxPrice] = useState('');
    const [minPrice, setMinprice] = useState('');
    const [category, setCategory] = useState(props.category);
    var categories = [];
	function loadHotels() {
        if (hotelList.length == 0) {
            const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/filter3?group_id=2565&city_name&star_rating=${starRating}&min_price=${minPrice}&max_price=${maxPrice}&amenities=${amenities.join()}&category=${category}`).then(response => {
                return response.data
            })
            .catch(error => {
                console.log('error', error);
            });

            fetcher.then(response => {
                //if(hotelList.length == 0 ) {
                    setHotelList(response)
                //}
            })
        }
    }
	

    const handleFormChange = (event) => {
        if(event.star) {
            setStarRating(event.star ? event.star : '');
        }
        if(event.amenity) {
            setAmenities(event.amenity ? event.amenity : '');
        }
        if(event.price) {
            var price = event.price.split('-');
            setMinprice(price[0] ? price[0] : '');
            setMaxPrice(price[1] ? price[1] : '');
        }
        if(event.category) {
            setCategory(event.category ? event.category : '');
        }
        setHotelList([]); console.log(starRating+'/'+amenities);
		//loadHotels()
		 
    };
	/* const filterData = (event) => {
		loadHotels()
	} */
	
    var aminityFilter = [];
    const handleAminityChange = (aminity_id, event_status) => {
        aminityFilter = [...amenities];
        if (event_status) {
            //var aminty_filter = aminityFilter;
            (aminityFilter.push(aminity_id));
        } else {
            aminityFilter = (aminityFilter.filter(item => item !== aminity_id));
        }
        setAmenities(aminityFilter);
        setHotelList([]);

    }



// We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
 
	var itemsPerPage= 3;
  useEffect(() => {
	   
	   //if (hotelList.length == 0) {
        loadHotels();
        var hotels = hotelList.hotels_data;//console.log('hotels', hotels);
	   //}
    // Fetch items from another resources.
    if (hotels && hotels.length != 0) {
        
        const endOffset = itemOffset + itemsPerPage;
        //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(hotels.slice(itemOffset, endOffset));
        //console.log('Loading items2',hotels);
        //console.log('Loading items',hotels.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(hotels.length / itemsPerPage));
    } else {
        setCurrentItems([]);
    }
  }, [hotelList, itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % hotelList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const [showFilterbar, setShowFilterbar] = useState('collapse out');
  const handleFilterBar = () => {
    if (showFilterbar) {
        setShowFilterbar(''); 
    } else {
        setShowFilterbar('collapse out');
    }
  }

  //category
    // const fetcherCategory  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/group-hotels-categories/2565`).then(response => {
    //     return response.data.hotels_categories;
    // })
    // .catch(error => {
    //     console.log('error', error);
    // });
    // fetcherCategory.then(response => {
    //     if(categories.length == 0 ) {
    //         //get category index values
    //         for (const [key, value] of Object.entries(response)) {
    //             if(key != 'NA'){
    //                 categories.push(key);
    //             }
    //         }
    //     }
    // })
    // console.log('mmm', categories);
    
    return (
        <>
            <Header></Header>
            <div className="inner-page-wrapper">
                <div className="inner-page-search-con">
                    <div className="search-con">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-12">
                            <Seacrch />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="inner-page-banner">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        
                        </div>
                    </div>
                    </div>
                </div>
                <div className="hotel-list">
                    <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                        <div className="filter-box">
                            <div className="nav-side-menu">
                            <div className="brand">Filters</div>
                            <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content" onClick={() => handleFilterBar()}></i>
                            <div className="menu-list">
                                <div id="menu-content" className={'menu-content '+showFilterbar}>
                                <div className="filter-list-con">
                                    <h4>Price Range</h4>
                                    
                                    <ul>
                                    <li>
                                        <input type="radio" id="price" name="price" value="1000-2000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> ₹1000 - ₹2000</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="2000-3000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> ₹2000 - ₹3000</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="3000-4000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> ₹3000 - ₹4000</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="4000-5000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> ₹4000 - ₹5000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="5000-8000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> ₹5000 - ₹8000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="8000-10000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> ₹8000 - ₹10000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="10000-12000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> ₹10000 - ₹12000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="12000-15000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> ₹12000 - ₹15000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="15000-1000000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> ₹15000 - more</label>
                                    </li>
                                    </ul>
                                </div>
                                <div className="filter-list-con">
                                    <h4>Star Ratings</h4>
                                    <ul>
                                    <li>
                                        <input type="radio" id="star_rating" name="star_rating" value="1" onChange={(event) => { handleFormChange({
                                            star: event.target.value,
                                        });}}
                                        />
                                        <label htmlFor="star_rating">1 Star</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="star_rating" name="star_rating" value="2" onChange={(event) => { 
                                            handleFormChange({
                                                star: event.target.value,
                                            });
                                        }}/>
                                        <label htmlFor="star_rating">2 Star</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="star_rating" name="star_rating" value="3" onChange={(event) => { 
                                            handleFormChange({
                                                star: event.target.value,
                                            });
                                         }}/>
                                        <label htmlFor="star_rating">3 Star</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="star_rating" name="star_rating" value="4" onChange={(event) => { 
                                            handleFormChange({
                                                star: event.target.value,
                                            });
                                         }}/>
                                        <label htmlFor="star_rating">4 Star</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="star_rating" name="star_rating" value="5" onChange={(event) => { 
                                            handleFormChange({
                                                star: event.target.value,
                                            });
                                         }}/>
                                        <label htmlFor="star_rating">5 Star</label>
                                    </li>
                                    </ul>
                                </div>
                                <div className="filter-list-con">
                                    <h4>Categories</h4>
                                    <ul>
                                        <li>
                                            <input type="radio" id="category" name="category" value="Luxury" onChange={(event) => { handleFormChange({
                                                category: event.target.value,
                                            });}}
                                            checked={category === "Luxury"}
                                            />
                                            <label htmlFor="category">Luxury</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="category" name="category" value="TOP" onChange={(event) => { handleFormChange({
                                                category: event.target.value,
                                            });}}
                                            checked={category === "TOP"}
                                            />
                                            <label htmlFor="category">TOP</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="category" name="category" value="Boutique" onChange={(event) => { handleFormChange({
                                                category: event.target.value,
                                            });}}
                                            checked={category === "Boutique"}
                                            />
                                            <label htmlFor="category">Boutique</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="category" name="category" value="Business" onChange={(event) => { handleFormChange({
                                                category: event.target.value,
                                            });}}
                                            checked={category === "Business"}
                                            />
                                            <label htmlFor="category">Business</label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="filter-list-con">
                                    <h4>Amenities</h4>
                                    <ul>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="42" onChange={(event) => {
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                    }}
                                        />
                                        <label htmlFor="amenities"> Free parking</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="2" onChange={(event) => {
                                            handleAminityChange(
                                                 event.target.value,event.target.checked
                                            );
                                        }}/>
                                        <label htmlFor="amenities"> 24-hour room service</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="28" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Doctor on call</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="227" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Complimentary Breakfast</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="35" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Gym</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="55" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Jacuzzi</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="76" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Restaurant</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="84" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Spa</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="96" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Dry cleaning</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="165" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Bar</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="269" onChange={(event) => { 
                                            handleFormChange({
                                                amenity: event.target.value,
                                            });
                                         }}/>
                                        <label htmlFor="amenities"> Meeting rooms</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="365" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Pets Allowed</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="367" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Couple Friendly</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="376" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Swimming Pool</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" id="amenities" name="amenities" value="400" onChange={(event) => { 
                                            handleAminityChange(
                                                event.target.value,event.target.checked
                                           );
                                         }}/>
                                        <label htmlFor="amenities"> Terrace</label>
                                    </li>
									<li>
										
									</li>
                                    </ul>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        {currentItems && currentItems.length != 0 ?
                            <div className="col-md-9">
                                {currentItems.map((slide, index)=>{
                                    return (
                                        <div className="hotel-box2 row" key={index}>
                                            <div className="col-md-4">
                                            <figure><img src={slide.image} alt="" title=""/></figure>
                                            </div>
                                            <div className="col-md-5">
                                            <div className="hotel-box2-content">
                                                <div className="rating">
                                                <ul>
                                                    <li>
                                                        <StarRatings
                                                            rating={slide.star}
                                                            starRatedColor="orange"
                                                            numberOfStars={5}
                                                            name='rating'
                                                            starDimension="15px"
                                                            starSpacing="1px"
                                                        />
                                                    </li>
                                                    <li>311 Ratings</li>
                                                </ul>
                                                </div>
                                                <h3><a href={'/hotel-details/'+ base64_encode(slide.hotel_id)}>{slide.hotel_name}</a></h3>
                                                <div className="distance">
                                                <p><span><img src="/Images/hotels/icons/location-icon.png"/></span>{slide.city_name}</p>
                                                </div>
                                                <div className="content">
                                                <p>
                                                    <div
                                                    dangerouslySetInnerHTML={{
                                                        __html: slide && slide.hotel_description,
                                                    }}
                                                    />
                                                </p>
                                                </div>
                                                <div className="amenities">
                                                <ul>
                                                    <li><span><img src="/Images/packages/icons/Safe.png" alt="" title=""/></span>ROMT Safe</li>
                                                    <li><span><img src="/Images/packages/icons/free-wifi.png" alt="" title=""/></span>Free WIFI</li>
                                                    <li><span><img src="/Images/packages/icons/Housekeeping.png" alt="" title=""/></span>Hosekeeping</li>
                                                    
                                                </ul>
                                                </div>
                                                <div className="hotel-box2-footer">
                                               
                                                </div>
                                            </div>

                                            </div>
                                            <div className="col-md-3 hotel-box2-right">
                                                <ul className="rating">
                                                <li><span>4.5/5</span>185 Ratings</li>
                                                <li><span className="cut-price"></span>₹{slide.starting_price}</li>
                                                 
                                            <li> <a href={'/hotel-details/'+ base64_encode(slide.hotel_id)} className="book-now-btn-destinationsearch">Book Now</a></li>
                                                </ul>
                                     
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            :

                            <div className="col-md-9">
                                <h1 style={{textAlign: 'center'}}>No Hotels Found</h1>
                            </div>
                        }
						
						
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center">
						<ReactPaginate
							className="hotel-pagination"
							previousClassName="fa fa-angle-left"
							nextClassName="fa fa-angle-right"
							
							breakLabel="..."
							nextLabel=""
							onPageChange={handlePageClick}
							pageRangeDisplayed={5}
							pageCount={pageCount}
							previousLabel=""
							renderOnZeroPageCount={null}
						 />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export async function getServerSideProps(context) {
    let url_param = base64_decode(context.params.url);
    
    return { props:  { category: url_param ? url_param : ''} };
  }

export default HotelCategory;