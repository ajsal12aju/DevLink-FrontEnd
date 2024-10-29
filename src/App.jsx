import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./componets/Body"
import Login from "./componets/Login"


function App() {

  return (
    <>
    <BrowserRouter basename="/">
     <Routes>
       <Route path="/" element={<Body/>}>   
       <Route path="/login" element={<Login/>} />
           </Route>




     </Routes>
    </BrowserRouter>
      </>
  )
}

export default App
