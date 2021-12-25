import { Avatar, Button } from "antd"
import Text from "antd/lib/typography/Text"
import styled from "styled-components"
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
  return (
    <WrapperStyled>
      <div>
        <Avatar>H</Avatar>
        <Text>HoanNguyen</Text>
      </div>
      <div>
        <Button ghost onClick={() => {}}>
          Đăng xuất{" "}
        </Button>
      </div>
    </WrapperStyled>
  )
}

export default UserInfo
