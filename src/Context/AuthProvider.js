import { Spin } from "antd"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../firebase/config"
export const AuthContext = createContext()
function AuthProvider({ children }) {
  const [user, setUser] = useState({})
  const navigate = useNavigate()
  const [isLoading, setIsloading] = useState(true)
  useEffect(() => {
    const unsubcribed = auth.onAuthStateChanged((user) => {
      console.log({ user })
      if (user) {
        const { displayName, email, uid, photoURL } = user
        setUser({ displayName, email, uid, photoURL })
        setIsloading(false)
        navigate("/")
      } else {
        setIsloading(false)
        navigate("/login")
      }
    })
    //clean function
    return () => {
      unsubcribed()
    }
  }, [navigate])
  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
