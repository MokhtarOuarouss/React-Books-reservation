import { Link } from 'react-router-dom'
import logo from '/logo_norsys.png'
const NavbarComponent = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-sm navbar-light" id="neubar">
            <div className="container">

            <Link to="/" className='Link'><img src={logo} height="60" /></Link> 

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <Link to="/" className='Link'></Link> 
            </button>
        
            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                    <Link to="/" className='Link'>Home</Link> 
                </li>
                <li className="nav-item">
                    <Link to="/book" className='Link'>books</Link> 
                </li>
                <li className="nav-item">
                    <Link to="/user" className='Link'>Users</Link> 
                </li>
                
                
                </ul>
            </div>
            </div>
    </nav>
  </div>
  )
}

export default NavbarComponent