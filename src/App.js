import "./App.css"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Login from "./component/Login"
import ChatRoom from "./component/ChatRoom"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<ChatRoom />} path="/" />
      </Routes>
    </BrowserRouter>
  )
}

export default App
