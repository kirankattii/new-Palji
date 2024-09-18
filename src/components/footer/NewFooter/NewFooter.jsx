import { Link } from 'react-router-dom'
import { assets } from '../../../assets/assets'
import styles from './NewFooter.module.css'
import { homeImg } from '../../../assets/home/home'

const NewFooter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        <div className={styles.logos}>
          <img src={assets.logo2} alt="" />
        </div>
        <div className={styles.links}>
          <div className={styles.social}>
            <Link>
              <img src={homeImg.insta} alt="" />
            </Link>

            <Link>
              <img src={homeImg.x} alt="" />
            </Link>
            <Link>
              <img src={homeImg.facebook} alt="" />
            </Link>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to={'/product'}>Products</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/Terms-Conditions">Terms & Conditions</Link>
          </nav>
        </div>
        <div className={styles.contact}>
          <a href="tel:+917901706000">+91 7901706000</a>
          <a href="tel:+91 9814367260">+91 9814367260</a>
          <a href="mailto:paljibakery@gmail.com">paljibakery@gmail.com</a>
        </div>
        <div className={styles.addresses}>
          <div>
            <address>4GV, Main Hambran Rd. Mayur Vihar,
              Dev Nagar, Ludhiana, Punjab 141027</address>
            <address>1236, Kailash Cinema Rd. Kailash Chowk,
              Civil Lines, Ludhiana, Punjab 141001</address>
            <address>5A, Sat Paul Mittal Rd. A - Block,
              Sarabha Nagar, Ludhiana, Punjab 141001</address>
          </div>
          <h2>LOCATE US</h2>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Copyright @ 2024 palji bakery, All rights reserved
        </p>
        <p> Designed & developed by <Link to={'https://www.pitamaas.com'}>Pitamaas</Link></p>
      </div>
    </div>
  )
}

export default NewFooter
