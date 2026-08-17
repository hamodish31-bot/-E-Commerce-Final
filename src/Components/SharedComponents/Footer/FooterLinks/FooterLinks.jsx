import './FooterLinks.css'

const FooterLinks = () => {
  return (
    <div className="footer-links-container">

    <div className="footer-column">
        <h2>COMPANY</h2>
        <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Works</a></li>
            <li><a href="#">Career</a></li>
        </ul>
    </div>

    <div className="footer-column">
        <h2>HELP</h2>
        <ul>
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Delivery Details</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
        </ul>
    </div>

    <div className="footer-column">
        <h2>FAQ</h2>
        <ul>
            <li><a href="#">Account</a></li>
            <li><a href="#">Manage Deliveries</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Payments</a></li>
        </ul>
    </div>

    <div className="footer-column">
        <h2>RESOURCES</h2>
        <ul>
            <li><a href="#">Free eBooks</a></li>
            <li><a href="#">Development Tutorial</a></li>
            <li><a href="#">How to - Blog</a></li>
            <li><a href="#">Youtube Playlist</a></li>
        </ul>
    </div>

    </div>
  )
}

export default FooterLinks
