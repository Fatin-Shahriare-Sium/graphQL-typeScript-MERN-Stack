import React from 'react'

const Modal: React.FC<{ handleModal: () => any, title: string }> = ({ children, handleModal, title }) => {
    return (
        <div className="modal fade show" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
                        <button type="button" onClick={() => handleModal()} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div style={{ minHeight: '37vh' }} className="modal-body">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal;
