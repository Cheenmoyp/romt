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
                            
                            <li><a  href={"/destination/WWVyY2F1ZA=="}>Hotels in Yercaud</a></li>
                            <li><a href={"/destination/TmFnYWx1cg=="}>Hotels in Nagalur</a></li>
                            <li><a href={"/destination/Q29pbWJhdG9yZQ=="}>Hotels in Coimbatore</a></li>
                            <li><a href={"/destination/VWR1bWFsYWlwZXR0YWk="}>Hotels in Udumalaipettai</a></li>
                            <li><a href={"/destination/TmFtYWtrYWw="}>Hotels in Namakkal</a></li>
                            <li><a href={"/destination/S29kYWlLYW5hbA=="}>Hotels in KodaiKanal</a></li>
                            <li><a href={"/destination/RGV2aWtvbGFt"}>Hotels in Devikolam</a></li>
                            <li><a href={"/destination/TXlzb3Jl"}>Hotels in Mysore</a></li>
                            <li><a href={"/destination/U2FsZW0="}>Hotels in Salem</a></li>
                            <li><a href={"/destination/RXJvZGU="}>Hotels in Erode</a></li>
                        </ul>
                        <ul>
                            <li><strong>Top Destination :</strong></li>
                            <li><a href={"/destination/Q29pbWJhdG9yZQ=="}>Coimbatore</a></li>
                            <li><a href={"/destination/U2FsZW0="}>Salem</a></li>
                            <li><a href={"/destination/WWVyY2F1ZA=="}>Yercaud</a></li>
                            <li><a href={"/destination/VWR1bWFsYWlwZXR0YWk="}>Udumalaipettai</a></li>
                            <li><a href={"/destination/S29kYWlLYW5hbA=="}>KodaiKanal</a></li>
                            <li><a href={"/destination/TXlzb3Jl"}>Mysore</a></li>
                        </ul>
                        <ul>
                            <li><strong>Top Searched Routes:</strong></li>
                            <li><a href={"/destination/Q29pbWJhdG9yZQ=="}>Delhi to Coimbatore</a></li>
                            <li><a href={"/destination/S29kYWlLYW5hbA=="}>Delhi to KodaiKanal</a></li>
                            <li><a href={"/destination/TXlzb3Jl"}>Mumbai to Mysore</a></li>
                            <li><a href={"/destination/S29kYWlLYW5hbA=="}>Hyderabad to KodaiKanal</a></li>
                            <li><a href={"/destination/Q29pbWJhdG9yZQ=="}>Kolkota to Coimbatore</a></li>
                            <li><a href={"/destination/TXlzb3Jl"}>Delhi to Mysore</a></li>
                            <li><a href={"/destination/S29kYWlLYW5hbA=="}>Gurgaon to KodaiKanal</a></li>
                            <li><a href={"/destination/U2FsZW0="}>Delhi to Salem</a></li>
                            <li><a href={"/destination/VWR1bWFsYWlwZXR0YWk="}>Kolkata to Udumalaipettai</a></li>
                            <li><a href={"/destination/TmFtYWtrYWw="}>Mumbai to Namakkal</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <footer className="site-footer">
        <div className="footer-top">
            <div className="container">
            <div className="row">
                <div className="col-md-5">
                <div className="widget"> 
                {/* <Image src="../assets/Images/logo-white.png" className="m-b15" alt="" width="180" /> */}
                    <p className="text-capitalize m-b20">Bringing affordable and trusted accommodation <br/>that guests can book instantly.</p>
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
                    <li><a href="https://www.facebook.com/romt.india" className="site-button facebook circle "><i className="fa fa-facebook"></i></a></li>
                    <li><a href=" https://www.youtube.com/channel/UCizYt_1APjQ1Mh3OmhWCmAg" className="site-button google-plus circle "><i className="fa fa-youtube-play"></i></a></li>  
                    <li><a href="https://t.me/romtindia" className="site-button linkedin circle "><i className="fa fa-telegram"></i></a></li>
                    <li><a href="https://www.instagram.com/romt.india/" className="site-button instagram circle "><i className="fa fa-instagram"></i></a></li>
                   
                    </ul>
                </div>
                </div>
                <div className="col-md-3">
                <div className="widget border-0">
                    <h5 className="m-b30 text-white">Site Information</h5>
                    <ul className="list-2 list-line">
							 <li><a href={"/privacy-policy"} className="site-button   ">Privacy Policy</a></li>
							<li><a href={"/terms-and-condition"} className="site-button  ">Terms & Conditions</a></li>
							 
                    </ul>
                </div>
                </div>
                <div className="col-md-4">
                <div className="footer-address">
                    <h5 className="m-b30 text-white">Contact us</h5>
                    <ul>
                  
                    <li><i className="fa fa-mobile" aria-hidden="true"></i><strong>Phone:</strong><br/>
                        82 200 267 77 
                        
                        {/* / <br/>
                        91 733 00 222 77 (24/7 Support) */}
                        
                        </li>
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
                <div className="col-lg-12 text-center  "><span className="fbottom-like">© 2022 | ROMT - Rooms On My Travel</span></div>
            </div>
            </div>
        </div>
        </footer>

        </>
    )
}
