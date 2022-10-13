import { useEffect, useMemo, useState } from 'react'
import './charList.scss'
import CharListItem from '../charListItem/CharListItem'
import useMarvelService from './../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner />
    case 'confirmed':
      return <Component />
    case 'error':
      return <ErrorMessage />
    default:
      throw new Error('Unexrected process state')
  }
}

const CharList = (props) => {
  const [charList, setCharlist] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(250)
  const [charEnded, setCharEnded] = useState(false)

  const { getAllCharacters, process, setProcess } = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
    // eslint-disable-next-line
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)

    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'))
  }

  const onCharListLoaded = (newCharList) => {
    let ended = false
    if (newCharList < 9) {
      ended = true
    }

    setCharlist([...charList, ...newCharList])
    setNewItemLoading(false)
    setOffset(offset + 9)
    setCharEnded(ended)
  }

  const charItem = (
    <ul className='char__grid'>
      {charList.map((el, i) => {
        let imgStyle = { objectFit: 'cover' }

        if (
          el.thumbnail ===
          'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ) {
          imgStyle = { objectFit: 'unset' }
        }

        return (
          <CharListItem
            key={el.id}
            {...el}
            imgStyle={imgStyle}
            onCharSelected={() => props.onCharSelected(el.id)}
          />
        )
      })}
    </ul>
  )

  const element = useMemo(() => {
    return setContent(process, () => charItem, newItemLoading)
    // eslint-disable-next-line
  }, [charList])

  return (
    <div className='char__list'>
      {element}
      <button
        className='button button__main button__long'
        disabled={newItemLoading}
        style={{
          display: charEnded ? 'none' : 'block',
        }}
        onClick={() => onRequest(offset)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  )
}

export default CharList
