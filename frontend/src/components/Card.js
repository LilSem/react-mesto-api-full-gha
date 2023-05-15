import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function Card({card, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = (card.owner._id || card.owner) === currentUser._id;
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    function handleClick() {
        onCardClick(card);
    }

    function handleCardLike (){
        onCardLike(card, isLiked);
    }

    function handleCardDelete (){
        onCardDelete(card);
    }

    return (
        <article className="cards__item">
            {isOwn && (
                <button
                    onClick={handleCardDelete}
                    className="cards__btn-remove"
                    type="button"
                    aria-label="Удалить"/>
            )}
            <img onClick={handleClick} className="cards__image" src={card.link} alt={card.name}/>
            <div className="cards__description">
                <h2 className="cards__place">{card.name}</h2>
                <div className="cards__like-container">
                    <button
                        onClick={handleCardLike }
                        className={`cards__btn-like ${isLiked && "cards__btn-like_active"}`}
                        type="button"
                        aria-label="Поставить лайк"/>
                    <span className="cards__counter">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}

export default Card;