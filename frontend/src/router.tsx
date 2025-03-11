import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/sign-in-page/signIn";
import SignupPage from "./pages/sign-up-page/signUp";
import FallbackAuthGuard from "./core/guards/homePageGuard";
import HomePage from "./pages/home-page/homePage";
import FallbackHomePage from "./pages/home-page/fallbackHomePage";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<FallbackAuthGuard children={<HomePage/>}  fallbackChildren={<FallbackHomePage/>}/>}></Route>
      <Route path="/auth">
        <Route path="/auth/sign-in" element={<SignIn/>}></Route>
        <Route path="/auth/sign-up" element={<SignupPage/>}></Route>
        <Route path="/auth/sign-up/:id" element={<SignupPage/>}></Route>
      </Route>
      <Route path="/dashboard" element={<>dashboard</>}></Route>
      <Route path="/my-profile" element={<>my-profile</>}></Route>
    </Routes>
  );
}

export default Router;
