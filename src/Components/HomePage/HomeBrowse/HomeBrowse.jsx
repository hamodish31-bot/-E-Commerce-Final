import BrowseCard from '../BrowseCard/BrowseCard'
import './HomeBrowse.css'

const HomeBrowse = () => {
    let cards = [{
        id: 1,
        title: "cacual",
        img: "/images/cacual.png",

    }
        ,
    {
        id: 2,
        title: "Formal",
        img: "/images/image 13.png"


    },

    {
        id:3,
        title: "Party",
        img: "/images/party.png",

    }
    ,
    {
        id:4,
        title: "Gym",
        img: "/images/gym.png",


    }
    ]
return (
    <section className="home-browse">
        <h1>BROWSE BY DRESS STYLE</h1>
        <div className='browse-cards'>
            {cards.map(card => {
                return (
                    <BrowseCard key={card.id} title={card.title} img={card.img} />
                )
            })
            }
        </div>


    </section>
)
}

export default HomeBrowse
