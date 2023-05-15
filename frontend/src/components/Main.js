import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import Card from "./Card.js";

function Main({onEditAvatar, onAddPlace, onEditProfile, onCardClick, onCardLike,onCardDelete, cards}) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div onClick={onEditAvatar}
                     className="profile__avatar-overlay"
                     style={{background: `url(${currentUser.avatar}) center/cover no-repeat`}}>
                </div>
                <div className="profile__wrapper">
                    <div className="profile__inner">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button onClick={onEditProfile} className="profile__btn-edit" type="button"
                                aria-label="Редактировать"></button>
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__btn-add" type="button"
                        aria-label="Добавить"></button>
            </section>
            <section className="cards">
                {
                      cards.map((card) =>
                        (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick ={onCardClick}
                                onCardLike = {onCardLike}
                                onCardDelete = {onCardDelete}
                            />
                        ))
                }
            </section>
        </main>
    );
}

export default Main;