import React, { Suspense, useEffect, useState } from 'react'
import OffCanvas from '../modal/off-canvas';
import menu from '../../assets/menu.svg'
const MainTop: React.FC<{ name: string, userId: string }> = ({ name, userId }) => {

    let [showOffcanvas, setShowOffcanvas] = useState<boolean>(false)
    let Sidebar = showOffcanvas && React.lazy(() => import('../user-sidebar/user-sidebar'))
    function handleOffcanvas() {
        console.log('handleoffcanvas');

        return setShowOffcanvas(pre => !pre)
    }
    useEffect(() => {
        console.log('sidebar', Sidebar);

    }, [Sidebar])
    useEffect(() => {
        let userSidebar = document.getElementById('user-sidebar')?.getElementsByTagName('div')
        console.log(userSidebar);
        for (let i = 0; i < userSidebar!.length; i++) {
            console.log('click on child');
            userSidebar![i].onclick = function () {
                handleOffcanvas()
            }
        }

    }, [])
    return (
        <div className='main-top'>
            <OffCanvas show={showOffcanvas} handleOffcanvas={() => handleOffcanvas()}>
                <Suspense fallback='loading'>
                    {Sidebar && <Sidebar userId={userId} />}
                </Suspense>
            </OffCanvas>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img onClick={handleOffcanvas} className='main-top__menu' style={{ width: '13px' }} src={menu} alt="" />
                <p>{name}</p>
            </div>
        </div >
    )
}

export default MainTop;
