import React, { useEffect, useState } from "react"
import LegalNotice from "./LegalNotice.jsx"

const UserSideHeader = ({country, backShopQuickAcessIsClickedHandleClick, caveQuickAcessIsClickedHandleClick, lobbyQuickAcessIsClickedHandleClick}) => {
    const [showLegalNotice, setShowLegalNotice] = useState(false)

    const sliderIsOpen = localStorage.getItem("sliderIsOpen")
    const backShopIsOpen = localStorage.getItem("backShopIsOpen")
    const caveIsOpen = localStorage.getItem("caveIsOpen")
    const lobbyIsOpen = localStorage.getItem("lobbyIsOpen")

    let title = "Le Bar"
    let article = ""

    if (sliderIsOpen === "true") {
        if (country && country === "France" || country === "Cave 1" || country === "Cave 2") {
            article = "de "
        } else if (country === "Portugal & Espagne") {
            article = "du "
        } else if (country === "Pays du monde" || country === "Vieux millesimes" || country === "Fonds de loge") {
            article = "des "
        } else {
            article = "d'"
        }
        title = country ? `Voici notre sélection de vin ${article}${country}` : "Le Bar"
    } else if (backShopIsOpen === "true") {
        title = "La Réserve"
    } else if (caveIsOpen === "true") {
        title = "La Cave"
    } else {
        title = "Le Bar"
    }

    const showLegalNoticeHandleClick = () => {
        setShowLegalNotice(true)
    }

    const closeLegalNoticeHandleClick = () => {
        setShowLegalNotice(false)
    }

    useEffect(() => {
        const burgerMenuOpener = document.getElementById("burgerMenuOpener")
        const burgerMenuCloser = document.getElementById("burgerMenuCloser")
        const burgerMenu = document.getElementById("burgerMenu")
        const legalNoticeContainer = document.getElementById("legalNoticeContainer")
        const legalNoticeOpener = document.getElementById("legalNoticeOpener")

        const openMb = () => {
            burgerMenuOpener.style.display = "none"
            burgerMenuCloser.style.display = "block"
            burgerMenu.style.display = "block"
        }

        const closeMb = () => {
            burgerMenuOpener.style.display = "block"
            burgerMenuCloser.style.display = "none"
            burgerMenu.style.display = "none"
        }

        burgerMenuOpener.addEventListener("click", openMb)
        burgerMenuCloser.addEventListener("click", closeMb)

        legalNoticeOpener.addEventListener("click", () => {
            closeMb()
            legalNoticeContainer.style.display = "block"
        })
        
        return () => {
            burgerMenuOpener.removeEventListener("click", openMb)
            burgerMenuCloser.addEventListener("click", closeMb)
        }
    }, [])

    return (
        <div id="userSideHeader">
            <div id="legalNoticeContainer">{showLegalNotice && <LegalNotice closeLegalNoticeHandleClick={closeLegalNoticeHandleClick}/>}</div>
            <img id="logo" src="assets/img/logo.png" alt="Logo"/>
            <h1 id="userSideHeaderTitle">{title}</h1>
            <div id="burgerMenuImgContainer">
                <div id="burgerMenuOpener" className="burgerMenuImg">
                    <img className="mbImg" src="/assets/img/mbOpener.png" alt="Icone de 'menu burger'"/>
                </div>
                <div id="burgerMenuCloser" className="burgerMenuImg">
                    <img className="mbImg"  src="/assets/img/mbCloser.png" alt="Icone de 'croix de fermeture'"/>
                </div>
            </div>
            <div id="burgerMenu">
                <ul>
                    {lobbyIsOpen === "true" && (
                        <>
                            <li className="quickAccess" onClick={backShopQuickAcessIsClickedHandleClick}>la réserve</li>
                            <li className="quickAccess" onClick={caveQuickAcessIsClickedHandleClick}>la cave</li>
                        </>
                    )}
                    {backShopIsOpen === "true" && (
                        <>
                            <li className="quickAccess" onClick={lobbyQuickAcessIsClickedHandleClick}>le bar</li>
                            <li className="quickAccess" onClick={caveQuickAcessIsClickedHandleClick}>la cave</li>
                        </>
                    )}
                    {caveIsOpen === "true" && (
                        <>
                            <li className="quickAccess" onClick={lobbyQuickAcessIsClickedHandleClick}>le bar</li>
                            <li className="quickAccess" onClick={backShopQuickAcessIsClickedHandleClick}>la réserve</li>
                        </>
                    )}
                    <li className="quickAccess" id="legalNoticeOpener" onClick={ showLegalNoticeHandleClick }>Mentions légales</li>
                </ul>
                {/* <div id="mbFooter">
                    <div>Conçu et developpé en 2024 par<a href="https://www.simonbenet.com" target="_blank" title="Lien vers le site simonbenet.com"> Simon Bénet</a>
                    </div>
                    <div>
                        Design et graphismes par <a href="" target="_blank" title=""> Paul Bénet</a>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default UserSideHeader