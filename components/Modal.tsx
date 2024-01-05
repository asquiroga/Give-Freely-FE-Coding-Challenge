import React from "react"

type ModalProps = {
  onModalClose: () => void
  message: string
}

const Modal: React.FC<ModalProps> = ({ onModalClose, message }) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-body">{message}</div>
        <div className="modal-footer">
          <input type="button" value="Close Modal" onClick={onModalClose} />
        </div>
      </div>
    </>
  )
}

export default Modal
