import { PlusSquareOutlined } from "@ant-design/icons/lib/icons"
import { Button, Collapse, Typography } from "antd"
import CollapsePanel from "antd/lib/collapse/CollapsePanel"
import { useContext } from "react"
import styled from "styled-components"
import { AppContext } from "../../Context/AppProvider"
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
  const { rooms, setVisible, setSelectedRoomId } = useContext(AppContext)
  const handleAddRoom = () => {
    setVisible(true)
  }
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        {rooms.map((room) => (
          <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
        <Button
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
          onClick={handleAddRoom}
        >
          Thêm phòng
        </Button>
      </PanelStyled>
    </Collapse>
  )
}

export default RoomList
