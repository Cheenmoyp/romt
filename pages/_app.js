import '../styles/globals.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';  
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import '../styles/Home.module.css';
import '../public/css/romt.css';
import '../public/css/aos.css';
import '../public/css/owl.carousel.min.css';
import '../public/css/owl.theme.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Component {...pageProps} />
 
  </>
  )
}

export default MyApp
