import {PulseLoader} from "react-spinners";

function PopupWithForm({onClose, name, title, children, btnText, isOpen, onSubmit, isRenderer, isValid}) {


    return (
        <div onClick={onClose} className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__btn-close" type="button" aria-label="Close"></button>
                <form onSubmit={onSubmit} onClick={event => event.stopPropagation()} className={`form form_${name}`}
                      name={name} noValidate>
                    <div className="form__wrapper">
                        <h2 className="form__title">{title}</h2>
                        {children}
                        <button className="form__submit-btn" type="submit" disabled={!isValid}>
                            {
                                isRenderer ? (
                                    <PulseLoader
                                        color="#fff"
                                        size={11}/>
                                ) : btnText
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;