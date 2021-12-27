import { UserAddOutlined } from "@ant-design/icons/lib/icons"
import { Alert, Button, Input, Tooltip, Form } from "antd"
import { Group } from "antd/lib/avatar"
import Avatar from "antd/lib/avatar/avatar"
import FormItem from "antd/lib/form/FormItem"
import { useContext, useMemo, useState } from "react"
import styled from "styled-components"
import { AppContext } from "../../Context/AppProvider"
import { AuthContext } from "../../Context/AuthProvider"
import { addDocument } from "../../firebase/service"
import useFirestore from "../../hooks/useFirestore"
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
  const { selectedRoom, members, setIsInviteMemberVisible } =
    useContext(AppContext)
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext)
  const [inputVal, setInputVal] = useState("")
  const [form] = Form.useForm()
  const handleInputChange = (e) => {
    setInputVal(e.target.value)
  }
  const handleOnSubmit = () => {
    addDocument("messages", {
      text: inputVal,
      uid,
      photoURL,
      roomId: selectedRoom.id,
      displayName,
    })
    form.resetFields(["messages"])
  }
  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  )
  const messages = useFirestore("messages", condition)
  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">
                {selectedRoom && selectedRoom.name}
              </p>
              <span className="header__description">
                {selectedRoom && selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyle>
              <Button
                icon={<UserAddOutlined />}
                onClick={() => setIsInviteMemberVisible(true)}
              >
                Mời
              </Button>
              <Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip key={member.id} title={member.displayName}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Group>
            </ButtonGroupStyle>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map((mess) => (
                <Message
                  key={mess.id}
                  text={mess.text}
                  photoURL={mess.photoURL}
                  displayName={mess.displayName}
                  createAt={mess.createAt}
                ></Message>
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <FormItem name="messages">
                <Input
                  onChange={(e) => handleInputChange(e)}
                  onPressEnter={() => handleOnSubmit()}
                  placeholder="tin nhắn..."
                  bordered={false}
                  autoComplete="off"
                />
              </FormItem>
              <Button type="primary" onClick={() => handleOnSubmit()}>
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: "5" }}
          closable
        />
      )}
    </WrapperStyled>
  )
}

export default ChatWindow
