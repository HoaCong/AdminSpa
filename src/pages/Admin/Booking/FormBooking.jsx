/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import { useSelector } from "react-redux";

function FormProduct({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading },
  } = useSelector((state) => state.productReducer);

  const handleClose = () => {
    onClear();
  };

  const getTitle = {
    detail: "Thông tin đặt lịch",
    edit: "Chỉnh sửa đặt lịch",
    create: "Thêm mới đặt lịch",
  };

  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      hideSave={type === "detail"}
      loading={isLoading}
    >
      SHOW DATA
    </ModalBlock>
  );
}

export default FormProduct;
