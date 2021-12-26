import { Form, Input, Modal } from "antd"
import { useContext } from "react"
import { AppContext } from "../../Context/AppProvider"
import { AuthContext } from "../../Context/AuthProvider"
import { addDocument } from "../../firebase/service"
function AddRoomModal() {
  const { visible, setVisible } = useContext(AppContext)
  const {
    user: { uid },
  } = useContext(AuthContext)
  const [form] = Form.useForm()
  const handleOk = () => {
    //handleLogic
    console.log({ formData: form.getFieldsValue() })
    addDocument("rooms", { ...form.getFieldsValue(), members: [uid] })
    //resetValue
    form.resetFields()

    setVisible(false)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <div>
      <Modal
        title="Tạo phòng"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="tên phòng" name="name">
            <Input placeholder="Tên phòng" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Nhập tên phòng" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default AddRoomModal
