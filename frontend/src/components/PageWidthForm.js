import {PulseLoader} from "react-spinners";
import useFormAndValidation from "../hooks/useFormAndValidation.js";

function PageWidthForm({onSubmit, isRenderer, btnText, children, title}) {

    const {values, handleChange, errors, isValid} = useFormAndValidation();

    return (
        <div className="container">
            <form onSubmit={(event) => onSubmit(event, values)} className="form" noValidate>
                <h2 className="form__title form__title_theme_black">{title}</h2>
                <input
                    onChange={handleChange}
                    value={values.identifier || ""}
                    className={`form__input form__input_theme_black ${errors.identifier && "form__input-error_border_red"}`}
                    type="email"
                    placeholder="Email"
                    name="identifier"
                    required
                    autoComplete="on"/>
                <input
                    onChange={handleChange}
                    value={values.password || ""}
                    className={`form__input form__input_theme_black ${errors.password && "form__input-error_border_red"}`}
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    required
                    autoComplete="on"/>
                <button className="form__submit-btn form__submit-btn_theme_black" type="submit" disabled={!isValid}>
                    {
                        isRenderer ? (
                            <PulseLoader
                                color="#000"
                                size={11}/>
                        ) : btnText
                    }
                </button>
                {children}
            </form>
        </div>
    );
}

export default PageWidthForm;