import { Typography } from "antd"
import Avatar from "antd/lib/avatar/avatar"
import { formatRelative } from "date-fns"
import { slice } from "lodash"
import styled from "styled-components"

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
  }
  .content {
    margin-left: 30px;
  }
`

function formatDate(seconds) {
  let formatedDate = ""

  if (seconds) {
    formatedDate = formatRelative(new Date(seconds * 1000), new Date())
    formatedDate = formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1)
  }

  return formatedDate
}
function Message({ text, displayName, createAt, photoURL }) {
  return (
    <div>
      <WrapperStyled>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="author">{displayName}</Typography.Text>
        <Typography.Text className="date">
          {formatDate(createAt?.seconds)}
        </Typography.Text>

        <div>
          <Typography.Text className="content">{text}</Typography.Text>
        </div>
      </WrapperStyled>
    </div>
  )
}

export default Message
