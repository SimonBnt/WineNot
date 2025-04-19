import React, { useState } from "react"
import LobbyNoModal from "./LobbyNoModal"
import Cave from "./Cave"
import UserSideHeader from "./UserSideHeader"
import Slider from "./Slider"

const BackShop = () => {
    const [showLobby, setShowLobby] = useState(false)
    const [showCave, setShowCave] = useState(false)
    const [showSlider, setShowSlider] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("")

    const [lobbyQuickAcessIsClicked, setLobbyQuickAcessIsClicked] = useState(false)
    const [caveQuickAcessIsClicked, setCaveQuickAcessIsClicked] = useState(false)

    const backShopIsOpen = localStorage.getItem("backShopIsOpen")
    const caveIsOpen = localStorage.getItem("caveIsOpen")
    const lobbyIsOpen = localStorage.getItem("lobbyIsOpen")

    if (backShopIsOpen === "false") {
        localStorage.setItem("backShopIsOpen", "true")
    }

    if (lobbyIsOpen === "true") {
        localStorage.setItem("lobbyIsOpen", "false")
    }

    if (caveIsOpen === "true") {
        localStorage.setItem("caveIsOpen", "false")
    }

    const showLobbyHandleClick = () => {
        setShowLobby(true)
        localStorage.setItem("backShopIsOpen", "false")
        localStorage.setItem("caveIsOpen", "false")
        localStorage.setItem("lobbyIsOpen", "true")
    }

    const showCaveHandleClick = () => {
        setShowCave(true)
        localStorage.setItem("backShopIsOpen", "false")
        localStorage.setItem("caveIsOpen", "true")
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

    const caveQuickAcessIsClickedHandleClick = () => {
        setCaveQuickAcessIsClicked(true)
    }

    return (
            <>
                {showLobby || lobbyQuickAcessIsClicked ? (
                    <LobbyNoModal />
                ) : showCave || caveQuickAcessIsClicked ? (
                    <Cave />
                ) : (
                    <div id="backShopContent">
                    
                        {/* HEADER */}

                        <UserSideHeader
                            country={selectedCountry}
                            lobbyQuickAcessIsClickedHandleClick={lobbyQuickAcessIsClickedHandleClick}
                            caveQuickAcessIsClickedHandleClick={caveQuickAcessIsClickedHandleClick}
                        />

                        {/* SLIDERS MODAL CONTAINER */}

                        <div id="sliderModalContainer">{showSlider && <Slider country={selectedCountry} closeSliderHandleClick={closeSliderHandleClick} />}</div>

                        {/* SLIDERS OPENERS */}

                        <div className="slidersOpeners" id="backshopSliderOpener1" title="Ouvre le catalogue des vins d'Europe de l'Est" onClick={() => showSliderHandleClick("Europe de l'Est")}></div>
                        <div className="slidersOpeners" id="backshopSliderOpener2" title="Ouvre le catalogue des vins des pays du nouveau monde" onClick={() => showSliderHandleClick("Pays du monde")}></div>
                        <div className="slidersOpeners" id="backshopSliderOpener3" title="Ouvre le catalogue des vins d'Amerique" onClick={() => showSliderHandleClick("Amerique")}></div>
                        
                        {/* BACKSHOP BACKGROUND */}

                        <img id="backShopBackground" className="background" src="assets/img/backshop_background.jpg" /> 

                        {/* LOBBY OPENER */}

                        <div id="lobbyReturner" onClick={showLobbyHandleClick}></div>

                        {/* CAVE OPENER */}

                    <div id="caveOpener" onClick={showCaveHandleClick}></div>
                </div>
            )}
        </>
    )
}

export default BackShop