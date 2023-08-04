import { Link, NavLink, useNavigate } from 'react-router-dom';


export const Navbar = () => {

    const auth = localStorage.getItem('idToken');
    const navigate = useNavigate();
    const logout = () =>{
        localStorage.clear();
        navigate("/login");
    }

    return (
        <nav className="navbar main-navbar navbar-expand-sm p-3 justify-content-between">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                RecetasApp
            </Link>

            
            
            <div className="navbar navbar-expand-lg">
                <ul className="navbar-nav ml-auto navbar-links">
                    {
                    auth?
                    <>
                    <span className='nav-item nav-link user navbar-link'>
                        Belen
                    </span>
                    <button
                        className='nav-item nav-link btn navbar-link'
                        to="/login"
                        onClick={ logout }
                    >
                        Logout

                    </button>
                    </>
                    
                    :
                    <>
                    <NavLink 
                        className={({ isActive }) => `nav-item nav-link navbar-link ${ isActive ? 'active' : ''}`}
                        to="/login"
                    >
                        Login
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => `nav-item nav-link navbar-link ${ isActive ? 'active' : ''}`}
                        to="/register"
                    >
                        Sign up
                    </NavLink>
                    </>
                    }
                </ul>
            </div>
        </nav>
    )
}