import {Route, Routes} from 'react-router-dom'
import { MainPage } from '../pages/mainPage/mainPage'
// import { ProfilePage } from '../pages/profilePage/profilePage'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            {/* <Route path='/profile' element={<ProfilePage/>}/> */}

        </Routes>
    )
}