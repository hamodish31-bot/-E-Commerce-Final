import React from 'react'
import NewArrival from '../Components/HomePage/NewArrival/NewArrival'
import TopSelling from '../Components/HomePage/TopSelling/TopSelling'
import Hero from '../Components/HomePage/Hero/Hero'
import HomeBrowse from '../Components/HomePage/HomeBrowse/HomeBrowse'
import Customers from "../Components/SharedComponents/Customers/Customers"
const Home = () => {
  return (
  <div>
    <Hero />
    <NewArrival />
    <hr style={{ border: '1px solid #00000010', width: '86%' , margin: 'auto' }} />
    <TopSelling />
    <HomeBrowse />
    <Customers />
  </div>
  )
}

export default Home
