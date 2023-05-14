import {Link} from "react-router-dom";

function NavBar({userEmail, onSignOut}){
    return(
        <nav className="navbar">
            <p className="header__information">{userEmail}</p>
            <Link className="header__route header__route_color_gray" onClick={onSignOut} to="/sign-in">
                Выйти
            </Link>
        </nav>
    );
}

export default NavBar;