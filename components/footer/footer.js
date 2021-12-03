import React from 'react';
import Image from 'next/image'

export const Footer = () => {
    return (
        <>
        <div className="places-sec">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <ul>
                            <li><strong>Treding Hotel Cities:</strong></li>
                            <li><a href="#">Treding Hotel Cities:</a></li>
                            <li><a href="#">Hotels in Delhi</a></li>
                            <li><a href="#">Hotels in Goa</a></li>
                            <li><a href="#">Hotels in Bangalore</a></li>
                            <li><a href="#">Hotels in Srinagar</a></li>
                            <li><a href="#">Hotels in Jaipur</a></li>
                            <li><a href="#">Hotels in Chenai</a></li>
                            <li><a href="#">Hotels in Gurgaon</a></li>
                            <li><a href="#">Hotels in Mumbai</a></li>
                            <li><a href="#">Hotels in Manali</a></li>
                            <li><a href="#">Hotels in Hydrabad</a></li>
                        </ul>
                        <ul>
                            <li><strong>Top Destination :</strong></li>
                            <li><a href="#">Yercuad</a></li>
                            <li><a href="#">Salem</a></li>
                            <li><a href="#">Munnar</a></li>
                            <li><a href="#">Udumalpet</a></li>
                            <li><a href="#">Thekkady</a></li>
                            <li><a href="#">Mysuru</a></li>
                        </ul>
                        <ul>
                            <li><strong>Top Searched Routes:</strong></li>
                            <li><a href="#">Delhi to Munnar</a></li>
                            <li><a href="#">Delhi to Shirdi</a></li>
                            <li><a href="#">Mumbaito Katra</a></li>
                            <li><a href="#">Hyderabad to Ajmer</a></li>
                            <li><a href="#">Chennai to Darjeeling</a></li>
                            <li><a href="#">Bangalore to Leh</a></li>
                            <li><a href="#">Gurgaon to Gangtok</a></li>
                            <li><a href="#">Delhi to Dwarka</a></li>
                            <li><a href="#">Kolkata to Alleppey</a></li>
                            <li><a href="#">Mumbai to Puri</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <footer className="site-footer">
        <div className="footer-top">
            <div className="container">
            <div className="row">
                <div className="col-md-3">
                <div className="widget"> 
                {/* <Image src="../assets/Images/logo-white.png" className="m-b15" alt="" width="180" /> */}
                    <p className="text-capitalize m-b20">Bringing affordable and trusted accommodation that guests can book instantly.</p>
                    <div className="subscribe-form m-b20">
                    <form className="dzSubscribe" action="script/mailchamp.php" method="post">
                        <div className="dzSubscribeMsg"></div>
                        <div className="input-group">
                        <input name="dzEmail" required="required" className="form-control" placeholder="Your Email Address" type="email" />
                        <span className="input-group-btn">
                        <button name="submit" value="Submit" type="submit" className="site-button radius-xl">Subscribe</button>
                        </span> </div>
                    </form>
                    </div>
                    <ul className="list-inline m-a0">
                    <li><a href="#" className="site-button facebook circle "><i className="fa fa-facebook"></i></a></li>
                    <li><a href="#" className="site-button google-plus circle "><i className="fa fa-google-plus"></i></a></li>
                    <li><a href="#" className="site-button linkedin circle "><i className="fa fa-linkedin"></i></a></li>
                    <li><a href="#" className="site-button instagram circle "><i className="fa fa-instagram"></i></a></li>
                    <li><a href="#" className="site-button twitter circle "><i className="fa fa-twitter"></i></a></li>
                    </ul>
                </div>
                </div>
                <div className="col-md-6">
                <div className="widget border-0">
                    <h5 className="m-b30 text-white">Site Information</h5>
                    <ul className="list-2 list-line">
                    <li><a href="#">Hotel</a></li>
                    <li><a href="#">For Employers</a></li>
                    <li><a href="#">Account</a></li>
                    <li><a href="#">Restaurant </a></li>
                    <li><a href="#">Meet the Team</a></li>
                    <li><a href="#">Legal</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Community</a></li>
                    <li><a href="#">Feedback</a></li>
                    <li><a href="#">Affiliate Program</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Rewards</a></li>
                    </ul>
                </div>
                </div>
                <div className="col-md-3">
                <div className="footer-address">
                    <h5 className="m-b30 text-white">Contact us</h5>
                    <ul>
                    <li><i className="fa fa-map-marker" aria-hidden="true"></i><strong>Address:</strong><br/>
                        101,Sengupta st, Ram nagar, Coimbatore- 641009</li>
                    <li><i className="fa fa-mobile" aria-hidden="true"></i><strong>Phone:</strong><br/>
                        91 733 00 777 44 / <br/>
                        91 733 00 222 77 (24/7 Support)</li>
                    <li><i className="fa fa-envelope" aria-hidden="true"></i><strong>Email:</strong><br/>
                        reservations@roomsonmytravel.in</li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="footer-bottom">
            <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center  "><span className="fbottom-like">© 2021 | ROMT - Rooms On My Travel</span></div>
            </div>
            </div>
        </div>
        </footer>

        </>
    )
}
