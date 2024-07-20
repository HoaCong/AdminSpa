/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import { TIME } from "constants";
import { format } from "date-fns";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _omit from "lodash/omit";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Booking/action";
import { actionGetList } from "store/Factory/action";
import SelectCustomer from "./SelectCustomer";
import SelectService from "./SelectService";
const initialData = {
  customer: null,
  factory: "",
  listService: [],
  timedate: null,
  timehour: TIME[0],
  note: "",
};
function FormBooking({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.bookingReducer);
  const {
    // actionStatus: { isLoading, isSuccess },
    list: listFactory,
  } = useSelector((state) => state.factoryReducer);

  const dispatch = useDispatch();
  const onGetFactory = (body) => dispatch(actionGetList(body));
  const onAddBooking = (body) => dispatch(actionAdd(body));
  const onEditBooking = (body) => dispatch(actionEdit(body));

  const [data, setData] = useState(initialData);
  const [error, setError] = useState(initialData);

  useEffect(() => {
    onGetFactory({ limit: 25, page: 1 });
  }, []);

  useEffect(() => {
    if (!_isEmpty(info)) {
      const {
        id,
        factory,
        customer,
        listService,
        note,
        status,
        timedate,
        timehour,
      } = info;
      setData({
        id,
        factory,
        customer,
        listService,
        note,
        status,
        timedate,
        timehour,
      });
    }
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      onClear();
      setData(initialData);
    }
  }, [isSuccess]);

  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    edit: "Chỉnh sửa đặt lịch",
    create: "Thêm mới đặt lịch",
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };
  const handleSubmit = () => {
    const tmpKey = Object.keys(_omit(data, ["timehour", "note", "id"]));
    let validates = true;
    tmpKey.forEach((key) => {
      if (_isEmpty(data[key])) {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
    });
    if (validates) {
      const newData = {
        idcustomer: data.customer.id,
        phone: data.customer.phone,
        note: data.note,
        factoryid: data.factory,
        services: JSON.stringify(data.listService.map((item) => item.id)),
        timedate: data.timedate,
        timehour: data.timehour,
      };
      if (type === "create") onAddBooking(newData);
      if (type === "edit") {
        newData.id = data?.id;
        onEditBooking(newData);
      }
    }
  };

  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      loading={isLoading}
      propsModal={{
        size: "lg",
      }}
    >
      <form className="row">
        <div className="col-6">
          <Form.Label htmlFor="Customer">
            Cơ sở <span className="required">*</span>
          </Form.Label>
          <Form.Select
            id="factory"
            aria-label="Cơ sở"
            name="factory"
            placeholder="Cơ sở"
            value={data.factory}
            onChange={handleChange}
            disabled={type === "edit"}
          >
            <option value="" disabled hidden>
              Cơ sở
            </option>
            {listFactory.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          {error.factory && (
            <Form.Text
              id="helperFactory"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.factory}
            </Form.Text>
          )}
        </div>
        <div className="col-6">
          <Form.Label htmlFor="Customer">
            Thời gian <span className="required">*</span>
          </Form.Label>
          <div className="d-flex gap-2 align-items-center">
            <div style={{ width: 150 }}>
              <DatePicker
                placeholderText="Ngày"
                disabled={type === "edit"}
                selected={data.timedate}
                dateFormat="dd/MM/yyyy" // Định dạng ngày
                className="form-control"
                name="timedate"
                minDate={new Date()}
                onChange={(timedate) => {
                  setData((prev) => ({
                    ...prev,
                    timedate: format(timedate, "yyyy-MM-dd"),
                  }));
                  setError((prev) => ({ ...prev, timedate: "" }));
                }}
              />
            </div>
            <span>-</span>
            <Form.Select
              id="time"
              aria-label="Giờ"
              disabled={type === "edit"}
              name="timehour"
              placeholder="Giờ"
              value={data.timehour}
              style={{ maxWidth: 100 }}
              onChange={handleChange}
            >
              <option value="" disabled hidden>
                Giờ
              </option>
              {TIME.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          </div>
          {error.timedate && (
            <Form.Text
              id="helperTimedate"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.timedate}
            </Form.Text>
          )}
        </div>
        <div className="col-12 mt-2">
          <Form.Label htmlFor="Customer">
            Khách hàng <span className="required">*</span>
          </Form.Label>
          <SelectCustomer
            name="customer"
            disabled={type === "edit"}
            customer={data.customer}
            selectCustomer={(customer) => {
              setData((prev) => ({ ...prev, customer }));
              setError((prev) => ({ ...prev, customer: "" }));
            }}
          />
          {error.customer && (
            <Form.Text
              id="helperCustomer"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.customer}
            </Form.Text>
          )}
        </div>
        <div className="mt-2">
          <Form.Label htmlFor="Service">
            Dịch vụ <span className="required">*</span>
          </Form.Label>
          <SelectService
            listService={data.listService}
            selectService={(listService) => {
              setData((prev) => ({ ...prev, listService }));
              setError((prev) => ({ ...prev, listService: "" }));
            }}
          />
          {error.listService && (
            <Form.Text
              id="helperService"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.listService}
            </Form.Text>
          )}
        </div>
        <div className="mt-2">
          <Form.Label htmlFor="Note">Ghi chú</Form.Label>
          <Form.Control
            as="textarea"
            value={data.note}
            name="note"
            rows={2}
            onChange={handleChange}
          />
        </div>
      </form>
    </ModalBlock>
  );
}

export default FormBooking;
