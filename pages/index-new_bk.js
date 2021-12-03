import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/router'
import axios from 'axios';
import Search from '../components/search/search';

export default function Home() {
  const router = useRouter()
  const fetcher  = axios.get(`${process.env.NEXT_PUBLIC_HOST}/group-hotel-list/2565`).then(response => {
        return response.data.hotels_data
      })
      .catch(error => {
          console.log('error', error);
      });
  
  const [ourHotelData, setOurHotelData] = useState([])
  const [searchData, setSearchData] = useState()

  fetcher.then(response => {
    if(ourHotelData.length == 0 ) {
      setOurHotelData(response)
    }
  })

  const handleClick = e => {
    e.preventDefault()
    router.push(`/hotels/${searchData.firstname}`)
  }

  const handleTextChange = (textData) => {
    setSearchData(textData);
  };

  return (
    
    <>
       <Header></Header> 
<div className="slider-con">
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active"> 
            <img src="/slide1.jpg" className="d-block w-100" alt="..." /> 
        </div>
        <div className="carousel-item"> <img src="/slider2.jpg" className="d-block w-100" alt="..."/> </div>
      
      </div>
      <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev"> <span className="carousel-control-prev-icon" aria-hidden="true"></span> <span className="sr-only">Previous</span> </a> <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next"> <span className="carousel-control-next-icon" aria-hidden="true"></span> <span className="sr-only">Next</span> </a>
      <div className="search-con">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Make Your Stay Comfortable </h1>
              <h3>Get instant benefits with ROMT Rewards at more than 650 hotels in over 80 countries</h3>
              <Search props={1}/>
              <div className="search-categories">
                <ul>
                  <li> <a href="#" className="category"> <i className="fa fa-ravelry" aria-hidden="true"></i>
                    <p>24,000+</p>
                    <p className="det">Travel Experiences</p>
                    </a> </li>
                  <li> <a href="#" className="category"> <i className="fa fa-globe" aria-hidden="true"></i>
                    <p>55+</p>
                    <p className="det">Countries</p>
                    </a> </li>
                  <li> <a href="#" className="category"> <i className="fa fa-money" aria-hidden="true"></i>
                    <p>Best Price</p>
                    <p className="det">Guaranteed</p>
                    </a> </li>
                  <li> <a href="#" className="category"> <i className="fa fa-users" aria-hidden="true"></i>
                    <p>84 Million+</p>
                    <p className="det">Users Per Year</p>
                    </a> </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

<div className="book-direct-section">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <ul>
          <li>
            <div className="custom-heading">
              <h2>Book <br/>
                Direct </h2>
            </div>
          </li>
          <li> <a href="#" className="b-direct-box">
            <div className="icon"><img alt="" src="/Images/icons/BestRatesGuaranteed.png" /></div>
            <h4>Best Rates Guaranteed</h4>
            </a> </li>
          <li> <a href="#" className="b-direct-box">
            <div className="icon"><img alt="" src="/Images/icons/payat-hotel.png" title="" /></div>
            <h4>Pay at Hotel</h4>
            </a> </li>
          <li> <a href="#" className="b-direct-box">
            <div className="icon"><img alt="" src="/Images/icons/nohiddencost.png" title="" /></div>
            <h4>No Hidden Charges</h4>
            </a> </li>
          <li> <a href="#" className="b-direct-box">
            <div className="icon"><img alt="" src="/Images/icons/Exclusive-Offers.png" title="" /></div>
            <h4>Exclusive Offers</h4>
            </a> </li>
          <li> <a href="#" className="b-direct-box">
            <div className="icon"><img alt="" src="/Images/icons/Member-Rewards.png" title="" /></div>
            <h4>Member Rewards</h4>
            </a> </li>
          <li> <a href="#" className="b-direct-box">
            <div className="icon"><img alt="" src="/Images/icons/Wifi-Access.png" title="" /></div>
            <h4>Wifi Access</h4>
            </a> </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div className="commitment-sec">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <ul>
          <li>
            <div className="commitment-title"> ROMT - A COMMITMENT RESTRENGTHENED </div>
          </li>
          <li>
            <div className="commitmenticons"> <img alt="" src="/Images/icons/RenewedSafetyProtocol.png" /> </div>
            <div className="commitment-content">Renewed Safety<br/>
              Protocol</div>
          </li>
          <li>
            <div className="commitmenticons"> <img alt="" src="/Images/icons/ContactlessTechnology.png" /> </div>
            <div className="commitment-content">Contactless<br/>
              Technology</div>
          </li>
          <li>
            <div className="commitmenticons"> <img alt="" src="/Images/icons/TrainedHygiene.png" /> </div>
            <div className="commitment-content">Trained on<br/>
              Hygiene</div>
          </li>
          <li>
            <div className="commitmenticons"> <img alt="" src="/Images/icons/SaferRooms.png"/> </div>
            <div className="commitment-content">Safer<br/>
              Rooms</div>
          </li>
          <li> <a href="#" className="l-moere">Learn More</a> </li>
        </ul>
      </div>
    </div>
  </div>
</div>

<div className="packages-home">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h3 className="heading1">Our Packages</h3>
      </div>
    </div>
    <div className="row">
      <div className="col-md-5">
        <div className="box1">
          <figure><a href="package-detail"><img src="/Images/packages/main1.jpg" alt="" title=""/></a></figure>
          <div className="content">
            <h3><a href="package-detail">Yercaud, Munar and Mysur</a></h3>
          </div>
        </div>
      </div>
      <div className="col-md-7">
        <div className="row">
          <div className="col-md-6">
            <div className="box1">
              <figure><a href="package-detail"><img src="/Images/packages/main2.jpg" alt="" title=""/></a></figure>
              <div className="content">
                <h3><a href="package-detail">Heritage Resort, Coorg | Luxury
                  Staycation Deal</a></h3>
              </div>
            </div>
            <div className="box1">
              <figure><a href="package-detail"><img src="/Images/packages/main3.jpg" alt="" title=""/></a></figure>
              <div className="content">
                <h3><a href="package-detail">The Ibnil, Coorg | Luxury
                  Staycation Deal</a></h3>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box1">
              <figure><a href="package-detail"><img src="/Images/packages/main4.jpg" alt="" title=""/></a></figure>
              <div className="content">
                <h3><a href="package-detail">Seral Resort, Kabini | Luxury
                  Staycation Deal</a></h3>
              </div>
            </div>
            <div className="btn-bx"> <a href="package">Explore all packages</a> </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="our-hotel">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h3 className="heading1">Our Hotels</h3>
      </div>
    </div>
    <div className="row">
    {ourHotelData.map((slide, index)=>{
      return (
          <div className="col-md-4" key={index} > 
         
          <div className="box-2">
            <figure><a href={'hotel-details/'+ slide.hotel_id }><img src={slide.image} alt={slide.hotel_name} title={slide.hotel_name} style={{height:"300px"}}/></a></figure>
            <div className="content">
              <h3><a href="#">{slide.hotel_name}</a></h3>
              <div className="hotel-footer">
                <div className="row">
                  <div className="col-6">
                    <div className="rating">
                    <StarRatings
                      rating={slide.star}
                      starRatedColor="orange"
                      numberOfStars={5}
                      name='rating'
                      starDimension="15px"
                      starSpacing="1px"
                    />
                    </div>
                  </div>
                  <div className="col-6 text-right">
                    <div className="price"> <i className="fa fa-inr" aria-hidden="true"></i> {slide.starting_price} </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
     })}
     <div className="box-2 btn-bx"> <a href="hotels">Explore all Hotels</a> </div>
    </div>
  </div>
</div>

{/* <div className="destination-section">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h3 className="heading1">Destinations</h3>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12" style={{padding: "0.5px"}}>
      className="owl-carousel"
        <div id="Destinations" >
          <div className="post-slide">
            <div className="box-3">
              <figure><img src="/Images/destinations/banglore.jpg" alt="" title="" /></figure>
              <div className="content">
                <h4><a href="#">Bangalore</a></h4>
              </div>
            </div>
          </div>
          <div className="post-slide">
            <div className="box-3">
              <figure><img src="/Images/destinations/kolkata.jpg" alt="" title="" /></figure>
              <div className="content">
                <h4><a href="#">Kolkata</a></h4>
              </div>
            </div>
          </div>
		  <div className="post-slide">
            <div className="box-3">
              <figure><img src="/Images/destinations/chennai.jpg" alt="" title="" /></figure>
              <div className="content">
                <h4><a href="#">Chennai</a></h4>
              </div>
            </div>
          </div>
		  <div className="post-slide">
            <div className="box-3">
              <figure><img src="/Images/destinations/mumbai.jpg" alt="" title="" /></figure>
              <div className="content">
                <h4><a href="#">Mumbai</a></h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */}

<div className="testimonial-section">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2 className="heading1">Our Testimonial</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6"> <img src="/Images/testimonial-left.png" alt="" title="" style={{width: "100%"}} /> </div>
      <div className="col-md-6">
        <div className="testimonial-right">
        {/* className="owl-carousel" */}
          <div id="Testimonial" >
            <div className="post-slide">
              <div className="testimonial-box">
                <figure><img src="/Images/client.jpg" alt="" title="" /></figure>
				<h4>Yercud, Munar Mysore</h4>
                <div className="content">
					<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don`t look even slightly believable.</p>
                </div>
				<h5>Name</h5>
              </div>
            </div>
            <div className="post-slide">
              <div className="testimonial-box">
                <figure><img src="/Images/client.jpg" alt="" title="" /></figure>
				<h4>Yercud, Munar Mysore</h4>
                <div className="content">
					<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don`t look even slightly believable.</p>
                </div>
				<h5>Name</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<Footer></Footer>
    </>
  )
}
