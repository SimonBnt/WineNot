import React, { useState, useEffect } from "react"

const Slider = ({ closeSliderHandleClick, country }) => {
    const [fetchedData, setFetchedData] = useState(null)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [loadingDots, setLoadingDots] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        const intervalId = setInterval(() => {
            setLoadingDots(loadingDots => {
                if (loadingDots === '...') {
                    return ''
                } else {
                    return loadingDots + '.'
                }
            })
        }, 200)

        fetch("/wine")
            .then(response => response.json())
            .then(data => {
                if (data.regions && Array.isArray(data.regions)) {
                    setFetchedData(data)
                    setCurrentSlideIndex(Object.fromEntries(data.regions.map(region => [region.id, 0])))
                } else {
                    setError("Aucune Régions trouvées.")
                    setFetchedData({ countries: [], regions: [], wines: [] })
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError('Error fetching data');
            })

            return () => clearInterval(intervalId)
    }, [])

    if (!fetchedData) {
        return <div className="loading">Chargement{loadingDots}</div>
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    const { countries, regions, wines } = fetchedData

    const sliderCountry = countries.find(c => c.name === country) || { id: null }
    const sliderRegionList = regions.filter(region => region.countryId === sliderCountry.id)
    const sliderWineList = sliderRegionList.flatMap(region => wines.filter(wine => wine.regionId === region.id))

    const shelfImgSrc = {
        France: "assets/img/shelfImgFrance.jpg",
        Italie: "assets/img/shelfImgItalia.jpg",
        "Portugal & Espagne": "assets/img/shelfImgSpain.jpg",
        Amerique: "assets/img/shelfImgSouthAmerica.jpg",
        "Pays du monde": "assets/img/shelfImgAustralia.jpg",
        "Europe de l'Est": "assets/img/shelfImgEastEurope.jpg",
        "Vieux millesimes": "assets/img/shelfImgCave1.jpg",
        "Fonds de loge": "assets/img/shelfImgCave2.jpg",
        default: "assets/img/shelfImg.png",
    }

    const selectedShelfImgSrc = shelfImgSrc[country] || shelfImgSrc.default

    const showPreviousCard = (regionId) => {
        setCurrentSlideIndex(prevState => {
            const newIndex = Math.max(0, prevState[regionId] - 1)
            return {
                ...prevState,
                [regionId]: newIndex
            }
        })
    }
    
    const showNextCard = (regionId) => {
        setCurrentSlideIndex(prevState => {
            const newIndex = Math.min(prevState[regionId] + 1, sliderWineList.filter(wine => wine.regionId === regionId).length - 1)
            return {
                ...prevState,
                [regionId]: newIndex
            }
        })
    }

    return (
        <div id="sliderBackground">
            <div id="sliderModalContent">
                <div id="sliderCloser" onClick={closeSliderHandleClick}>x</div>
                <div id="shelfContainer">
                        <div id="shelf">
                            <img id="shelfImg" src={selectedShelfImgSrc} alt="shelf" />
                            <div id="shelfCountryName">{country}</div>
                        </div>
                </div>
                <div id="slidersMainContainer">
                    {sliderRegionList.map((region) => (
                        <div className="sliderContainer" key={region.id}>
                            {sliderWineList.filter(wine => wine.regionId === region.id).map((wine, index, array) => (
                                <div className="slider" key={wine.id} style={{ display: index === currentSlideIndex[region.id] ? "flex" : "none" }}>
                                    {index !== 0 && (
                                        <img className="sliderNavigationImg" id="leftSliderNavigation" src="assets/img/left.png" alt="left" onClick={() => showPreviousCard(region.id)} />
                                    )}
                                    <div className="sliderContentContainer">
                                        <div className="sliderLeftContainer">
                                            <div className="regionContainer">{region.name}</div>
                                            <div className="typeAndPriceContainer">
                                                <div className="typeContainer">{wine.title1}</div>
                                                <div className="priceContainer">
                                                    <div>{wine.price}</div>
                                                    <div> €</div>
                                                </div>
                                            </div>
                                            <div className="dateAndNameContainer">
                                                <div className="dateContainer">{wine.date}</div>
                                                <div className="nameContainer">{wine.title2}</div>
                                            </div>
                                            <div className="descriptionContainer">{wine.description}</div>
                                        </div>
                                            <div className="sliderRightContainer">
                                                <div className="wineBottlePadding">
                                                    <img src={`assets/upload/wineImg/${wine.image}`} className="sliderWineImg" alt="img d'une bouteille de vin" />
                                                </div>
                                            </div>
                                    </div>
                                    {index !== array.length - 1 && (
                                        <img className="sliderNavigationImg" id="rightSliderNavigation" src="assets/img/right.png" alt="right" onClick={() => showNextCard(region.id)} />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Slider