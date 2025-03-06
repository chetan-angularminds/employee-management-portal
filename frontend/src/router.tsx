import { Routes, Route } from "react-router-dom";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<>home-page</>}></Route>
      <Route path="/auth">
        <Route path="/auth/login" element={<>login-page</>}></Route>
        <Route path="/auth/register" element={<>register-page</>}></Route>
      </Route>
      <Route path="/dashboard" element={<>dashboard</>}></Route>
      <Route path="/my-profile" element={<>my-profile</>}></Route>
    </Routes>
  );
}

export default Router;
