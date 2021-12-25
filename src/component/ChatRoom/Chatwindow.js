import { UserAddOutlined } from "@ant-design/icons/lib/icons"
import { Button, Input, Tooltip } from "antd"
import { Group } from "antd/lib/avatar"
import Avatar from "antd/lib/avatar/avatar"
import Form from "antd/lib/form/Form"
import Item from "antd/lib/list/Item"
import styled from "styled-components"
import Message from "./Message"

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`

const ButtonGroupStyle = styled.div`
  display: flex;
  align-items: center;
`
const WrapperStyled = styled.div`
  height: 100vh;
`

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  padding: 11px;
  flex-direction: column;
  justify-content: flex-end;
`
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`
const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`

function ChatWindow() {
  return (
    <WrapperStyled>
      <HeaderStyled>
        <div className="header__info">
          <p className="header__title">Room 1</p>
          <span className="header__description"> Đây là room 1</span>
        </div>
        <ButtonGroupStyle>
          <Button icon={<UserAddOutlined />}>Mời</Button>
          <Group size="small" maxCount={2}>
            <Tooltip title="A">
              <Avatar>A</Avatar>
            </Tooltip>
            <Tooltip title="B">
              <Avatar>B</Avatar>
            </Tooltip>
            <Tooltip title="C">
              <Avatar>C</Avatar>
            </Tooltip>
            <Tooltip title="D">
              <Avatar>E</Avatar>
            </Tooltip>
            <Tooltip title="E">
              <Avatar>F</Avatar>
            </Tooltip>{" "}
            <Tooltip title="F">
              <Avatar>G</Avatar>
            </Tooltip>
          </Group>
        </ButtonGroupStyle>
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled>
          <Message
            text="Test"
            photoURL={null}
            displayName={"KID"}
            createAt={141214121412}
          ></Message>
          <Message
            text="Test"
            photoURL={null}
            displayName={"KID"}
            createAt={141214121412}
          ></Message>{" "}
          <Message
            text="Test"
            photoURL={null}
            displayName={"KID"}
            createAt={141214121412}
          ></Message>{" "}
          <Message
            text="Test"
            photoURL={null}
            displayName={"KID"}
            createAt={141214121412}
          ></Message>{" "}
          <Message
            text="Test"
            photoURL={null}
            displayName={"KID"}
            createAt={141214121412}
          ></Message>
        </MessageListStyled>
        <FormStyled>
          <Item>
            <Input
              placeholder="tin nhắn..."
              bordered={false}
              autoComplete="off"
            />
          </Item>
          <Button type="primary">Gửi</Button>
        </FormStyled>
      </ContentStyled>
    </WrapperStyled>
  )
}

export default ChatWindow
