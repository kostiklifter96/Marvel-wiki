import ComicsList from '../comicsList/ComicsList'
import AppBanner from '../appBanner/AppBanner'

import React from 'react'
import { Helmet } from 'react-helmet'

export default function ComicsPage() {
   return (
      <>
         <Helmet>
            <meta name="description" content="Marvel information portal" />
            <title>Page with list of our comics</title>
         </Helmet>
         <AppBanner />
         <ComicsList />
      </>
   )
}
