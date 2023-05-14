
function InfoTooltip ({onClose, isOpen, name, isSuccess}){
    const successMessage = "Вы успешно зарегистрировались!";
    const errorMessage = "Что-то пошло не так! Попробуйте ещё раз.";

    return (
        <div onClick={onClose} className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__btn-close" type="button" aria-label="Close"></button>
                <form onClick={event => event.stopPropagation()} className={`form form_${name}`}
                      name={name} noValidate>
                    <div className="form__wrapper">
                        <span className={`form__error-icon ${isSuccess ? "form__error-icon_type_success" : "form__error-icon_type_error"}`}/>
                        <h2 className="form__message">{isSuccess ? successMessage : errorMessage}</h2>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default InfoTooltip;