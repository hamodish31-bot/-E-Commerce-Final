import './Newsletter.css' 
import { MdOutlineMail } from "react-icons/md";
const Newsletter = () => {
  return (
   <div className="newsletter">

      <h2>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
   <div className="newsletter-form">
  <div className="input-wrapper">
    <MdOutlineMail className="mail-icon" />
    <input
      type="email"
      placeholder="Enter your email address"
    />
  </div>
  <button>Subscribe to Newsletter</button>
</div>
    </div>
  )
}

export default Newsletter
