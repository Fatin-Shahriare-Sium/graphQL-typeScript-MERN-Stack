import React, { useEffect, useState } from 'react'
import OffCanvas from '../modal/off-canvas';
import menu from '../../assets/menu.svg'
import UserSidebar from '../user-sidebar/user-sidebar';
const MainTop: React.FC<{ name: string, userId: string }> = ({ name, userId }) => {

    let [showOffcanvas, setShowOffcanvas] = useState<boolean>(false)

    function handleOffcanvas() {
        console.log('handleoffcanvas');

        return setShowOffcanvas(pre => !pre)
    }

    useEffect(() => {
        let userSidebarx = document.getElementById('user-sidebar__offcanvas')!.getElementsByTagName('div')

        console.log(userSidebarx);


        for (let i = 0; i < userSidebarx!.length; i++) {
            console.log('click on child');
            userSidebarx![i].onclick = handleOffcanvas
        }


    }, [])
    return (
        <div className='main-top'>

            <OffCanvas show={showOffcanvas} handleOffcanvas={() => handleOffcanvas()}>
                <UserSidebar key='876' id={'user-sidebar__offcanvas'} userId={userId} />
            </OffCanvas>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <img onClick={handleOffcanvas} className='main-top__menu' style={{ width: '13px' }} src={menu} alt="" />
                <p>{name}</p>
            </div>
        </div >
    )
}

export default MainTop;

// export default React.memo(MainTop, (prevProps, nextProps) => {
//     if (prevProps.name == nextProps.name) {
//         return true
//     }
//     return false
// })
