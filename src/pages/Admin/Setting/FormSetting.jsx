import CustomTooltip from "components/common/CustomTooltip";
import ModalBlock from "components/common/Modal";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import ColorPicker from "react-pick-color";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdate } from "store/Setting/action";
const initialData = {
  logo: "",
  numberPhone: "",
  nameBanner: "",
  colorone: "",
  colortwo: "",
  colorthree: "",
  reminderbefore: null,
  remindercarebelow: null,
  remindercaretop: null,
};
function FormSetting({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.settingReducer);

  const dispatch = useDispatch();
  const onUpdateSetting = (body) => dispatch(actionUpdate(body));

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    info: null,
    field: null,
  });

  useEffect(() => {
    if (!_isEmpty(info)) setData(info);
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
    const tmpKey = Object.keys(data);
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
        ["reminderbefore", "remindercarebelow", "remindercaretop"].includes(
          key
        ) &&
        !isNaN(data[key])
      ) {
        console.log(123);
      }
    });
    if (validates) {
      onUpdateSetting(data);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      info: null,
      field: null,
    });
  };

  return (
    <ModalBlock
      title="Cập nhật cấu hình"
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      loading={isLoading}
    >
      <form>
        <div>
          <Form.Label htmlFor="Logo">
            Logo <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Logo"
            name="logo"
            placeholder="Nhập link logo"
            defaultValue={data.logo || ""}
            aria-describedby="helperLogo"
            onChange={handleChange}
          />
          {error.logo && (
            <Form.Text
              id="helperLogo"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.logo}
            </Form.Text>
          )}
        </div>
        <div className="mt-2">
          <Form.Label htmlFor="Phone">
            Số điện thoại <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="Phone"
            name="numberPhone"
            placeholder="Nhập số điện thoại"
            defaultValue={data.numberPhone || ""}
            aria-describedby="helperPhone"
            onChange={handleChange}
          />
          {error.numberPhone && (
            <Form.Text
              id="helperPhone"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.numberPhone}
            </Form.Text>
          )}
        </div>
        <div className="mt-2">
          <Form.Label htmlFor="NameBanner">
            Tên shop <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="NameBanner"
            name="nameBanner"
            placeholder="Nhập tên shop"
            defaultValue={data.nameBanner || ""}
            aria-describedby="helperNameBanner"
            onChange={handleChange}
          />
          {error.nameBanner && (
            <Form.Text
              id="helperNameBanner"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.nameBanner}
            </Form.Text>
          )}
        </div>
        <div className="mt-2">
          <Form.Label htmlFor="ReminderBefore">
            Nhắc nhở trước <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="ReminderBefore"
            name="reminderbefore"
            placeholder="Nhập số ngày"
            defaultValue={data.reminderbefore || ""}
            aria-describedby="helperReminderBefore"
            onChange={handleChange}
          />
          {error.reminderbefore && (
            <Form.Text
              id="helperReminderBefore"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.reminderbefore}
            </Form.Text>
          )}
        </div>
        <div className="mt-2">
          <Form.Label htmlFor="ReminderCareTop">
            Nhắc nhở chăm sóc trước <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="ReminderCareTop"
            name="remindercaretop"
            placeholder="Nhập số ngày"
            defaultValue={data.remindercaretop || ""}
            aria-describedby="helperReminderCareTop"
            onChange={handleChange}
          />
          {error.remindercaretop && (
            <Form.Text
              id="helperReminderCareTop"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.remindercaretop}
            </Form.Text>
          )}
        </div>
        <div className="mt-2">
          <Form.Label htmlFor="ReminderCareBelow">
            Nhắc nhở chăm sóc sau <span className="required">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            id="ReminderCareBelow"
            name="remindercarebelow"
            placeholder="Nhập số ngày"
            defaultValue={data.remindercarebelow || ""}
            aria-describedby="helperReminderCareBelow"
            onChange={handleChange}
          />
          {error.remindercarebelow && (
            <Form.Text
              id="helperReminderCareBelow"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.remindercarebelow}
            </Form.Text>
          )}
        </div>
        <div>
          <label htmlFor="colorone" className="mt-3 cursor-pointer">
            <span> Màu chủ đạo 1</span>
            <span
              className="ms-2"
              style={{
                background: data.colorone,
                paddingInline: 10,
                height: 20,
                border: "1px solid black",
              }}
            >
              <input
                id="colorone"
                type="checkbox"
                className="w-0 h-0"
                onChange={(e) =>
                  setTooltip((prev) => {
                    return {
                      visible:
                        prev.target === e.target ? !tooltip.visible : true,
                      target: e.target,
                      info: data.colorone,
                      field: "colorone",
                    };
                  })
                }
              />
            </span>
          </label>
        </div>
        <div>
          <label htmlFor="colortwo" className="mt-3 cursor-pointer">
            <span> Màu chủ đạo 2</span>
            <span
              className="ms-2"
              style={{
                background: data.colortwo,
                paddingInline: 10,
                height: 20,
                border: "1px solid black",
              }}
            >
              <input
                id="colortwo"
                type="checkbox"
                className="w-0 h-0"
                onChange={(e) =>
                  setTooltip((prev) => {
                    return {
                      visible:
                        prev.target === e.target ? !tooltip.visible : true,
                      target: e.target,
                      info: data.colortwo,
                      field: "colortwo",
                    };
                  })
                }
              />
            </span>
          </label>
        </div>
        <div>
          <label htmlFor="colorthree" className="mt-3 cursor-pointer">
            <span> Màu chủ đạo 3</span>
            <span
              className="ms-2"
              style={{
                background: data.colorthree,
                paddingInline: 10,
                height: 20,
                border: "1px solid black",
              }}
            >
              <input
                id="colorthree"
                type="checkbox"
                className="w-0 h-0"
                onChange={(e) =>
                  setTooltip((prev) => {
                    return {
                      visible:
                        prev.target === e.target ? !tooltip.visible : true,
                      target: e.target,
                      info: data.colorthree,
                      field: "colorthree",
                    };
                  })
                }
              />
            </span>
          </label>
        </div>
      </form>
      <CustomTooltip
        propsTooltip={{ className: "custom-picker" }}
        content={
          <ColorPicker
            color={tooltip.info}
            onChange={(color) =>
              setTooltip((prevData) => ({ ...prevData, info: color.hex }))
            }
            // theme={{
            //   background: 'lightgrey',
            //   inputBackground: 'grey',
            //   borderColor: 'darkgrey',
            //   borderRadius: '8px',
            //   color: 'black',
            //   width: '320px'
            // }}
          />
        }
        tooltip={tooltip}
        onClose={onCloseTooltip}
        onDelete={() => {
          setData((prevData) => ({
            ...prevData,
            [tooltip.field]: tooltip.info,
          }));
          onCloseTooltip();
        }}
      />
    </ModalBlock>
  );
}

export default FormSetting;
