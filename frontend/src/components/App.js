import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import auth from "../utils/auth.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import Login from "./Login.js";
import Main from "./Main.js";
import PageNotFound from "./PageNotFound.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import RemoveCardPopup from "./RemoveCardPopup.js";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const [isRenderer, setIsRenderer] = useState(false);
    const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);

    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState({});
    const [userEmail, setUserEmail] = useState("");

    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);


    useEffect(() => {
        loggedIn &&
        api.getAllData()
            .then(([cardList, userData]) => {
                setCards(cardList);
                setCurrentUser(userData);
            })
            .catch(err => console.log(err));
    }, [loggedIn])

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            auth.checkToken(token)
                .then((data) => {
                    setLoggedIn(true);
                    setUserEmail(data.email);
                    navigate('/', {replace: true});
                })
                .catch(err => console.log(err));
        }
    }, [loggedIn])

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleConfirmationClick(card) {
        setSelectedCard(card)
        setIsConfirmationPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleTooltipPopupOpened(isSuccess) {
        setIsSuccessRegistration(isSuccess);
        setIsInfoTooltipPopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsPreviewPopupOpen(true);
    }

    function handleCardLike(card, isLiked) {
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((prevState) => prevState.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
            })
            .catch((error) => console.log(error));
    }

    function handleCardDelete() {
        setIsRenderer(true);
        api.removeCard(selectedCard)
            .then(() => {
                setCards((prevState) => prevState.filter((currentCard) => currentCard !== selectedCard));
                closeAllPopups();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsRenderer(false));
    }

    function handleUpdateUser({name, about}) {
        setIsRenderer(true);
        api.setUserInfo({name, about})
            .then((userInfo) => {
                setCurrentUser(userInfo);
                closeAllPopups();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsRenderer(false));
    }

    function handleUpdateAvatar({link}) {
        setIsRenderer(true);
        api.setAvatar({link})
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsRenderer(false));
    }

    function handleAddPlaceSubmit({name, link}) {
        setIsRenderer(true);
        api.sendCard({name, link})
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsRenderer(false));
    }

    function handleRegistration(values) {
        setIsRenderer(true);
        auth.register(values)
            .then(() => {
                handleTooltipPopupOpened(true);
                setTimeout(() => {
                    closeAllPopups()
                    navigate("/sign-in", {replace: true});
                }, 4000);
            })
            .catch(() => handleTooltipPopupOpened(false))
            .finally(() => setIsRenderer(false));
    }

    function handleLogin(values) {
        setIsRenderer(true);
        auth.authorize(values)
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setLoggedIn(true);
                    setUserEmail(values.identifier);
                    navigate('/', {replace: true});
                }
            })
            .catch(() => handleTooltipPopupOpened(false))
            .finally(() => setIsRenderer(false));
    }

    function handleSignOut() {
        if (localStorage.getItem('token')) {
            setLoggedIn(false);
            localStorage.removeItem('token');
        }
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsPreviewPopupOpen(false);
        setIsConfirmationPopupOpen(false);
        setIsInfoTooltipPopupOpen(false);
        setIsSuccessRegistration(false);
        setSelectedCard({});
    }

    return (
        <div className="App">

            <CurrentUserContext.Provider value={currentUser}>
                <Header userEmail={userEmail}
                        onSignOut={handleSignOut}
                        loggedIn={loggedIn}/>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute element={Main}
                                        loggedIn={loggedIn}
                                        onEditProfile={handleEditProfileClick}
                                        onAddPlace={handleAddPlaceClick}
                                        onEditAvatar={handleEditAvatarClick}
                                        onCardClick={handleCardClick}
                                        onCardLike={handleCardLike}
                                        onCardDelete={handleConfirmationClick}
                                        cards={cards}/>
                    }/>
                    <Route path="/sign-in"
                           element={<Login isRenderer={isRenderer} onLogin={handleLogin}/>}
                    />
                    <Route path="/sign-up"
                           element={<Register onRegistration={handleRegistration} isRenderer={isRenderer}/>}/>
                    <Route path="*"
                           element={<PageNotFound/>}/>
                </Routes>

                <Footer/>

                <InfoTooltip
                    isOpen={isInfoTooltipPopupOpen}
                    onClose={closeAllPopups}
                    isSuccess={isSuccessRegistration}/>

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    isRenderer={isRenderer}/>

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    isRenderer={isRenderer}/>

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    isRenderer={isRenderer}/>

                <RemoveCardPopup
                    isOpen={isConfirmationPopupOpen}
                    onClose={closeAllPopups}
                    onSubmit={handleCardDelete}
                    isRenderer={isRenderer}
                />

                <ImagePopup
                    name="preview"
                    description="Обновить аватар"
                    card={selectedCard}
                    isOpen={isPreviewPopupOpen}
                    onClose={closeAllPopups}/>

            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
