import './HeroText.css'
const HeroText = ({title , paragraph , index}) => {
  return (
    <div className={`heroText ${index === 2 ? 'last-itme' : ''}`}>
      <h3>{title}</h3>
      <p>{paragraph}</p>
    </div>
  )
}

export default HeroText
