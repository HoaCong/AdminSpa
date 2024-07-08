/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import TemplateContent from "components/layout/TemplateContent";
import _map from "lodash/map";
import _omit from "lodash/omit";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionDelete, actionGetList, resetData } from "store/Booking/action";
import FormBooking from "./FormBooking";
const initialData = { query: "", timedate: "", timehour: "" };
const STATUS = [
  { id: 0, name: "Tất cả" },
  { id: "IN_PROCESS", name: "Chưa duyệt" },
  { id: "APPROVED", name: "Đã duyệt" },
];
function Booking(props) {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.bookingReducer);

  const dispatch = useDispatch();
  const onGetListBooking = (body) => dispatch(actionGetList(body));
  const onDeleteBooking = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [detail, setDetail] = useState({
    info: {},
    visible: false,
    type: "",
  });
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    info: null,
  });
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isLoading) onGetListBooking(params);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      info: null,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListBooking({ ...params, page });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearch = (type) => {
    const query = !data.query || type === "reset" ? null : data.query.trim();
    const timedate =
      !data.timedate || type === "reset" ? null : data.timedate.trim();
    const timehour =
      !data.timehour || type === "reset" ? null : data.timehour.trim();
    const status = !data.status || type === "reset" ? null : data.status;
    const newParams = _omit(params, ["query"]);
    onGetListBooking({ ...newParams, query, status, timedate, timehour });
    if (type === "reset") setData(initialData);
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách đặt lịch"
        filter={
          <div>
            <div className="row">
              <div className="col-6 col-md-3">
                <Form.Label htmlFor="search">Tìm kiếm</Form.Label>
                <Form.Control
                  id="search"
                  aria-label="Tìm kiếm"
                  placeholder="Tìm kiếm"
                  name="query"
                  value={data.query}
                  onChange={handleChange}
                ></Form.Control>
              </div>
              <div className="col-6 col-md-3">
                <Form.Label htmlFor="search">Ngày</Form.Label>
                <Form.Control
                  id="search"
                  aria-label="Ngày"
                  placeholder="Ngày"
                  name="timedate"
                  value={data.timedate}
                  onChange={handleChange}
                ></Form.Control>
              </div>
              <div className="col-6 col-md-3">
                <Form.Label htmlFor="search">Giờ</Form.Label>
                <Form.Control
                  id="search"
                  aria-label="Giờ"
                  placeholder="Giờ"
                  name="timehour"
                  value={data.timehour}
                  onChange={handleChange}
                ></Form.Control>
              </div>
              <div className="col-6 col-md-3">
                <Form.Label htmlFor="status">Trạng thái</Form.Label>
                <Form.Select
                  id="status"
                  aria-label="Trạng thái"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                >
                  {_map(STATUS, (item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <Button
                onClick={() => handleSearch("filter")}
                disabled={isLoading && _size(list) > 0}
              >
                Tìm kiếm
              </Button>
              <Button
                variant="outline-secondary"
                disabled={isLoading && _size(list) > 0}
                onClick={() => handleSearch("reset")}
              >
                Đặt lại
              </Button>
            </div>
          </div>
        }
      >
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th scope="col" className="align-middle">
                #
              </th>
              <th scope="col" className="align-middle">
                Khách hàng
              </th>
              <th scope="col" className="align-middle">
                Số điện thoại
              </th>
              <th scope="col" className="align-middle">
                Thời gian
              </th>
              <th scope="col" className="align-middle">
                Cơ sở
              </th>
              <th scope="col" className="align-middle">
                Ghi chú
              </th>
              <th scope="col" className="align-middle">
                Trạng thái{" "}
              </th>
              <th scope="col" className="align-middle">
                Hành động{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={9}>
                  <div
                    className="d-flex justify-content-center align-items-center w-full"
                    style={{ height: 400 }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                </td>
              </tr>
            )}
            {list.map((item, index) => (
              <tr key={item.updatedAt + index}>
                <th scope="row" className="align-middle">
                  {index + 1}
                </th>
                <td className="align-middle">
                  {item.customer.fullName || "_"}
                </td>
                <td className="align-middle">{item.phone}</td>
                <td className="align-middle">{`${item.timedate} ${item.timehour}`}</td>
                <td className="align-middle">{item?.factory?.name || "_"}</td>
                <td className="align-middle">{item.note || "_"}</td>
                <td className="align-middle">
                  {item.status === "IN_PROCESS" ? "Chưa duyệt" : "Đã duyệt"}
                </td>
                <td className="align-middle">
                  <ActionTable
                    onDetail={() =>
                      setDetail({ info: item, visible: true, type: "detail" })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <FormBooking
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
      <CustomTooltip
        content={`Bạn có chắc muốn ${
          tooltip.info?.active ? "hủy " : ""
        }kích hoạt dịch vụ này không?`}
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteBooking(tooltip.info.id)}
      />
    </div>
  );
}

export default Booking;
