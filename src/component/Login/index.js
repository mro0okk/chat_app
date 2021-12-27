import { Button, Col, Row } from "antd"
import Title from "antd/lib/typography/Title"
import firebase, { auth } from "../../firebase/config"
import { addDocument, generateKeywords } from "../../firebase/service"
const fbProvider = new firebase.auth.FacebookAuthProvider()
function Login() {
  const handleLogin = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)
    if (additionalUserInfo?.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      })
    }
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
