import RandomChar from '../randomChar/RandomChar'
import CharList from '../charList/CharList'
import CharInfo from '../charInfo/CharInfo'
import decoration from '../../resources/img/vision.png'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'

import React, { useState } from 'react'
import CharSearchForm from '../charSearchForm/СharSearchForm'
import { Helmet } from 'react-helmet'

export default function MainPage() {
  const [selectedChar, setSelectedChar] = useState(null)

  const onCharSelected = (id) => {
    setSelectedChar(id)
  }

  return (
    <>
      <Helmet>
        <meta name='description' content='Marvel information portal' />
        <title>Marvel information portal</title>
      </Helmet>

      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>

      <div className='char__content'>
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>

      <img className='bg-decoration' src={decoration} alt='vision' />
    </>
  )
}
