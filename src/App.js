import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login"
import SignUp from "./pages/signup/SignUp"
// import Login from "./pages/login/Login"
import Fragment from "./pages/fragment/Fragment"
import NotFound from "./pages/notFound/NotFound"


function App() {

  // const PrivateRoutes = () => {
  //   if (isUserSignedIn && user.idToken !== '') {
  //     return <Outlet />
  //   } else {
  //     return < Navigate to="/login" />
  //   }
  // }

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route element={<PrivateRoutes />}> */}
        <Route>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/fragments/:id" element={<Fragment />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={< NotFound />} />
      </Routes>
    </>)
}

export default App;
