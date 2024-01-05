import axios from "axios"
import styleText from "data-text:./notificationBell.css"
import type { PlasmoCSConfig, PlasmoGetStyle } from "plasmo"
import React, { useEffect, useMemo, useState } from "react"

import Modal from "../components/Modal"

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style")
  style.textContent = styleText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/search*"],
  all_frames: true
}

const Bell = () => {
  const [showModal, setShowModal] = useState(false)
  const [apiData, setApiData] = useState<any>()
  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/v3/b/64678cf09d312622a36121b8", {
        headers: {
          "X-Access-Key":
            "$2b$10$QhrtefF/jKDbKgauF5trL.SK6VAk69VSIcHMhGaEs8ZViK.xBh0Om"
        }
      })
      .then((data) => setApiData(data.data))
  }, [])

  const messages = useMemo(() => {
    if (!apiData) return []
    let result = []
    apiData.record.websites.forEach((website) => {
      result = result.concat(website.messages)
    })
    return result
  }, [apiData])

  return (
    <>
      <div className="notification-bell-container">
        <img
          src="https://konesisrael.co.il/wp-content/uploads/2019/02/animat-bell-color.gif"
          onClick={() => setShowModal(true)}
        />

        {showModal && (
          <Modal
            onModalClose={() => setShowModal(false)}
            message={messages[Math.floor(Math.random() * messages.length)]}
          />
        )}
      </div>
    </>
  )
}

export default Bell
