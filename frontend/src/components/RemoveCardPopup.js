import PopupWithForm from "./PopupWithForm.js";

function RemoveCardPopup ({isOpen, onClose, onSubmit, isRenderer}){

function handleSubmit(event){
    event.preventDefault();
    onSubmit();
}

    return(
        <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            btnText="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isRenderer={isRenderer}
            isValid={true}
        />
    );
}

export default RemoveCardPopup;