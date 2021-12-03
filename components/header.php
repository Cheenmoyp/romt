<!doctype html>
<html lang="en">
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>ROMT</title>
<script src="js/jquery.min.js"></script>
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
<link rel="stylesheet" href="css/owl.carousel.min.css">
<link rel="stylesheet" href="css/owl.theme.min.css">
<link rel="stylesheet" href="css/romt.css">
<!-- Date Picker -->
<link href="css/datepicker.min.css" rel="stylesheet" type="text/css" />
<!-- Date Picker end-->
</head>
<body>
<header>
  <div className="container">
    <div className="row">
      <div className="col-md-2">
        <div className="logo"> <a href="index.php"> <img src="../assets/Images/ROMTlogosvg.svg" alt="" title=""/> </a> </div>
      </div>
      <div className="col-md-7">
        <div className="nav-con">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Destination </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4"> 
                          <span className="menu-heading">Destination By Places</span>
                          <ul className="nav flex-column">
                            <li className="nav-item"> <a className="nav-link active" href="destinations.php">Bangalore</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="destinations.php">Mumbai</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="destinations.php">Delhi</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="destinations.php">Jaipur</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="destinations.php">Pune</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="destinations.php">Chandigarh</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="destinations.php">Chennai</a> </li>
                          </ul>
                        </div>
                        <!-- /.col-md-4  -->
                        <div className="col-md-4">
                          <span className="menu-heading">Top Destinations</span>
                          <ul className="nav flex-column">
                            <li className="nav-item"> <a className="nav-link" href="#">Mysore</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Erode</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Bangolore</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Valparai</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Mysore</a> </li>
                          </ul>
                        </div>
                        <!-- /.col-md-4  -->
                        <div className="col-md-4">
                          <span className="menu-heading">By Packages</span>
                          <ul className="nav flex-column">
                            <li className="nav-item"> <a className="nav-link" href="#">Premium Resort</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Standard Resort</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Business & Leisure Hotel</a> </li>
                          </ul>
                        </div>
                        <!-- /.col-md-4  -->
                      </div>
                    </div>
                    <!--  /.container  -->
                  </div>
                </li>
                <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Hotels </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4"> 
                          <span className="menu-heading">Hotel By Places</span>
                          <ul className="nav flex-column">
                            <li className="nav-item"> <a className="nav-link active" href="hotel.php">Bangalore</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="hotel.php">Mumbai</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="hotel.php">Delhi</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="hotel.php">Jaipur</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="hotel.php">Pune</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="#">Chandigarh</a></li>
                              <li className="nav-item"> <a className="nav-link active" href="#">Chennai</a> </li>
                          </ul>
                        </div>
                        <!-- /.col-md-4  -->
                        <div className="col-md-4">
                          <span className="menu-heading">Top Hotels</span>
                          <ul className="nav flex-column">
                            <li className="nav-item"> <a className="nav-link" href="#">Mysore</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Erode</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Bangolore</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Valparai</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Mysore</a> </li>
                          </ul>
                        </div>
                        <!-- /.col-md-4  -->
                        <div className="col-md-4">
                          <span className="menu-heading">Hotels By Packages</span>
                          <ul className="nav flex-column">
                            <li className="nav-item"> <a className="nav-link" href="#">Premium Resort</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Standard Resort</a> </li>
                            <li className="nav-item"> <a className="nav-link" href="#">Business & Leisure Hotel</a> </li>
                          </ul>
                        </div>
                        <!-- /.col-md-4  -->
                      </div>
                    </div>
                    <!--  /.container  -->
                  </div>
                </li>
                <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Offers & Packages </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4"> 
                          <span className="menu-heading">ROMT Offers</span>
                          <ul className="nav flex-column">
                            <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Member Rate</a></li>
                            <li className="nav-item"> <a className="nav-link active" href="offers.php">Stay More, Save More</a></li>
                            <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Bed & Breakfast</a></li>
                            <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Plus</a></li>
                            <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Suites</a></li>
                            <li className="nav-item"> <a className="nav-link active" href="offers.php">ROMT Pride</a> </li>
                          </ul>
                        </div>
                        <!-- /.col-md-4  -->
                        <div className="col-md-4">
                          <span className="menu-heading">ROMT Packages</span>
                          <ul className="nav flex-column">
                            <li className="nav-item"> <a className="nav-link" href="package.php">Exclusive Packages</a></li>
                            <li className="nav-item"> <a className="nav-link" href="package.php">VIP Premiere Offer</a></li>
                            <li className="nav-item"> <a className="nav-link" href="package.php">Where Next Offer</a></li>
                            <li className="nav-item"> <a className="nav-link" href="package.php">Last Minute Escapes</a> </li>
                          </ul>
                        </div>
                        <!-- /.col-md-4  -->
                     
                      </div>
                    </div>
                    <!--  /.container  -->
                  </div>
                </li>
                <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="membership.php" > Membership </a>
                  
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="col-md-3">
        <div className="top-btn-group"> <a href="signIn.php" className="sign-in-btn"><i className="fa fa-sign-in" aria-hidden="true"></i> Sign In</a> <a href="#" className="join-us"><i className="fa fa-plus" aria-hidden="true"></i> Join Us</a> </div>
      </div>
    </div>
  </div>
</header>
