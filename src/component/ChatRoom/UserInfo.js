import { Avatar, Button } from "antd"
import Text from "antd/lib/typography/Text"
import { useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../../Context/AuthProvider"
import { auth } from "../../firebase/config"
const WrapperStyled = styled.div`
display:flex;
justify-content:space-between;
padding 12px 16px;
border-bottom: 1px solid rgba(83,38,83,0.6);
.ant-typography{
  color:white;
  margin-left: 5px;
`
function UserInfo() {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <WrapperStyled>
      <div>
        <Avatar src={user.photoURL}>
          {user.photoURL ? "" : user.displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Text>{user.displayName}</Text>
      </div>
      <div>
        <Button
          ghost
          onClick={() => {
            auth.signOut()
          }}
        >
          Đăng xuất{" "}
        </Button>
      </div>
    </WrapperStyled>
  )
}

export default UserInfo
