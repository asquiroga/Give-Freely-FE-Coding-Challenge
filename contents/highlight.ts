import sites from "data-env:../assets/sites.json"
import type { PlasmoCSConfig } from "plasmo"

export const config: PlasmoCSConfig = {
  matches: ["https://www.google.com/search*"],
  all_frames: true
}

export {}

// First functional item
const results = document
  .querySelectorAll("#rso span > a[ping]")
  .forEach((anchor) => {
    if (anchor) {
      const currentUrl = anchor.getAttribute("href")
      ;(sites as any).websites.forEach((site) => {
        if (currentUrl.includes(site.url)) {
          const div = anchor.closest("div")
          div["style"].border = "2px solid #109010"
          div["style"].marginTop = "10px"
          div["style"].padding = "3px"
        }
      })
    }
  })

console.log("Extension loaded!")
