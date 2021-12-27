import { Avatar, Form, Modal, Select, Spin } from "antd"
import { debounce } from "lodash"
import { useMemo, useContext, useState } from "react"
import { AppContext } from "../../Context/AppProvider"
import { db } from "../../firebase/config"

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
  const [fetching, setFetching] = useState(false)
  const [options, setOptions] = useState([])
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([])
      setFetching(true)
      fetchOptions(value, props.curMembers).then((newOptions) => {
        setOptions(newOptions)
        setFetching(false)
      })
    }
    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout, fetchOptions])
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((opt) => (
        /* label ===displayName*/
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  )
}

async function fetchUserList(search, curMembers) {
  return db
    .collection("users")
    .where("keywords", "array-contains", search)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !curMembers.includes(opt.value))
    })
}
function InviteMemberModal() {
  const {
    isInviteMemberVisible,
    setIsInviteMemberVisible,
    selectedRoomId,
    selectedRoom,
  } = useContext(AppContext)
  const [value, setValue] = useState()
  const [form] = Form.useForm()
  const handleOk = () => {
    //resetForm
    form.resetFields()

    //Update members in current room
    const roomRef = db.collection("rooms").doc(selectedRoomId)
    roomRef.update({
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    })

    setIsInviteMemberVisible(false)
  }
  const handleCancel = () => {
    setIsInviteMemberVisible(false)
  }
  return (
    <div>
      <Modal
        title="Thêm thành viên"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <DebounceSelect
            label="Tên các thành viên"
            mode="multiple"
            value={value}
            placeholder="Nhập tên thành viên"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            curMembers={selectedRoom.members}
          ></DebounceSelect>
        </Form>
      </Modal>
    </div>
  )
}

export default InviteMemberModal
