import './charInfo.scss'
import React from 'react'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useMarvelService from './../../services/MarvelService'
import ErrorMessage from './../errorMessage/ErrorMessage'
import Spinner from './../spinner/Spinner'
import Skeleton from './../skeleton/Skeleton'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null)
  const [show, setShow] = useState(false)
  const { loading, error, getCharacters, clearError } = useMarvelService()

  useEffect(() => {
    updateChar()
  }, [charId])

  const updateChar = () => {
    if (!charId) {
      return
    }

    clearError()
    setShow(false)
    getCharacters(charId).then(onCharLoaded)
  }

  const onCharLoaded = (char) => {
    setChar(char)
    setShow(true)
  }

  const skeleton = char || loading || error ? null : <Skeleton />
  const errorMessage = error ? <ErrorMessage /> : null
  const spinner = loading ? <Spinner /> : null
  const content = !(loading || error || !char) ? <View char={char} /> : null

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}

      <CSSTransition timeout={1000} in={show} classNames="char" unmountOnExit>
        <>{content}</>
      </CSSTransition>
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char

  let imgStyle = { objectFit: 'cover' }
  if (
    thumbnail ===
    'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
  ) {
    imgStyle = { objectFit: 'unset' }
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics: </div>
      <ul className="char__comics-list">
        {!comics.length ? 'There is no comics with this character' : null}

        {comics.map((item, i) => {
          if (i > 9) {
            // eslint-disable-next-line
            return
          }

          return (
            <li className="char__comics-item" key={i}>
              <Link to={`/comics/${item.resourceURI.substring(43)}`}>
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo
