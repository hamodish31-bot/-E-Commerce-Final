import './Footer.css'
import FooterBottom from './FooterBottom/FooterBottom'
import FooterLinks from './FooterLinks/FooterLinks'
import Newsletter from './Newsletter/Newsletter'
import SocialIcons from './SocialIcons/SocialIcons'
const Footer = () => {
  return (
<footer className="footer">
  <section className="footer-newsletter">
    <Newsletter />
  </section>

  <section className="footer-content">
    <div className="footer-socialicons">
      <SocialIcons />
    </div>

    <div className="footer-links">
      <FooterLinks />
    </div>
  </section>

  <div className="footer-bottom">
    <FooterBottom />
  </div>
</footer>
  )
}

export default Footer
