/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionConfirmReminderCare } from "store/Schedule/action";

function FormConfirm({ data: { type, visible, info }, onClear }) {
  const {
    detailStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.scheduleReducer);
  const dispatch = useDispatch();
  const onConfirmReminderCare = (body, note) =>
    dispatch(actionConfirmReminderCare(body, note));
  // const onDestroyReminderCare = (body, note) =>
  // dispatch(actionDestroyReminderCare(body, note));
  const [note, setNote] = useState("");

  const handleClose = () => {
    onClear();
  };

  useEffect(() => {
    if (isSuccess) {
      onClear();
      setNote("");
    }
  }, [isSuccess]);

  const getTitle = {
    confirm: "Xác nhận thành công",
    destroy: "Xác nhận hủy",
  };

  const handleSave = () => {
    if (type === "confirm") onConfirmReminderCare(info, note);
    // if (type === "destroy") onDestroyReminderCare(info, note);
  };

  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      loading={isLoading}
      onSave={handleSave}
    >
      <FloatingLabel controlId="labelNote" label="Ghi chú">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          onChange={({ target }) => setNote(target.value)}
        />
      </FloatingLabel>
    </ModalBlock>
  );
}

export default FormConfirm;
