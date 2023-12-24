import { Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/mainPage/mainPage";
import { ProfilePage } from "../pages/profilePage/profilePage";
import { AdsPage } from "../pages/adsPage/adsPage";
import { MyAdsPage } from "../pages/myAdsPage/myAdsPage";
import { SellerProfilePage } from "../pages/sellerProfilePage/sellerProfilePage";
import { Signin } from "../pages/signin/signin";
import { Signup } from "../pages/signup/signup";
import { AddProduct } from "../pages/addProduct/addProduct";
import { EditProduct } from "../pages/editProduct/editProduct";
import { Reviews } from "../pages/reviews/reviews";
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";

export const AppRoutes = ({ isAllowed }) => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute redirectPath="/" isAllowed={isAllowed}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route path="/ads" element={<AdsPage />} />
      <Route path="/my-ads" element={<MyAdsPage />} />
      <Route path="/seller-profile" element={<SellerProfilePage />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product" element={<EditProduct />} />
      <Route path="/reviews" element={<Reviews />} />
    </Routes>
  );
};
