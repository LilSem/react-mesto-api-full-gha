import {useState} from "react";
import {Link, Route, Routes} from "react-router-dom";
import logo from "../images/header/logo-white.svg";
import NavBar from "./NavBar.js";

function Header({userEmail, onSignOut, loggedIn}) {
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);

    return (<>
        {isOpenNavbar && loggedIn && (<NavBar userEmail={userEmail} onSignOut={onSignOut}/>)}
        <header className="header">
            <Link to="/">
                <img src={logo} alt="Логотип сайта" className="header__logo"/>
            </Link>
                <Routes>
                    <Route
                        path="/sign-up"
                        element={<Link className="header__route" to="/sign-in">
                            Войти
                        </Link>}
                    />
                    <Route
                        path="/sign-in"
                        element={<Link className="header__route" to="/sign-up">
                            Регистрация
                        </Link>}
                    />
                    <Route
                        path="/"
                        element={
                        <>
                        <span
                            onClick={() => setIsOpenNavbar(!isOpenNavbar)}
                            className={`header__open-navbar-btn ${isOpenNavbar && "header__open-navbar-btn_type_close"}`}
                        />
                            <div className="header__information-container">
                                <p className="header__information">{userEmail}</p>
                                <Link className="header__route header__route_color_gray" onClick={onSignOut} to="/sign-in">
                                    Выйти
                                </Link>
                            </div>
                        </>
                    }
                    />
                    <Route
                        path="*"
                        element={<Link className="header__route" to="/">
                            На главную
                        </Link>}
                    />
                </Routes>
        </header>
    </>);
}

export default Header;