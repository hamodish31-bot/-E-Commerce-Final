import './Hero.css'
import HeroText from './HeroText/HeroText'
import { Link } from 'react-router-dom'

const Hero = () => {

    let HeroTexts = [
    {
        id : 1,
        title: "200+",
        paragraph: "International Brands"
    }
    ,
    {
        id : 2,
        title: "2,000+",
        paragraph: "High-Quality Products"
    }
    ,
    {
        id : 3,
        title: "30,000+",
        paragraph: "Happy Customers"
    }
    ] 
  return (
    <section className='hero'>
        <div className='hero-header'>
            <div className='hero-left'>
      <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
      <h4>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</h4>
      <button><Link to="/Category" className='Shop-now'>Shop Now</Link></button>
        <div className='HeroTexts'>
        {
            HeroTexts.map((Text, index) => {
            return (
                <HeroText title={Text.title} paragraph={Text.paragraph} index={index} />
        )
            })
        }
        </div>
      </div>
      <div className='hero-right'>
        <img src="/images/Img1.png" alt="" className='img1' />
        <img src="/images/Img2.png" alt="" className='img2' />
        <img src="/images/Img3.png" alt="" className='img3' />
      </div>
      <div className='hero-middle'>
        <img src="./images/Vimg.png" alt="" className='vimg'/>
        <img src="./images/Zimg.png" alt="" className='zimg'/>
        <img src="./images/Gimg.png" alt="" className='gimg'/>
        <img src="./images/Pimg.png" alt="" className='pimg'/>
        <img src="./images/Cimg.png" alt="" className='cimg'/>
      </div>
      </div>
    </section>
  )
}

export default Hero
