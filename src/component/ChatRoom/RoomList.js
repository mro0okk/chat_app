import { PlusSquareOutlined } from "@ant-design/icons/lib/icons"
import { Button, Collapse, Typography } from "antd"
import CollapsePanel from "antd/lib/collapse/CollapsePanel"
import { useContext, useMemo } from "react"
import styled from "styled-components"
import { AuthContext } from "../../Context/AuthProvider"
import useFirestore from "../../hooks/useFirestore"
const PanelStyled = styled(CollapsePanel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }
  }
  .ant-collapse-content-box {
    padding: 0 40px;
  }
  .add-room {
    color: white;
    padding: 0;
    back
  }
`
const LinkStyled = styled(Typography.Link)`
  user-select: none;
  display: block;
  margin-bottom: 5px;
  color: white;
  padding: 12px 0;
`
function RoomList() {
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
  console.log(uid)
  const rooms = useFirestore("rooms", roomsCondition)
  console.log(rooms)
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        {rooms.map((room) => (
          <LinkStyled key={room.id}>{room.name}</LinkStyled>
        ))}
        <Button type="text" icon={<PlusSquareOutlined />} className="add-room">
          Thêm phòng
        </Button>
      </PanelStyled>
    </Collapse>
  )
}

export default RoomList
