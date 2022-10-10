import React from 'react'
import { Link } from 'react-router-dom'

export default function ComicsListItem({ id, title, thumbnail }) {
   return (
      <li className="comics__item">
         <Link to={`/comics/${id}`}>
            <img src={thumbnail} alt="x-men" className="comics__item-img" />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">NOT AVAILABLE</div>
         </Link>
      </li>
   )
}
