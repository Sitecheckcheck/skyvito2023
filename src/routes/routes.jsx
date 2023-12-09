import {Route, Routes} from 'react-router-dom'
import { MainPage } from '../pages/mainPage/mainPage'
import { ProfilePage } from '../pages/profilePage/profilePage'
import { AdvPage } from '../pages/advPage/advPage'
import { MyAdvPage } from '../pages/myAdvPage/myAdvPage'
import { SellerProfilePage } from '../pages/sellerProfilePage/sellerProfilePage'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/adv' element={<AdvPage/>}/>
            <Route path='/my-adv' element={<MyAdvPage/>}/>
            <Route path='/seller-profile' element={<SellerProfilePage/>}/>


        </Routes>
    )
}