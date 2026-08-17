import './SocialIcons.css'
import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

const SocialIcons = () => {
  return (
      <div className="social-icons-container">
      <h1>SHOP.CO</h1>

      <p>
        We have clothes that suits your style and which you're proud to wear.
        From women to men.
      </p>

      <div className="social-icons">
        <a href="#"><FaTwitter /></a>
        <a href="#" id="faceboock"><FaFacebookF /></a>
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaGithub /></a>
      </div>
    </div>

  )
}

export default SocialIcons
