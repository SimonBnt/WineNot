import React, { useState } from "react"
import BackShop from "./BackShop.jsx"
import Slider from "./Slider.jsx"
import UserSideHeader from "./UserSideHeader.jsx"
import Cave from "./Cave.jsx"

const Lobby = () => {
    const [showBackShop, setShowBackShop] = useState(false)
    const [showSlider, setShowSlider] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("")

    const [backShopQuickAcessIsClicked, setBackShopQuickAcessIsClicked] = useState(false)
    const [caveQuickAcessIsClicked, setCaveQuickAcessIsClicked] = useState(false)

    const backShopIsOpen = localStorage.getItem("backShopIsOpen")
    const caveIsOpen = localStorage.getItem("caveIsOpen")
    const lobbyIsOpen = localStorage.getItem("lobbyIsOpen")

    if (lobbyIsOpen === "false") {
        localStorage.setItem("lobbyIsOpen", "true")
    }

    if (caveIsOpen === "true") {
        localStorage.setItem("caveIsOpen", "false")
    }

    if (backShopIsOpen === "true") {
        localStorage.setItem("backShopIsOpen", "false")
    }

    const showBackShopHandleClick = () => {
        setShowBackShop(true)
        localStorage.setItem("backShopIsOpen", "true")
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

    const backShopQuickAcessIsClickedHandleClick = () => {
        setBackShopQuickAcessIsClicked(true)
    }

    const caveQuickAcessIsClickedHandleClick = () => {
        setCaveQuickAcessIsClicked(true)
    }

    return (
            <>
            {caveQuickAcessIsClicked ? (
                <Cave />
            ) : (
                <>
                    {showBackShop || backShopQuickAcessIsClicked ? (
                        <BackShop />
                    ) : (
                        <>

                            {/* HEADER */}

                            <UserSideHeader
                                country={selectedCountry}
                                backShopQuickAcessIsClickedHandleClick={backShopQuickAcessIsClickedHandleClick}
                                caveQuickAcessIsClickedHandleClick={caveQuickAcessIsClickedHandleClick}
                            />

                            {/* SLIDERS MODAL CONTAINER */}

                            <div id="sliderModalContainer">{showSlider && <Slider country={selectedCountry} closeSliderHandleClick={closeSliderHandleClick} />}</div>

                            {/* SLIDERS OPENERS */}

                            <div className="slidersOpeners" id="lobbySliderOpener1" title="Ouvre le catalogue des vins Français" onClick={() => showSliderHandleClick("France")}></div>
                            <div className="slidersOpeners" id="lobbySliderOpener2" title="Ouvre le catalogue des vins Italiens" onClick={() => showSliderHandleClick("Italie")}></div>
                            <div className="slidersOpeners" id="lobbySliderOpener3" title="Ouvre le catalogue des vins du Portugal & Espagne" onClick={() => showSliderHandleClick("Portugal & Espagne")}></div>

                            {/* LOBBY BACKGROUND */}

                            <img id="lobbyBackground" className="background" src="/assets/img/lobby_background.jpg" alt="lobby_background" />

                            {/* BACKSHOP OPENER */}

                            <div id="backShopOpener" onClick={showBackShopHandleClick}></div>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default Lobby