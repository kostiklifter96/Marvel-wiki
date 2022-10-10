import img from './error.gif'

export default function ErrorMessage() {
   //    return <img src={process.env.PUBLIC_URL + '/error.gif'} alt="" /> //? для обращения в папку public
   return (
      <img
         style={{
            display: 'block',
            width: '250px',
            height: '250px',
            objectFit: 'contain',
            margin: '0 auto',
         }}
         src={img}
         alt="Error"
      />
   )
}
