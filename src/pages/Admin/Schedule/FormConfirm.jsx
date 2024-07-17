/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { useSelector } from "react-redux";

function FormConfirm({
  data: { type, visible, info },
  onClear,
  onConfirm,
  onDestroy,
}) {
  const {
    detailStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.scheduleReducer);

  const [note, setNote] = useState("");

  const handleClose = () => {
    onClear();
    setNote("");
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  const getTitle = {
    confirm: "Xác nhận thành công",
    destroy: "Xác nhận hủy",
  };

  const handleSave = () => {
    if (type === "confirm") onConfirm(note);
    if (type === "destroy") onDestroy(note);
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
