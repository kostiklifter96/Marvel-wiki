import './404.scss'
import { Link } from 'react-router-dom'
import ErrorMessage from '../../errorMessage/ErrorMessage'

export default function Page404() {
   return (
      <div>
         <ErrorMessage />
         <p className="page__info">Page doesn't exist</p>
         <Link className="page__home" to="/">
            Back to main page
         </Link>
      </div>
   )
}
