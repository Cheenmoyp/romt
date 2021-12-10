import Head from 'next/head';
import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/router'
import axios from 'axios';
import Search from '../components/search/search';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import {decode as base64_decode, encode as base64_encode} from 'base-64';


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
const testimonialResponsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2
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
const destinationResponsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
  return (
  <>
    <Header></Header> 
<div className="slider-con">
   
     <video >
        <source src="/Images/video.mp4" type="video/mp4" />
    </video>
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
        </ul>
      </div>
    </div>
  </div>
</div>

<div className="packages-home">
  <div className="container">
    <div className="row">
		<div className="col-md-10 offset-md-1 no-padding">
        <div className="welcome-right">
          <div className="carousel package-home"  id="welcomeSlider">
		    <Carousel swipeable={true}
				  draggable={true}
				  infinite={true}
				  responsive={responsive}>
		        <div className="">
		            <div className="col-md-12 row">
		              <div className="col-md-7">
		                <div className="welcome-sectio-left">
		                  <h2>Book your perfect holiday packages in India </h2>
		                  <div className="content">
		                    <p> Just 3% of rooms in each destination win the <strong>ROMT</strong> rewards, the new global quality standard for vacation homes. </p>
		                  </div>
		                  <a href="package" className="exmore">Explore the Package </a><a href="#" className="exmore blue-bg">Book the package</a> </div>
		              </div>
		              <div className="col-md-5 no-padding">
		                <div className="box-welcome">
		                  <figure><img src="/Images/kashmir.png" alt="" title="" /></figure>
		                </div>
		              </div>
		            </div>
		        </div>
		        <div className="">
		            <div className="col-md-12 row">
		              <div className="col-md-7">
		                <div className="welcome-sectio-left">
		                  <h2>Book your perfect holiday packages in India </h2>
		                  <div className="content">
		                    <p> Just 32% of rooms in each destination win the <strong>ROMT</strong> rewards, the new global quality standard for vacation homes. </p>
		                  </div>
		                  <a href="package" className="exmore">Explore the Package </a><a href="#" className="exmore blue-bg">Book the package</a> </div>
		              </div>
		              <div className="col-md-5 no-padding">
		                <div className="box-welcome">
		                  <figure><img src="/Images/kashmir.png" alt="" title="" /></figure>
		                </div>
		              </div>
		            </div>
		        </div>
		      
            </Carousel>
            
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
          <div className={index == 1 || index == 4?  "col-md-6" : "col-md-3"} key={index}> 
         
          <div className={ index == 3 || index == 5 ? "box-2 mtop-60":"box-2" }>
            <figure><a href={'hotel-details/'+ base64_encode(slide.hotel_id) }><img className={ index == 0 || index == 2 || index == 5? "height-237": index == 3 ? "height-360":"height-300" } src={slide.image} alt={slide.hotel_name} title={slide.hotel_name} /></a></figure>
            <div className="content">
              <h3><a href={'hotel-details/'+ base64_encode(slide.hotel_id) }>{slide.hotel_name} </a></h3>
              <div className="hotel-footer">
                <div className="row">
                  <div className="col-6 text-left">
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
			<div>
			{ index == 5 ? (<div className="box-2 btn-bx box-bx"> <a href="hotels">Explore all Hotels</a> </div>):'' }
			</div>
        </div>
      )
     })}
    </div>
  </div>
</div>

<div className="destination-section">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h3 className="heading1">Destinations</h3>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div id="Destinations" >
        <Carousel swipeable={true}
				  draggable={true}
				  infinite={true}
				  responsive={destinationResponsive}>
          <div className="post-slide">
            <div className="box-3">
              <figure><img src="/Images/destinations/Coimbatore.jpg" alt="" title="" /></figure>
              <div className="content">
                <h4><a href={'/destination/'+ base64_encode('coimbatore')}>Coimbatore</a></h4>
              </div>
            </div>
          </div>
          <div className="post-slide">
            <div className="box-3">
              <figure><img src="/Images/destinations/Erode.jpg" alt="" title="" /></figure>
              <div className="content">
                <h4><a href={'/destination/'+ base64_encode('erode')}>Erode</a></h4>
              </div>
            </div>
          </div>
		  <div className="post-slide">
            <div className="box-3">
              <figure><img src="/Images/destinations/Krishnagiri.jpg" alt="" title="" /></figure>
              <div className="content">
                <h4><a href={'/destination/'+ base64_encode('krishnagiri')}>Krishnagiri</a></h4>
              </div>
            </div>
          </div>
		  <div className="post-slide">
            <div className="box-3">
              <figure><img src="/Images/destinations/Munnar.jpg" alt="" title="" /></figure>
              <div className="content">
                <h4><a href={'/destination/'+ base64_encode('munnar')}>Munnar</a></h4>
              </div>
            </div>
          </div>
          <div className="post-slide">
            <div className="box-3">
              <figure><img src="/Images/destinations/Yercaud.jpg" alt="" title="" /></figure>
              <div className="content">
                <h4><a href={'/destination/'+ base64_encode('yercaud')}>Yercaud</a></h4>
              </div>
            </div>
          </div>
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</div>

<div className="testimonial-section">
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <h2 className="heading1">Our Testimonial</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-md-6"> 
		<div className="testimonial-video">
			<div>
  <div>
    <Carousel swipeable={true}
				  draggable={true}
				  infinite={true}
				  responsive={responsive}>
        <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/3uNbBykYo6M" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        
        <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/3uNbBykYo6M" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        
        <div>
	        <iframe width="560" height="315" src="https://www.youtube.com/embed/Pw5OQvs28rs" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
	    </div>
    </Carousel>    
  </div>
</div>
		</div>
	  </div>
      <div className="col-md-6">
        <div className="testimonial-right">
          <div id="Testimonial" className="testimonial" >
          <Carousel swipeable={true}
				  draggable={true}
				  infinite={true}
				  responsive={testimonialResponsive}>
	            <div className="post-slide">
	              <div className="testimonial-box">
	                <figure><img src="/Images/client.jpg" alt="" title="" /></figure>
					<h4>Yercud, Munar Mysore</h4>
	                <div className="content">
						<p>1There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.</p>
	                </div>
					<h5>Name</h5>
	              </div>
	            </div>
	            <div className="post-slide">
	              <div className="testimonial-box">
	                <figure><img src="/Images/client.jpg" alt="" title="" /></figure>
					<h4>Yercud, Munar Mysore</h4>
	                <div className="content">
						<p>2There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.</p>
	                </div>
					<h5>Name</h5>
	              </div>
	            </div>
	            <div className="post-slide">
	              <div className="testimonial-box">
	                <figure><img src="/Images/client.jpg" alt="" title="" /></figure>
					<h4>Yercud, Munar Mysore</h4>
	                <div className="content">
						<p>3There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.</p>
	                </div>
					<h5>Name</h5>
	              </div>
	            </div>
	            <div className="post-slide">
	              <div className="testimonial-box">
	                <figure><img src="/Images/client.jpg" alt="" title="" /></figure>
					<h4>Yercud, Munar Mysore</h4>
	                <div className="content">
						<p>4There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.</p>
	                </div>
					<h5>Name</h5>
	              </div>
	            </div>
            </Carousel>
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
