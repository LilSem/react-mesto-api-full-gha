import {useEffect} from "react";
import useFormAndValidation from "../hooks/useFormAndValidation.js";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isRenderer}) {

    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

    useEffect(() => {
        resetForm();
    }, [isOpen]);


    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            link: values.link
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            btnText="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isRenderer={isRenderer}
            isValid={isValid}>
            <input
                onChange={handleChange}
                value={values.link || ""}
                id="link-input"
                className="form__input form__input_type_avatar-url"
                type="url"
                placeholder="Ссылка на аватар"
                name="link"
                required/>
            <span className={`url-input-error form__input-error ${isValid && "form__input-error_active"}`}>{errors.link}</span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;