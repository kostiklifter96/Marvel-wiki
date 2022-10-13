import './charInfo.scss'
import React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useMarvelService from './../../services/MarvelService'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import setContent from './../../utils/setContent'

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null)
  const { process, setProcess, getCharacters, clearError } =
    useMarvelService()

  useEffect(() => {
    updateChar()
  }, [charId])

  const updateChar = () => {
    if (!charId) {
      return
    }

    clearError()
    getCharacters(charId)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'))
  }

  const onCharLoaded = (char) => {
    setChar(char)
  }

  return (
    <div className='char__info'>{setContent(process, View, char)}</div>
  )
}

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data
  const [statusIn, setStatusIn] = useState(false)

  useEffect(() => {
    setStatusIn(true)
  }, [])

  let imgStyle = { objectFit: 'cover' }
  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'unset' }
  }

  return (
    <CSSTransition
      timeout={1000}
      in={statusIn}
      classNames='char'
      unmountOnExit
    >
      <>
        <div className='char__basics'>
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div>
            <div className='char__info-name'>{name}</div>
            <div className='char__btns'>
              <a href={homepage} className='button button__main'>
                <div className='inner'>homepage</div>
              </a>
              <a href={wiki} className='button button__secondary'>
                <div className='inner'>Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className='char__descr'>{description}</div>
        <div className='char__comics'>Comics: </div>
        <ul className='char__comics-list'>
          {!comics.length
            ? 'There is no comics with this character'
            : null}

          {comics.map((item, i) => {
            if (i > 9) {
              // eslint-disable-next-line
              return
            }

            return (
              <li className='char__comics-item' key={i}>
                <Link to={`/comics/${item.resourceURI.substring(43)}`}>
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </>
    </CSSTransition>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo
