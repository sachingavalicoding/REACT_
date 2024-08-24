import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomeLayout from "./Components/HomeLayout"
import Signin from "./auth/Signin"
import Signup from "./auth/Signup"


const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path="/" element = {<HomeLayout />} />
      <Route path="/signin" element = {<Signin />} />
      <Route path="/signup" element = {<Signup />} />
    </Routes>
   </BrowserRouter>
  )
}

export default App