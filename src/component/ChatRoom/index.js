import { Col, Row } from "antd"
import ChatWindow from "./Chatwindow"
import Sidebar from "./Sidebar"

function ChatRoom() {
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  )
}

export default ChatRoom
