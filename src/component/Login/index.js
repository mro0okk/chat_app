import { Button, Col, Row } from "antd"
import Title from "antd/lib/typography/Title"
import firebase, { auth } from "../../firebase/config"
const fbProvider = new firebase.auth.FacebookAuthProvider()
function Login() {
  const handleLogin = async () => {
    auth.signInWithPopup(fbProvider)
  }

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={2}>
            Real-Time Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: "5" }}>
            Đăng nhập bằng Google
          </Button>
          <Button style={{ width: "100%" }} onClick={() => handleLogin()}>
            {" "}
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Login
