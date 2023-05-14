import {useContext, useEffect} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import useFormAndValidation from "../hooks/useFormAndValidation.js";
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({onClose, isOpen, onUpdateUser, isRenderer}) {

    const {values, handleChange, errors, isValid, setValues} = useFormAndValidation();
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setValues(currentUser)
    }, [currentUser, isOpen]);

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            btnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isRenderer={isRenderer}
            isValid={isValid}>
            <input id="name-input"
                   className="form__input form__input_type_name"
                   type="text"
                   placeholder="Имя"
                   name="name"
                   value={values.name || ""}
                   onChange={handleChange}
                   required
                   minLength="2"
                   maxLength="40"/>
            <span
                className={`url-input-error form__input-error ${isValid && "form__input-error_active"}`}>{errors.name}</span>
            <input id="about-input"
                   className="form__input form__input_type_about"
                   type="text"
                   placeholder="О себе"
                   name="about"
                   value={values.about || ""}
                   onChange={handleChange}
                   required
                   minLength="2"
                   maxLength="200"/>
            <span className={`url-input-error form__input-error ${isValid && "form__input-error_active"}`}>{errors.about}</span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;