/* eslint-disable react-hooks/exhaustive-deps */
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import { ROUTES } from "constants/routerWeb";
import { formatCurrency, parserRouter } from "helper/functions";
import _map from "lodash/map";
import _omit from "lodash/omit";
import _size from "lodash/size";
import { Fragment, useEffect, useState } from "react";
import { Badge, Button, Collapse, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  actionConfirm,
  actionDestroy,
  actionGetList,
  resetData,
} from "store/Booking/action";
import FormBooking from "./FormBooking";
const initialData = { query: "", timedate: "", timehour: "", status: 0 };
const STATUS = [
  { id: 0, name: "Tất cả" },
  { id: "IN_PROCCESS", name: "Chưa duyệt" },
  { id: "CONFIRMED", name: "Đã duyệt" },
  { id: "DESTROYED", name: "Đã hủy" },
];
const STATUS_LABEL = {
  IN_PROCCESS: { bg: "secondary", name: "Chưa duyệt" },
  CONFIRMED: { bg: "success", name: "Đã duyệt" },
  DESTROYED: { bg: "danger", name: "Đã hủy" },
};

const TYPE_LABEL = {
  TRIET_LONG: "Triệt lông",
  CHAM_DA: "Chăm da",
};
function Booking(props) {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.bookingReducer);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onGetListBooking = (body) => dispatch(actionGetList(body));
  const onConfirmBooking = (body) => dispatch(actionConfirm(body));
  const onDestroyBooking = (body) => dispatch(actionDestroy(body));
  const onResetData = () => dispatch(resetData());

  const [detail, setDetail] = useState({
    info: {},
    visible: false,
    type: "",
  });

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState(-1);
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    info: null,
    type: null,
  });

  useEffect(() => {
    if (!isLoading) onGetListBooking(params);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) {
      if (tooltip.type === "confirm")
        navigate(parserRouter(ROUTES.ADMIN_BOOKING_DETAIL, tooltip.info.id));
      onCloseTooltip();
    }
  }, [actionSuccess]);

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

  const handleExpandCollapse = (index) => {
    setExpandedRows((prev) => {
      if (prev === index) return -1;
      return index;
    });
  };

  const handleDetailBooking = (id) => {
    navigate(parserRouter(ROUTES.ADMIN_BOOKING_DETAIL, id));
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      info: null,
      type: null,
    });
  };

  const handleAction = (id, type) => {
    if (type === "confirm") onConfirmBooking(id);
    if (type === "destroy") onDestroyBooking(id);
  };
  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách đặt lịch"
        filter={
          <div>
            <div className="row">
              <div className="col-6 col-md-3">
                <Form.Label htmlFor="search">Tìm kiếm </Form.Label>
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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" className="align-middle"></th>
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
                Trạng thái
              </th>
              <th scope="col" className="align-middle">
                Ghi chú
              </th>
              <th scope="col" className="align-middle">
                Hành động
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
              <Fragment key={item.updatedAt + index}>
                <tr onClick={() => handleExpandCollapse(index)}>
                  <th scope="row" className="align-middle">
                    <div style={{ width: 16 }}>
                      {expandedRows === index ? (
                        <i className="fas fa-chevron-down text-secondary"></i>
                      ) : (
                        <i className="fas fa-chevron-right text-secondary"></i>
                      )}
                    </div>
                  </th>
                  <th scope="row" className="align-middle">
                    {index + 1}
                  </th>
                  <td className="align-middle">
                    {item.customer.fullName || "_"}
                  </td>
                  <td className="align-middle">{item.phone}</td>
                  <td className="align-middle">
                    {`${item.timedate} ${item.timehour}`}
                  </td>
                  <td className="align-middle">{item?.factory?.name || "_"}</td>
                  <td className="align-middle">
                    <Badge pill bg={STATUS_LABEL[item.status].bg}>
                      {STATUS_LABEL[item.status].name}
                    </Badge>
                  </td>
                  <td className="align-middle">{item.note || "_"}</td>
                  <td className="align-middle">
                    {item.status === "CONFIRMED" && (
                      <button
                        className="btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center"
                        style={{ width: 30, height: 30 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDetailBooking(item.id);
                        }}
                      >
                        <i className="far fa-eye"></i>
                      </button>
                    )}
                    {item.status === "IN_PROCCESS" && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-success rounded-circle d-flex justify-content-center align-items-center"
                          style={{ width: 30, height: 30 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setTooltip((prev) => {
                              return {
                                visible:
                                  prev.target === e.target
                                    ? !tooltip.visible
                                    : true,
                                target: e.target,
                                info: item,
                                type: "confirm",
                              };
                            });
                          }}
                        >
                          <i className="far fa-check-circle"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
                          style={{ width: 30, height: 30 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setTooltip((prev) => {
                              return {
                                visible:
                                  prev.target === e.target
                                    ? !tooltip.visible
                                    : true,
                                target: e.target,
                                info: item,
                                type: "destroy",
                              };
                            });
                          }}
                        >
                          <i className="far fa-times-circle"></i>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="9" className="p-0">
                    <Collapse in={expandedRows === index}>
                      <div className="p-2">
                        <table className="table table-hover table-striped mb-0">
                          <thead>
                            <tr>
                              <th scope="col" className="align-middle">
                                #
                              </th>
                              <th scope="col" className="align-middle">
                                Hình ảnh
                              </th>
                              <th scope="col" className="align-middle">
                                Tên dịch vụ
                              </th>
                              <th scope="col" className="align-middle">
                                Số buổi
                              </th>
                              <th scope="col" className="align-middle">
                                Giá
                              </th>
                              <th scope="col" className="align-middle">
                                Thời gian
                              </th>
                              <th scope="col" className="align-middle">
                                Danh mục
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.listService.map((item, index) => (
                              <tr key={item.updatedAt + index}>
                                <th scope="row" className="align-middle">
                                  {index + 1}
                                </th>
                                <td className="align-middle">
                                  <LazyLoadImage
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  />
                                </td>
                                <td className="align-middle">{item.name}</td>
                                <td className="align-middle">
                                  {item.numbersesion} buổi
                                </td>
                                <td className="align-middle">
                                  {formatCurrency(item.price)}
                                </td>
                                <td className="align-middle">{item.time}</td>
                                <td className="align-middle">
                                  {TYPE_LABEL[item.category]}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </Fragment>
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
          tooltip.type === "confirm" ? "xác nhận " : "từ chối"
        } lịch đặt này không?`}
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => handleAction(tooltip.info.id, tooltip.type)}
      />
    </div>
  );
}

export default Booking;
