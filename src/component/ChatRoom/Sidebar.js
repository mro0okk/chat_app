import { Row, Col } from "antd"
import styled from "styled-components"
import RoomList from "./RoomList"
import UserInfo from "./UserInfo"
const SidebarStyled = styled.div`
  background: #1d5a93;
  color: #fff;
  height: 100vh;
`
function Sidebar() {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyled>
  )
}

export default Sidebar
