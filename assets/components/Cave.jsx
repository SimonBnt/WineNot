import React, { useState } from "react"
import BackShop from "./BackShop"
import UserSideHeader from "./UserSideHeader"
import Slider from "./Slider"
import LobbyNoModal from "./LobbyNoModal"

const Cave = () => {
    const [showBackShop, setShowBackShop] = useState(false)
    const [showSlider, setShowSlider] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("")

    const [lobbyQuickAcessIsClicked, setLobbyQuickAcessIsClicked] = useState(false)
    const [backShopQuickAcessIsClicked, setBackShopQuickAcessIsClicked] = useState(false)

    const lobbyIsOpen = localStorage.getItem("lobbyIsOpen")
    const caveIsOpen = localStorage.getItem("caveIsOpen")
    const backShopIsOpen = localStorage.getItem("backShopIsOpen")

    if (caveIsOpen === "false") {
        localStorage.setItem("caveIsOpen", "true")
    }

    if (lobbyIsOpen === "true") {
        localStorage.setItem("lobbyIsOpen", "false")
    }

    if (backShopIsOpen === "true") {
        localStorage.setItem("backShopIsOpen", "false")
    }

    const showBackShopHandleClick = () => {
        setShowBackShop(true) // Set showBackShop to true when div is clicked
        localStorage.setItem("backShopIsOpen", "true")
        localStorage.setItem("caveIsOpen", "false")
    }

    const showSliderHandleClick = (country) => {
        setShowSlider(true)
        setSelectedCountry(country)
        localStorage.setItem("sliderIsOpen", "true")
    }

    const closeSliderHandleClick = () => {
        setShowSlider(false)
        localStorage.setItem("sliderIsOpen", "false")
    }

    // -- Quick access function -- //

    const lobbyQuickAcessIsClickedHandleClick = () => {
        setLobbyQuickAcessIsClicked(true)
    }

    const backShopQuickAcessIsClickedHandleClick = () => {
        setBackShopQuickAcessIsClicked(true)
    }

    return (
            <>
                {lobbyQuickAcessIsClicked ? (
                    <LobbyNoModal />
                ) : showBackShop || backShopQuickAcessIsClicked ? (
                    <BackShop /> 
                ) : (
                    <div id="caveContent">

                        {/* HEADER */}

                        <UserSideHeader
                            country={selectedCountry}
                            lobbyQuickAcessIsClickedHandleClick={lobbyQuickAcessIsClickedHandleClick}
                            backShopQuickAcessIsClickedHandleClick={backShopQuickAcessIsClickedHandleClick}
                        />

                        {/* SLIDERS MODAL CONTAINER */}

                        <div id="sliderModalContainer">{showSlider && <Slider country={selectedCountry} closeSliderHandleClick={closeSliderHandleClick} />}</div>

                        {/* SLIDERS OPENERS */}

                        <div className="slidersOpeners" id="caveSliderOpener1" title="Ouvre le catalogue des vieux millésimes" onClick={() => showSliderHandleClick("Vieux millesimes")}></div>
                        <div className="slidersOpeners" id="caveSliderOpener2" title="Ouvre le catalogue des fonds de loge" onClick={() => showSliderHandleClick("Fonds de loge")}></div>

                        {/* CAVE BACKGROUND */}

                        <img id="caveBackground" className="background" src="assets/img/cave_background.jpg" /> 

                        {/* BACKSHOP OPENER */}

                        <div id="backShopReturner" onClick={showBackShopHandleClick}></div>
                    </div>
                )}
        </>
    )
}

export default Cave