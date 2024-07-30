import React from "react";
import { NumericFormat } from "react-number-format";

const CrmSchedule = ({
  list,
  disabled,
  handleAdd,
  handleChange,
  handleRemove,
}) => {
  return (
    <>
      <div className="d-flex gap-2">
        <label>Tùy chỉnh chăm sóc khách hàng</label>
        <button
          disabled={disabled}
          className="btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: 30, height: 30 }}
          onClick={handleAdd}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="row mb-1">
        <div className="col-3">
          <span>Số ngày</span>
        </div>
        <div className="col-6">
          <span>Nội dung</span>
        </div>
        <div className="col-3">
          <span>Thời gian</span>
        </div>
      </div>
      {list.map((item, index) => (
        <div className="row mb-2 g-2" key={index}>
          <div className="col-3">
            <NumericFormat
              id="date"
              thousandSeparator={true}
              prefix={"Ngày "}
              name="date"
              value={item.date}
              displayType={"input"}
              className="form-control"
              disabled={disabled}
              onValueChange={({ value }) =>
                handleChange(index, {
                  target: {
                    name: "date",
                    value,
                  },
                })
              }
            />
          </div>
          <div className="col">
            <input
              type="text"
              name="content"
              value={item.content}
              disabled={disabled}
              onChange={(event) => handleChange(index, event)}
              className="form-control"
            />
          </div>
          <div className="col-3">
            <input
              type="time"
              name="time"
              value={item.time}
              disabled={disabled}
              onChange={(event) => handleChange(index, event)}
              className="form-control"
            />
          </div>
          <div className="col-auto" style={{ maxWidth: "70px" }}>
            <button
              className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center mt-1"
              style={{ width: 30, height: 30 }}
              disabled={list.length === 1 || disabled}
              onClick={(e) => handleRemove(e, index)}
            >
              <i className="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default CrmSchedule;
