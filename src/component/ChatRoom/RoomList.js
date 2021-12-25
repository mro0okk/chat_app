import { PlusSquareOutlined } from "@ant-design/icons/lib/icons"
import { Button, Collapse, Typography } from "antd"
import CollapsePanel from "antd/lib/collapse/CollapsePanel"
import styled from "styled-components"
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
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        <LinkStyled>Room 1</LinkStyled>
        <LinkStyled>Room 2</LinkStyled>
        <LinkStyled>Room 3</LinkStyled>
        <Button type="text" icon={<PlusSquareOutlined />} className="add-room">
          Thêm phòng
        </Button>
      </PanelStyled>
    </Collapse>
  )
}

export default RoomList
