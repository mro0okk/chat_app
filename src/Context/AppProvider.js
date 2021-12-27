import { createContext, useContext, useMemo, useState } from "react"
import useFirestore from "../hooks/useFirestore"
import { AuthContext } from "./AuthProvider"

export const AppContext = createContext()
function AppProvider({ children }) {
  const [visible, setVisible] = useState(false)
  const [selectedRoomId, setSelectedRoomId] = useState("")
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)

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
  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  )

  const usersCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    }
  }, [selectedRoom.members])
  const members = useFirestore("users", usersCondition)
  return (
    <AppContext.Provider
      value={{
        rooms,
        visible,
        setVisible,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        members,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
