import React, { useState }  from "react"

const LegalNotice = ( {closeLegalNoticeHandleClick} ) => {
    const [isOpen, setIsOpen] = useState(true)

    const closeLM = () => {
        setIsOpen(false)
    }

    return (
        <>
            <div id="legalNoticeContent">
                <h2>Mentions legales</h2>
                <div id="infoMainContainer">
                    <div id="infoContainer">
                        <h3>Directeur de publication :</h3>
                        <p>Monsieur <strong>Mike Gouverneur</strong></p>
                        <p>BE07.89.324.335</p>
                    </div>
                    <div id="infoContainer">
                        <h3>Conception et developpement :</h3>
                        <p>Monsieur <strong>Simon Bénet</strong></p>
                        <p>Tel : 06 73 37 67 42<br/>Email : hello@simonbénet.com</p>
                        <p>Simon Bénet E.I</p>
                        <p>Siret : 948 392 535 00019</p>
                    </div>
                    <div id="infoContainer">
                        <h3>Editeur :</h3>
                        <p>Ce site Internet est la propriete de <strong>Mike Gouverneur</strong> residant :</p>
                        <p>Rue Dewez 11<br/>5000 Namur, Belgique</p>
                    </div>
                </div>
                <div id="legalNoticeMainContainer">
                    <div className="legalNoticeContainer">
                        <h3>Propriete intellectuelle</h3>
                        <p>Le contenu de ce site web est la propriete de <strong>Mike Gouverneur</strong>.<br/>Toutefois, vous avez l'autorisation d'utiliser les contenus de ce site dans le but qui vous siera, à condition que le proprietaire dudit site soit cite.</p>
                    </div>
                    <div className="legalNoticeContainer">
                        <h3>Liens hypertextes</h3>
                        <p>Les pages de ce site web pourront presenter des liens avec d'autres sites ou faire des renvois à d'autres sites.<br/>
                        <strong>Mike Gouverneur</strong> ne se porte pas garant du contenu de ces autres sites et ne pourra être tenu responsable des dommages resultant de l'utilisation de contenu de ces sites.</p>
                    </div>
                    <div className="legalNoticeContainer">
                        <h3>Responsabilite</h3>
                        <p><strong>Mike Gouverneur</strong> ne pourra être tenu responsable de tout dommage direct ou indirect issu d'une interruption, d'un dysfonctionnement quel qu'il soit, et ce pour quelque raison que ce soit, ou encore de tout dommage direct ou indirect qui resulterait, d'une façon quelconque, d'une connexion au site.<br/>La connexion de toute personne au site se fait sous son entière responsabilite.</p>
                    </div>
                    <div className="legalNoticeContainer">
                        <h3>Droit d'auteur</h3>
                        <p>Toutes les photos publiees sur le site Internet de <strong>Mike Gouverneur</strong> sont sa propriete, et sont protegees par le droit d'auteur.<br/>Sans l'accord prealable de l'auteur, l'utilisation de ces contenus est de fait interdite.</p>
                    </div>
                    <div className="legalNoticeContainer">
                        <h3>Protection des donnees personnelles</h3>
                        <p>Aucune information personnelle n'est stockee.</p>
                    </div>
                </div>
                <div id="closeLN" onClick={() => { closeLM(); closeLegalNoticeHandleClick(); }}>x</div>
            </div>
        </>
    )
}

export default LegalNotice