import './comicsList.scss'
import { useEffect, useState } from 'react'
import useMarvelService from '../../services/MarvelService'
import ErrorMessage from '../errorMessage/ErrorMessage'
import Spinner from '../spinner/Spinner'
import ComicsListItem from '../comicsListItem/ComicsListItem'

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

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([])
  const [newItemLoading, setNewItemLoading] = useState(false)
  const [offset, setOffset] = useState(250)
  const [charEnded, setCharEnded] = useState(false)

  const { getAllComics, process, setProcess } = useMarvelService()

  useEffect(() => {
    onRequest(offset, true)
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true)

    getAllComics(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'))
  }

  const onCharListLoaded = (newComicList) => {
    let ended = false
    if (newComicList < 8) {
      ended = true
    }

    setComicsList((preComicList) => [...preComicList, ...newComicList])
    setNewItemLoading(false)
    setOffset((preOffset) => preOffset + 8)
    setCharEnded(ended)
  }

  const comicsItems = (
    <ul className='comics__grid'>
      {comicsList.map((el, i) => {
        let imgStyle = { objectFit: 'cover' }
        if (
          el.thumbnail ===
          'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
        ) {
          imgStyle = { objectFit: 'unset' }
        }
        return <ComicsListItem key={i} {...el} imgStyle={imgStyle} />
      })}
    </ul>
  )

  return (
    <div className='comics__list'>
      {setContent(process, () => comicsItems, newItemLoading)}
      <ul className='comics__grid'></ul>
      <button
        className='button button__main button__long'
        disabled={newItemLoading}
        style={{ display: charEnded ? 'none' : 'block' }}
        onClick={() => onRequest(offset)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  )
}

export default ComicsList
