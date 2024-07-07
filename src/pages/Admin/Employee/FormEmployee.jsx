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
import { actionAdd, actionEdit } from "store/Employee/action";
import { isValidPhoneNumber } from "../../../helper/functions";
import { roleEnum } from "./helper";
const initialData = {
  username: "",
  email: "",
  image: "",
  phone: "",
  password: "",
  roleid: "MANAGER",
};

function FormEmployee({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.employeeReducer);

  const dispatch = useDispatch();
  const onAddEmployee = (body) => dispatch(actionAdd(body));
  const onEditEmployee = (body) => dispatch(actionEdit(body));

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
    });
    if (validates) {
      if (type === "create") onAddEmployee({ ...data });
      if (type === "edit") onEditEmployee({ ...data });
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin tài khoản",
    edit: "Chỉnh sửa tài khoản",
    create: "Thêm mới tài khoản",
  };

  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
    >
      <form>
        <div>
          <Form.Label htmlFor="Employeename">
            Tên tài khoản <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Employeename"
            name="username"
            defaultValue={data.username}
            aria-describedby="helperEmployeename"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.username && (
            <Form.Text
              id="helperEmployeename"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.username}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Name">
            Email <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="email"
            id="Email"
            name="email"
            defaultValue={data.email}
            aria-describedby="helperEmail"
            disabled={["detail", "edit"].includes(type)}
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

        <div className="mt-3">
          <Form.Label htmlFor="Name">
            Số điện thoại <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Phone"
            name="phone"
            defaultValue={data.phone}
            aria-describedby="helperPhone"
            disabled={type === "detail"}
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

        <div className="mt-3">
          <Form.Label htmlFor="Name">
            Mật khẩu <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="password"
            id="Password"
            name="password"
            defaultValue={data.password}
            aria-describedby="helperPassword"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.password && (
            <Form.Text
              id="helperPassword"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.password}
            </Form.Text>
          )}
        </div>

        <div className="mt-3">
          <Form.Label htmlFor="Role">
            Quyền <span className="required">*</span>
          </Form.Label>
          <Form.Select
            aria-label="Quyền"
            name="roleid"
            value={data.roleid}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(roleEnum, (value, index) => (
              <option key={value} value={index}>
                {value}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
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

export default FormEmployee;
