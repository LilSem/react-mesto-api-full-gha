import {Link} from "react-router-dom";
import PageWidthForm from "./PageWidthForm.js";

function Register({onRegistration, isRenderer}) {

    function handleSubmit(event, values) {
        event.preventDefault();
        onRegistration(values);
    }

    return (
        <PageWidthForm onSubmit={handleSubmit}
                       isRenderer={isRenderer}
                       title="Регистрация"
                       btnText="Зарегистрироваться">

            <p className="form__question">
                Уже зарегистрированы?
                <Link className="form__sign-in-link" to="/sign-in"> Войти</Link>
            </p>
        </PageWidthForm>

    );
}

export default Register;