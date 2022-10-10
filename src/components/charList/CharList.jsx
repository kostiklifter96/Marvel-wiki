import { useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './charList.scss'
import CharListItem from '../charListItem/CharListItem'
import useMarvelService from './../../services/MarvelService'

const CharList = (props) => {
   const [charList, setCharlist] = useState([])
   const [newItemLoading, setNewItemLoading] = useState(false)
   const [offset, setOffset] = useState(250)
   const [charEnded, setCharEnded] = useState(false)

   const { loading, error, getAllCharacters } = useMarvelService()

   useEffect(() => {
      onRequest(offset, true)
   }, [])

   const onRequest = (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true)

      getAllCharacters(offset).then(onCharListLoaded)
   }

   const onCharListLoaded = (newCharList) => {
      let ended = false
      if (newCharList < 9) {
         ended = true
      }

      setCharlist((preCharList) => [...preCharList, ...newCharList])
      setNewItemLoading(false)
      setOffset((preOffset) => preOffset + 9)
      setCharEnded(ended)
   }

   const charItem = (
      <TransitionGroup className="char__grid" component={'ul'} appear={true}>
         {charList.map((el) => {
            let imgStyle = { objectFit: 'cover' }
            if (
               el.thumbnail ===
               'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            ) {
               imgStyle = { objectFit: 'unset' }
            }
            return (
               <CSSTransition
                  key={el.id}
                  timeout={1000}
                  classNames="char__item"
               >
                  <CharListItem
                     key={el.id}
                     {...el}
                     imgStyle={imgStyle}
                     onCharSelected={() => props.onCharSelected(el.id)}
                  />
               </CSSTransition>
            )
         })}
      </TransitionGroup>
   )

   const errorMessage = error ? <ErrorMessage /> : null
   const spinner = loading && !newItemLoading ? <Spinner /> : null

   return (
      <div className="char__list">
         {errorMessage}
         {spinner}
         {charItem}
         <button
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{ display: charEnded ? 'none' : 'block' }}
            onClick={() => onRequest(offset)}
         >
            <div className="inner">load more</div>
         </button>
         ''
      </div>
   )
}

export default CharList
