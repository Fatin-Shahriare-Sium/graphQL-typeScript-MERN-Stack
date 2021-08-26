import React from 'react'

const OffCanvas: React.FC<{ show: boolean, handleOffcanvas: () => any }> = ({ children, show, handleOffcanvas }) => {
    return (

        <div style={{ visibility: 'visible' }} className={show ? 'offcanvas offcanvas-start show' : 'offcanvas offcanvas-start'}>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel"></h5>
                <button type="button" className="btn-close text-reset" onClick={handleOffcanvas} data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div>
                    {children}
                </div>

            </div>
        </div>
    )
}

export default OffCanvas;
