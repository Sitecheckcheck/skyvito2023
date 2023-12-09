import {Route, Routes} from 'react-router-dom'
import { MainPage } from '../pages/mainPage/mainPage'
import { ProfilePage } from '../pages/profilePage/profilePage'
import { AdvPage } from '../pages/advPage/advPage'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/adv' element={<AdvPage/>}/>

        </Routes>
    )
}