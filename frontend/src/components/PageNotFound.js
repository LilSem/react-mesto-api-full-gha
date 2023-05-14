import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <div className="container">
            <h1 className="form__title_theme_black">Страница не найдена</h1>
            <p className="form__question">
                Адрес введен не корректно.
                <Link className="form__sign-in-link form__sign-in-link_style_bold" to="/"> Перейти на главную</Link></p>
        </div>
    );
}

export default PageNotFound;