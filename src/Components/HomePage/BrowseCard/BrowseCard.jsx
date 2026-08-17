import './BrowseCard.css'
const BrowseCard = ({ id, title, img }) => {
    return (

        <div className="browse-card" >
            <h2>{title}</h2>
            <img src={img}/>

        </div>
    )
}

export default BrowseCard
