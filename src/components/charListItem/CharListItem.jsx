import React from 'react'
import PropTypes from 'prop-types'
import './charListItem.scss'
import { CSSTransition } from 'react-transition-group'

export default function CharListItem({
   id,
   name,
   thumbnail,
   imgStyle,
   onCharSelected,
}) {
   return (
      <li
         className="char__item"
         tabIndex={0}
         onClick={() => onCharSelected(id)}
         onFocus={() => onCharSelected(id)}
      >
         <img src={thumbnail} alt={thumbnail} style={imgStyle} />
         <div className="char__name">{name}</div>
      </li>
   )
}
CharListItem.propTypes = {
   onCharSelected: PropTypes.func,
}
