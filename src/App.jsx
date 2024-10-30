import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./componets/Body"
import Login from "./componets/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"


function App() {

  return (
    <>
    <Provider appStore={appStore}>
    <BrowserRouter basename="/">
     <Routes>
       <Route path="/" element={<Body/>}>   
       <Route path="/login" element={<Login/>} />
           </Route>
     </Routes>
    </BrowserRouter>
    </Provider>
      </>
  )
}

export default App
