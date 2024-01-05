import axios from "axios"
import React, { useEffect, useState } from "react"

function IndexPopup() {
  const [apiData, setApiData] = useState<any>()
  const [selectedCompany, setSelectedCompany] = useState<number>()
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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "400px"
      }}>
      {selectedCompany !== undefined ? (
        <CompanyDetails
          messages={apiData[selectedCompany].messages}
          name={apiData[selectedCompany].name}
          goBackHandler={() => setSelectedCompany(undefined)}
        />
      ) : (
        <>
          <h2>Select a company</h2>
          {apiData &&
            apiData.map((company, index) => (
              <button
                style={{ margin: ".3em" }}
                onClick={() => setSelectedCompany(index)}>
                {company.name}
              </button>
            ))}
        </>
      )}
    </div>
  )
}

type CompanyDetailsProps = {
  name: string
  messages: string[]
  goBackHandler: () => void
}
const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  name,
  messages,
  goBackHandler
}) => {
  return (
    <div>
      <h2>{name}</h2>

      <ul>
        {messages.map((message) => (
          <li>{message}</li>
        ))}
      </ul>
      <button style={{ marginTop: ".5em" }} onClick={goBackHandler}>
        Go back!
      </button>
    </div>
  )
}

export default IndexPopup
