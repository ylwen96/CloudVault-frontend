import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/navbar/navbar";
import File from "./pages/file/File";
import NotFound from "./pages/notFound/NotFound";
import { useSelector } from 'react-redux';


function App() {
  const isUserSignedIn = useSelector((state) => state.auth.isUserSignedIn)
  const user = useSelector((state) => state.auth.user);

  const PrivateRoutes = () => {
    if(isUserSignedIn && user.idToken !== ''){
      return <Outlet />
    }else{
      return < Navigate to="/login" />
    }
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/drive/files/:id" element={<File />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={< NotFound/>}/>
      </Routes>
    </>)
}

export default App;