import {useEffect} from "react";
import useFormAndValidation from "../hooks/useFormAndValidation.js";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({isOpen, onClose, onAddPlace, isRenderer}) {

    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

    useEffect(() => {
        resetForm();
    }, [isOpen]);

    function handleSubmit(event) {
        event.preventDefault();

        if (isValid) {
            onAddPlace(
                {
                    name: values.name,
                    link: values.link
                })
        }
    }

    return (
        <PopupWithForm
            name="card"
            title="Новое место"
            btnText="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isRenderer={isRenderer}
            isValid={isValid}>
            <input onChange={handleChange}
                   value={values.name || ""}
                   id="title-input"
                   className="form__input form__input_type_title"
                   type="text"
                   placeholder="Название"
                   name="name"
                   required minLength="2"
                   maxLength="30"/>
            <span
                className={`url-input-error form__input-error ${isValid && "form__input-error_active"}`}>{errors.name}</span>
            <input onChange={handleChange}
                   value={values.link || ""}
                   id="url-input"
                   className="form__input form__input_type_image-url"
                   type="url"
                   placeholder="Ссылка на картинку"
                   name="link"
                   required/>
            <span
                className={`url-input-error form__input-error ${isValid && "form__input-error_active"}`}>{errors.link}</span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;