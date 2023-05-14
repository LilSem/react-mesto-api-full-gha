function ImagePopup({name, card, isOpen, onClose}) {
    
    return (
        <div onClick={onClose}
             className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button onClick={onClose} className="popup__btn-close" type="button" aria-label="Close"></button>
                <figure onClick={event => event.stopPropagation()} className="figure">
                    <img src={card.link}
                         alt={card.name}
                         className="figure__preview"/>
                    <figcaption className="figure__description">{card.name}</figcaption>
                </figure>
            </div>
        </div>
    );
}

export default ImagePopup;