import PageWidthForm from "./PageWidthForm.js";

function Login({isRenderer, onLogin}) {

    function handleSubmit(event, values) {
        event.preventDefault();
        onLogin(values);
    }

    return (
        <PageWidthForm onSubmit={handleSubmit}
                       isRenderer={isRenderer}
                       title="Вход"
                       btnText="Войти"/>
    );
}

export default Login;