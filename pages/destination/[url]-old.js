import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import Search from '../../components/search/search';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import ReactPaginate from 'react-paginate';

const Destination = (response) => {

    const [hotelList, setHotelList] = useState([])
    const [starRating, setStarRating] = useState();
    const [expanded, setExpanded] = useState(false);
    const [amenities, setAmenities] = useState([]);
    const [maxPrice, setMaxPrice] = useState('');
    const [minPrice, setMinprice] = useState('');
    const [destinationBanner, setDestinationBanner] = useState('');
    const [category, setCategory] = useState('');
    let hotel_name = [];
    
	function loadHotels() {
	if (hotelList.length == 0) {
        //console.log('aminities',amenities);return;
		//const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/filter2?group_id=2565&city_name=${response.city}&star_rating=${starRating}&min_price&max_price`).then(response => {
		const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST_BE}/filter3?group_id=2565&city_name=${response.city}&star_rating=${starRating}&min_price=${minPrice}&max_price=${maxPrice}&amenities=${amenities.join()}&category=${category}`).then(response => {
			return response.data
		})
		.catch(error => {
			console.log('error', error);
		});

		fetcher.then(response => {
			// if(hotelList.length == 0 ) {
				setHotelList(response);
				setDestinationBanner(response.destination_image && response.destination_image)
			// }
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
        setHotelList([]);
        
    };
    
    //const [aminityFilter, setAminityFilter] = useState([]);
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
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
 
	var itemsPerPage= 3;
  useEffect(() => {
    //console.log(`Loading itemsrahul`);
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

  //for sticky scroll
  const [scrollval, setScrollval] = useState('')
  useEffect(() => {
    document.addEventListener("scroll", () => {
        const scrollCheck = window.scrollY > 600
        console.log('scroll', window.scrollY);
        if (scrollCheck) {
            setScrollval('shrink')
        } else {
            setScrollval('')
        }
    })
})

const [showFilterbar, setShowFilterbar] = useState('collapse out');
const handleFilterBar = () => {
    if (showFilterbar) {
        setShowFilterbar(''); 
    } else {
        setShowFilterbar('collapse out');
    }
    
}
    // let url = base64_encode((hotelList.length > 0 && hotelList[0].hotel_id) +'/'+ response.url_param[0] +'/'+ response.url_param[1] +'/'+ response.url_param[2]); 

    // console.log('search', (hotelList.length > 0 && hotelList[0].hotel_id), url)
	const toggledClass = expanded ? 'expanded' : 'collapsed';
  return (
    <>
    <Header></Header>
    
    <div className="inner-page-wrapper">
        <div className="d-page-sec1">
            <div className="container  ">
            <div className="row  ">
                <div className="col-md-8 offset-md-2">
                <h2>{response.city}</h2>
                <h3>{hotelList.hotels_data ? (hotelList.hotels_data.length == 1? '1 Hotel': hotelList.hotels_data.length+' Hotels'):'No Notels'} </h3>
				<div>
					<p className={`desti-content ${toggledClass}`}>
						<div
						dangerouslySetInnerHTML={{
							__html: currentItems.length>0 ? currentItems[0].hotel_description:'',
						}}
						/>
					</p>
					<button className="rmore-btn-1" id="myBtn" onClick={() => setExpanded(!expanded)}>
						{expanded ? 'View Less' : 'View More'}
					</button>
				</div>
                </div>
            </div>
            </div>
        </div>
        <div className="destination-page-banner">
            <div className="container-fluid nopad">
            <div className="row nopad">
                <div className="col-md-12 nopad">
                <img src={destinationBanner?destinationBanner:""} alt="" title=""/> 
                </div>
            </div>
            </div>
        </div>
        <div className="inner-page-search-con">
            <div className={`search-con ${scrollval}`}>
            <div className="container">
                <div className="row">
                <div className="col-md-12">
                <Search cityid={response.url_param[1] ? response.url_param[1]:''  } checkin={response.url_param[2] ? response.url_param[2]:''} checkout={response.url_param[3] ? response.url_param[3]:''} adult={response.url_param[4] ? response.url_param[4]:''} kid={response.url_param[5] ? response.url_param[5]:''}/>
                </div>
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
                                        <label htmlFor="price"> <i className="fa fa-inr" aria-hidden="true"></i>1000 - <i className="fa fa-inr" aria-hidden="true"></i>2000</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="2000-3000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> <i className="fa fa-inr" aria-hidden="true"></i>2000 - <i className="fa fa-inr" aria-hidden="true"></i>3000</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="3000-4000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> <i className="fa fa-inr" aria-hidden="true"></i>3000 - <i className="fa fa-inr" aria-hidden="true"></i>4000</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="4000-5000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> <i className="fa fa-inr" aria-hidden="true"></i>4000 - <i className="fa fa-inr" aria-hidden="true"></i>5000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="5000-8000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> <i className="fa fa-inr" aria-hidden="true"></i>5000 - <i className="fa fa-inr" aria-hidden="true"></i>8000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="8000-10000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> <i className="fa fa-inr" aria-hidden="true"></i>8000 - <i className="fa fa-inr" aria-hidden="true"></i>10000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="10000-12000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> <i className="fa fa-inr" aria-hidden="true"></i>10000 - <i className="fa fa-inr" aria-hidden="true"></i>12000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="12000-15000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> <i className="fa fa-inr" aria-hidden="true"></i>12000 - <i className="fa fa-inr" aria-hidden="true"></i>15000 </label>
                                    </li>
                                    <li>
                                        <input type="radio" id="price" name="price" value="15000-1000000"
                                        onChange={(event) => { 
                                            handleFormChange({
                                                price: event.target.value,
                                            });
                                         }}
                                        />
                                        <label htmlFor="price"> <i className="fa fa-inr" aria-hidden="true"></i>15000 - more</label>
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
                                        <label htmlFor="star_rating"> 1 Star</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="star_rating" name="star_rating" value="2" onChange={(event) => { 
                                            handleFormChange({
                                                star: event.target.value,
                                            });
                                        }}/>
                                        <label htmlFor="star_rating"> 2 Star</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="star_rating" name="star_rating" value="3" onChange={(event) => { 
                                            handleFormChange({
                                                star: event.target.value,
                                            });
                                         }}/>
                                        <label htmlFor="star_rating"> 3 Star</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="star_rating" name="star_rating" value="4" onChange={(event) => { 
                                            handleFormChange({
                                                star: event.target.value,
                                            });
                                         }}/>
                                        <label htmlFor="star_rating"> 4 Star</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="star_rating" name="star_rating" value="5" onChange={(event) => { 
                                            handleFormChange({
                                                star: event.target.value,
                                            });
                                         }}/>
                                        <label htmlFor="star_rating"> 5 Star</label>
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
                                            />
                                            <label htmlFor="category">Luxury</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="category" name="category" value="TOP" onChange={(event) => { handleFormChange({
                                                category: event.target.value,
                                            });}}
                                            />
                                            <label htmlFor="category">TOP</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="category" name="category" value="Boutique" onChange={(event) => { handleFormChange({
                                                category: event.target.value,
                                            });}}
                                            />
                                            <label htmlFor="category">Boutique</label>
                                        </li>
                                        <li>
                                            <input type="radio" id="category" name="category" value="Business" onChange={(event) => { handleFormChange({
                                                category: event.target.value,
                                            });}}
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
                                        <figure>
                                            <a href={'../hotel-details/'+ base64_encode(slide.hotel_id+'/'+(response.url_param[2] ? response.url_param[2]:'')+'/'+(response.url_param[3] ? response.url_param[3]:'')+'/'+(response.url_param[4] ? response.url_param[4]:1)+'/'+(response.url_param[5] ? response.url_param[5]:0))}>
                                                <img src={slide.image} alt="" title="" />
                                            </a>
                                        </figure>
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
                                                        /> <span>{slide.star}/5</span>
                                                    </li>
                                                    
                                                </ul>
                                                </div>
                                                <h3><a href={'../hotel-details/'+ base64_encode(slide.hotel_id+'/'+(response.url_param[2] ? response.url_param[2]:'')+'/'+(response.url_param[3] ? response.url_param[3]:'')+'/'+(response.url_param[4] ? response.url_param[4]:1)+'/'+(response.url_param[5] ? response.url_param[5]:0))}>{slide.hotel_name}</a></h3>
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
                                            <li> </li>
                                            <li className='pricee'><i className="fa fa-inr" aria-hidden="true"></i>{slide.starting_price}</li>
                                            
                                            <li> <a href={"../hotel-details/"+ base64_encode(slide.hotel_id+'/'+(response.url_param[2] ? response.url_param[2]:'')+'/'+(response.url_param[3] ? response.url_param[3]:'')+'/'+(response.url_param[4] ? response.url_param[4]:1)+'/'+(response.url_param[5] ? response.url_param[5]:0))} className="book-now-btn-destinationsearch">Book Now</a>
                                            </li>
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
						{/* <div className="pegination"> <a href="#"><i className="fa fa-angle-left" aria-hidden="true"></i></a> <a href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">5</a> <a href="#">6</a> <a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i></a> </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Footer></Footer>
    </>
  )
}

// This gets called on every request
export async function getServerSideProps(context) {
    
    //console.log(base64_decode(context.params.url));
    let url_param = base64_decode(context.params.url).split("/");
	console.log('url_param',url_param);
    // Fetch data from external API
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_BE}/query/2565/${url_param[0]}`
    );
	
    const response = await res.json();console.log('response',response);
    const city = response.hotels_data[0] && response.hotels_data[0].city_name

    if (!response) {
        return {
        notFound: true,
        };
    }
    // Pass data to the page via props
    return { props: {city, url_param}  };
}
 
export default Destination;
