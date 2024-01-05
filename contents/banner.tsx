import axios from "axios"
import sites from "data-env:../assets/sites.json"
import type { PlasmoCSConfig } from "plasmo"
import React, { useEffect, useState } from "react"

const matches = []
sites["websites"].forEach((site) => {
  matches.push("https://" + site.url)
})

export const config: PlasmoCSConfig = {
  matches: ["https://www.tripadvisor.com/*", "https://www.uber.com/*"],
  all_frames: true
}

const Banner = () => {
  const [apiData, setApiData] = useState<any>()
  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/v3/b/64678cf09d312622a36121b8", {
        headers: {
          "X-Access-Key":
            "$2b$10$QhrtefF/jKDbKgauF5trL.SK6VAk69VSIcHMhGaEs8ZViK.xBh0Om"
        }
      })
      .then((data) => setApiData(data.data.record.websites))
  }, [])

  if (!apiData) return null
  const messages = apiData.filter((site) => {
    return window.location.href.includes(site.url)
  })[0].messages
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        backgroundColor: "#A0A0A0",
        textAlign: "center",
        padding: ".3em"
      }}>
      [BANNER] {messages[Math.floor(Math.random() * messages.length)]}
    </div>
  )
}

export default Banner
