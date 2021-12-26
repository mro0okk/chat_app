import { createContext, useContext, useMemo, useState } from "react"
import useFirestore from "../hooks/useFirestore"
import { AuthContext } from "./AuthProvider"

export const AppContext = createContext()
function AppProvider({ children }) {
  const [visible, setVisible] = useState(false)

  const {
    user: { uid },
  } = useContext(AuthContext)
  const roomsCondition = useMemo(
    () => ({
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    }),
    [uid]
  )
  const rooms = useFirestore("rooms", roomsCondition)
  return (
    <AppContext.Provider value={{ rooms, visible, setVisible }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
