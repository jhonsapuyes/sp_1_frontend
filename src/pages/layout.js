import { Outlet, Link } from "react-router-dom";

const Layout = 
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/register">REGISTRARSE</Link>
          </li>
          <li>
            <Link to="/login">LOGIN</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  


export default Layout;