import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import useMarvelService from '../../services/MarvelService'
import AppBanner from '../appBanner/AppBanner'
import setContent from '../../utils/setContent'

const SinglePage = ({ Component, dataType }) => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const { getComics, getCharacters, clearError, process, setProcess } =
    useMarvelService()

  useEffect(() => {
    updateData()
  }, [id])

  const updateData = () => {
    clearError()
    switch (dataType) {
      case 'comic':
        getComics(id)
          .then(onDataLoaded)
          .then(() => setProcess('confirmed'))
        break
      case 'character':
        getCharacters(id)
          .then(onDataLoaded)
          .then(() => setProcess('confirmed'))
        break
      default:
        throw new Error('Unexrected process state')
    }
  }

  const onDataLoaded = (data) => {
    setData(data)
  }

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  )
}

export default SinglePage
