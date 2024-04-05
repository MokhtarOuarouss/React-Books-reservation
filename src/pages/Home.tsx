import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='content'>
      <h1 className="title is-1 is-bigger is-bold is-light pt-60">
          Hello. I'am Mokhtar.
      </h1>

      <h3 className="subtitle is-5 is-light">
          Evaluation React Formation      </h3>
      <div className="buttons">

          <Link to="/user/add" className="button button-cta is-bold btn-align secondary-btn is-rounded raised">Add User</Link> 

          <Link to="/book/add" className="button button-cta is-bold btn-align white-btn is-rounded raised">Add Book</Link> 

          
      </div>

</div>
  )
}

export default Home