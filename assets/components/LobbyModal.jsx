import React, { useState } from "react"

const LobbyModal = ({ modalIsOpenHandleClick }) => {
    const [isOpen, setIsOpen] = useState(true)

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            {isOpen && (
                <>
                    <div id="lobbyModal">
                        <div id="lobbyModalContent">
                            <img id="lobbyModalLogo" src="assets/img/logo.png" alt="logo"/>
                            <h2>Bienvenue sur notre carte des vins interactive</h2>
                            <p>1. Pour visualiser les vins de la carte, il vous suffit de cliquer sur les éléments du décor.</p>
                            <p>2. Pour naviguer dans les différents espaces, cliquez sur les accès trouvables dans le décor.</p>
                        </div>
                        <div id="lobbyModalBtn" onClick={() => { closeModal(); modalIsOpenHandleClick(); }}>Ok, j'ai compris !</div>
                    </div>
                </>
            )}
        </>
    )
}

export default LobbyModal