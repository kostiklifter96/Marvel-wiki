import React from 'react'
import PropTypes from 'prop-types'
import './charListItem.scss'

export default function CharListItem({
  i,
  id,
  name,
  thumbnail,
  imgStyle,
  onCharSelected,
  focusOnItem,
}) {
  return (
    <li
      className='char__item'
      tabIndex={0}
      onClick={() => onCharSelected(id)}
      onFocus={() => onCharSelected(id)}
    >
      <img src={thumbnail} alt={thumbnail} style={imgStyle} />
      <div className='char__name'>{name}</div>
    </li>
  )
}
CharListItem.propTypes = {
  onCharSelected: PropTypes.func,
}
