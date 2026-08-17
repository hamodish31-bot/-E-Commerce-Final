import React from 'react'
import { Link } from 'react-router-dom'
import './BreadCrumb.css'

const BreadCrumb = ({items = []}) => {
  return (
    <nav  className='breadcrumb'>
        {items.map((item, index) => {
            const isLast = index === items.length - 1
            const label = typeof item === 'object' ? item.label : item
            const link = typeof item === 'object' ? (item.link || item.Link) : '#'
            return(
                <span key={index} className='breadcrumb-item'>
                    {isLast ? ( <span className='current'>{label}</span>) : (<Link to={link}>{label}</Link>)}
                    {!isLast && <span className='separator'> {">"} </span>}
                </span>
            )
        })}
      
    </nav>
  )
}

export default BreadCrumb
