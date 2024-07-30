/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _omit from "lodash/omit";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { NumericFormat } from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Product/action";
import CrmSchedule from "./CrmSchedule";
const initialData = {
  content: "",
  name: "",
  image: "",
  category: "TRIET_LONG",
  time: "",
  numbersesion: "",
  price: "",
  distancegenerate: "",
};

const EMUM_TYPE = [
  { value: "TRIET_LONG", label: "Liệu trình" },
  { value: "CHAM_DA", label: "Thông thường" },
];
const initCrm = [{ date: "", content: "", time: "" }];
function FormProduct({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const onAddProduct = (body) => dispatch(actionAdd(body));
  const onEditProduct = (body) => dispatch(actionEdit(body));

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [crmschedule, setCrmSchedule] = useState(initCrm);

  useEffect(() => {
    if (!_isEmpty(info)) {
      setData({ ...info });
      if (!_isEmpty(info.crmschedule)) {
        setCrmSchedule(JSON.parse(info.crmschedule));
      }
    }
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      onClear();
      setData(initialData);
      setCrmSchedule(initCrm);
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  const handleSubmit = () => {
    let tmpKey = Object.keys(_omit(data, ["content", "crmschedule"]));
    if (data.category === "CHAM_DA") {
      tmpKey = Object.keys(
        _omit(data, ["content", "crmschedule", "distancegenerate"])
      );
    }
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

      if (data.category === "TRIET_LONG") {
        newData.content = "";
        newData.distancegenerate = +newData.distancegenerate;
        newData.crmschedule = "[]";
      } else {
        const customSchedule = crmschedule.filter(
          (item) => !!item.date && !!item.content && !!item.time
        );
        newData.crmschedule = JSON.stringify(customSchedule);
        newData.distancegenerate = 0;
      }
      if (type === "create") onAddProduct(newData);
      if (type === "edit") onEditProduct(newData);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
    setCrmSchedule(initCrm);
  };

  const getTitle = {
    detail: "Thông tin dịch vụ",
    edit: "Chỉnh sửa dịch vụ",
    create: "Thêm mới dịch vụ",
  };

  const handleAdd = (e) => {
    e.preventDefault();
    setCrmSchedule([...crmschedule, { date: "", content: "", time: "" }]);
  };

  const handleChangeCrm = (index, event) => {
    const { name, value } = event.target;
    const newCrmSchedule = [...crmschedule];
    newCrmSchedule[index][name] = value;
    setCrmSchedule(newCrmSchedule);
  };
  const handleRemove = (e, index) => {
    e.preventDefault();
    setCrmSchedule((prev) => prev.filter((_e, idx) => idx !== index));
  };
  const handleChangeCategory = (e) => {
    const { value } = e.target;
    if (value === "CHAM_DA")
      setData((prevData) => ({
        ...prevData,
        numbersesion: 1,
        distancegenerate: 0,
      }));
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
      <form
        className="row overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 210px)" }}
      >
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
          <Form.Label htmlFor="Role">
            Danh mục <span className="required">*</span>
          </Form.Label>
          <Form.Select
            aria-label="Danh mục"
            name="category"
            value={data.category}
            onChange={(e) => {
              handleChange(e);
              handleChangeCategory(e);
            }}
            disabled={type === "detail"}
          >
            {_map(EMUM_TYPE, (item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className="col-6 mt-3">
          <Form.Label htmlFor="Price">
            Giá dịch vụ <span className="required">*</span>
          </Form.Label>
          <NumericFormat
            id="Price"
            thousandSeparator={true}
            suffix={" VND"}
            name="price"
            value={data.price}
            displayType={"input"}
            className="form-control"
            aria-describedby="helperPrice"
            disabled={type === "detail"}
            onValueChange={({ value }) =>
              handleChange({ target: { value, name: "price" } })
            }
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
          <div>
            <Form.Label htmlFor="NumberSession">
              Số buổi <span className="required">*</span>
            </Form.Label>
            <NumericFormat
              id="NumberSession"
              thousandSeparator={true}
              suffix={" buổi"}
              name="numbersesion"
              value={data.numbersesion}
              displayType={"input"}
              className="form-control"
              aria-describedby="helperNumberSession"
              disabled={type === "detail" || data.category === "CHAM_DA"}
              onValueChange={({ value }) =>
                handleChange({ target: { value, name: "numbersesion" } })
              }
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
        </div>

        {data.category === "CHAM_DA" &&
          (type !== "detail" || !_isEmpty(data.crmschedule)) && (
            <div className="col-12 mt-3">
              <CrmSchedule
                disabled={type === "detail"}
                list={crmschedule}
                handleAdd={handleAdd}
                handleChange={handleChangeCrm}
                handleRemove={handleRemove}
              />
            </div>
          )}

        {data.category === "TRIET_LONG" && (
          <div className="col-6 mt-3">
            <div>
              <Form.Label htmlFor="distancegenerate">
                Khoảng cách lịch hẹn <span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="distancegenerate"
                name="distancegenerate"
                defaultValue={data.distancegenerate}
                aria-describedby="helperdistancegenerate"
                disabled={type === "detail"}
                onChange={handleChange}
              />
              {error.distancegenerate && (
                <Form.Text
                  id="helperdistancegenerate"
                  danger="true"
                  bsPrefix="d-inline-block text-danger lh-1"
                >
                  {error.distancegenerate}
                </Form.Text>
              )}
            </div>
          </div>
        )}
        <div className="col-6 mt-3">
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
