/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _omit from "lodash/omit";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Customer/action";
import { isValidCodePin, isValidPhoneNumber } from "../../../helper/functions";
const initialData = {
  fullname: "",
  email: "",
  image: "",
  phone: "",
  codepin: "",
};

function FormCustomer({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.customerReducer);

  const dispatch = useDispatch();
  const onAddCustomer = (body) => dispatch(actionAdd(body));
  const onEditCustomer = (body) => dispatch(actionEdit(body));

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
    const tmpKey = Object.keys(_omit(data, "image"));
    let validates = true;
    tmpKey.forEach((key) => {
      if (data[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
      if (
        data[key] !== "" &&
        key === "phone" &&
        !isValidPhoneNumber(data[key])
      ) {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} invalid format`,
        }));
        validates = false;
      }
      if (data[key] !== "" && key === "codepin" && !isValidCodePin(data[key])) {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} includes 6 numeric characters`,
        }));
        validates = false;
      }
    });
    if (validates) {
      if (type === "create") onAddCustomer({ ...data });
      if (type === "edit") onEditCustomer({ ...data });
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin khách hàng",
    edit: "Chỉnh sửa khách hàng",
    create: "Thêm mới khách hàng",
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
          <Form.Label htmlFor="Customername">
            Tên khách hàng <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Customername"
            name="fullname"
            defaultValue={data.fullname}
            aria-describedby="helperCustomername"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.fullname && (
            <Form.Text
              id="helperCustomername"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.fullname}
            </Form.Text>
          )}
        </div>
        <div className="col-6">
          <Form.Label htmlFor="Name">
            Email <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            id="Email"
            name="email"
            defaultValue={data.email}
            aria-describedby="helperEmail"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.email && (
            <Form.Text
              id="helperEmail"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.email}
            </Form.Text>
          )}
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Name">
            Số điện thoại <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Phone"
            name="phone"
            maxLength={11}
            defaultValue={data.phone}
            aria-describedby="helperPhone"
            disabled={type === "detail" || type === "edit"}
            onChange={handleChange}
          />
          {error.phone && (
            <Form.Text
              id="helperPhone"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.phone}
            </Form.Text>
          )}
        </div>
        <div className="col-6 mt-3">
          <Form.Label htmlFor="Name">
            Địa chỉ <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Address"
            name="address"
            defaultValue={data.address}
            aria-describedby="helperAddress"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.address && (
            <Form.Text
              id="helperAddress"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.address}
            </Form.Text>
          )}
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Codepin">
            Mã pin <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="codepin"
            id="Codepin"
            name="codepin"
            maxLength={6}
            defaultValue={data.codepin}
            aria-describedby="helperCodepin"
            disabled={type === "detail" || type === "edit"}
            onChange={handleChange}
          />
          {error.codepin && (
            <Form.Text
              id="helperCodepin"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.codepin}
            </Form.Text>
          )}
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Image">Hình ảnh</Form.Label>
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

export default FormCustomer;
