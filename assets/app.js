import "./app.scss"
import React from "react"

import {createRoot} from "react-dom/client"
import Lobby from "./components/Lobby.jsx"

const userSideMain = document.getElementById("userSideMain")
const userSideMainRoot = createRoot(userSideMain)

userSideMainRoot.render(
    <React.StrictMode>
        <Lobby />
    </React.StrictMode>
)