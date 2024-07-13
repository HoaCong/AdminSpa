/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _omit from "lodash/omit";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Product/action";
const initialData = {
  content: "",
  name: "",
  image: "",
  category: "TRIET_LONG",
  time: "",
  numbersesion: null,
  price: null,
};

function FormProduct({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const onAddProduct = (body) => dispatch(actionAdd(body));
  const onEditProduct = (body) => dispatch(actionEdit(body));

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (!_isEmpty(info)) {
      setData({ ...info });
    }
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      onClear();
      setData(initialData);
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleSubmit = () => {
    const tmpKey = Object.keys(_omit(data, "content"));
    let validates = true;
    tmpKey.forEach((key) => {
      if (data[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
    });
    if (validates) {
      const newData = { ...data };
      if (data.category === "TRIET_LONG") newData.content = "";
      if (type === "create") onAddProduct(newData);
      if (type === "edit") onEditProduct(newData);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin dịch vụ",
    edit: "Chỉnh sửa dịch vụ",
    create: "Thêm mới dịch vụ",
  };

  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
      propsModal={{
        size: "lg",
      }}
    >
      <form className="row">
        <div className="col-6">
          <Form.Label htmlFor="Name">
            Tên dịch vụ <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Name"
            name="name"
            defaultValue={data.name}
            aria-describedby="helperName"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.name && (
            <Form.Text
              id="helperName"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.name}
            </Form.Text>
          )}
        </div>
        <div className="col-6">
          <Form.Label htmlFor="Time">
            Thời gian thực hiện <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Time"
            name="time"
            defaultValue={data.time}
            aria-describedby="helperTime"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.time && (
            <Form.Text
              id="helperTime"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.time}
            </Form.Text>
          )}
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="NumberSession">
            Số buổi <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="NumberSession"
            name="numbersesion"
            defaultValue={data.numbersesion}
            aria-describedby="helperNumberSession"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.numbersesion && (
            <Form.Text
              id="helperNumberSession"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.numbersesion}
            </Form.Text>
          )}
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Price">
            Giá dịch vụ <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Price"
            name="price"
            defaultValue={data.price}
            aria-describedby="helperPrice"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.price && (
            <Form.Text
              id="helperPrice"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.price}
            </Form.Text>
          )}
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Role">
            Danh mục <span className="required">*</span>
          </Form.Label>
          <Form.Select
            aria-label="Danh mục"
            name="category"
            value={data.category}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(["TRIET_LONG", "CHAM_DA"], (value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </Form.Select>
        </div>

        {data.category === "CHAM_DA" && (
          <div className="col-6 mt-3">
            <Form.Label htmlFor="Price">Nội dung</Form.Label>
            <Form.Control
              as="textarea"
              id="Content"
              name="content"
              value={data?.content}
              aria-describedby="helperContent"
              disabled={type === "detail"}
              onChange={handleChange}
            />
          </div>
        )}

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Image">
            Hình ảnh <span className="required">*</span>
          </Form.Label>
          <UploadImage
            image={data.image || ""}
            callback={(url) =>
              handleChange({
                target: {
                  name: "image",
                  value: url,
                },
              })
            }
            geometry="radius"
            showUpload={type !== "detail"}
          />
          {error.image && (
            <Form.Text
              id="helperImage"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.image}
            </Form.Text>
          )}
        </div>
      </form>
    </ModalBlock>
  );
}

export default FormProduct;
