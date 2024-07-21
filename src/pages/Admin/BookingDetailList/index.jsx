/* eslint-disable react-hooks/exhaustive-deps */
import CustomPagination from "components/common/CustomPagination";
import LazyLoadImage from "components/common/LazyLoadImage";
import LinearProgress from "components/common/LinearProgress";
import TemplateContent from "components/layout/TemplateContent";
import { STATUS_2, STATUS_LABEL, TIME, TYPE_LABEL } from "constants";
import { ROUTES } from "constants/routerWeb";
import { format } from "date-fns";
import { formatCurrency, getIndexActive, parserRouter } from "helper/functions";
import _map from "lodash/map";
import _omit from "lodash/omit";
import _size from "lodash/size";
import { Fragment, useEffect, useState } from "react";
import { Badge, Button, Collapse, Form, Spinner } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionGetList, resetData } from "store/BookingDetailList/action";
import FormConfirm from "../Booking/FormConfirm";
const initialData = { query: "", timedate: "", timehour: "", status: 0 };

function BookingDetailList(props) {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.bookingDetailReducer);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const onGetListBookingDetailList = (body) => dispatch(actionGetList(body));
  const onResetData = () => dispatch(resetData());

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState(-1);
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    info: null,
    type: null,
  });

  const [modalData, setModalData] = useState({
    info: {},
    visible: false,
    type: "",
  });

  useEffect(() => {
    if (!isLoading) onGetListBookingDetailList(params);
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
    onGetListBookingDetailList({ ...params, page });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearch = (type) => {
    const query = !data.query || type === "reset" ? null : data.query.trim();
    const timedate =
      !data.timedate || type === "reset"
        ? null
        : format(data.timedate, "yyyy-MM-dd");
    const timehour =
      !data.timehour || type === "reset" ? null : data.timehour.trim();
    const status = !data.status || type === "reset" ? null : data.status;
    const newParams = _omit(params, ["query"]);
    onGetListBookingDetailList({
      ...newParams,
      query,
      status,
      timedate,
      timehour,
      page: 1,
    });
    if (type === "reset") setData(initialData);
    setCurrentPage(1);
  };

  const handleExpandCollapse = (index) => {
    setExpandedRows((prev) => {
      if (prev === index) return -1;
      return index;
    });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      info: null,
      type: null,
    });
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách lịch đặt chi tiết"
        filter={
          <div>
            <div className="row g-2">
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
              <div className="col-auto">
                <Form.Label htmlFor="search">Ngày - Giờ</Form.Label>
                <div className="d-flex gap-2 align-items-center">
                  <div style={{ width: 150 }}>
                    <DatePicker
                      placeholderText="Ngày"
                      selected={data.timedate}
                      dateFormat="dd/MM/yyyy" // Định dạng ngày
                      className="form-control"
                      name="timedate"
                      onChange={(timedate) => {
                        setData((prevData) => ({ ...prevData, timedate }));
                      }}
                    />
                  </div>
                  <span>-</span>
                  <Form.Select
                    id="time"
                    aria-label="Giờ"
                    name="timehour"
                    placeholder="Giờ"
                    value={data.timehour}
                    style={{ maxWidth: 100 }}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      Giờ
                    </option>
                    {_map(TIME, (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </div>

              <div className="col-auto">
                <Form.Label htmlFor="status">Trạng thái</Form.Label>
                <Form.Select
                  id="status"
                  aria-label="Trạng thái"
                  name="status"
                  value={data.status}
                  onChange={handleChange}
                >
                  {_map(STATUS_2, (item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-auto">
                <div className="d-flex gap-2 h-100 align-items-end">
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
            </div>
          </div>
        }
      >
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col" className="align-middle"></th>
              <th scope="col" className="align-middle">
                Hình ảnh
              </th>
              <th scope="col" className="align-middle">
                Tên dịch vụ
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
              <th scope="col" className="align-middle">
                Trạng thái
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
              <Fragment key={item.service.updatedAt + index}>
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
                  <td className="align-middle">
                    <LazyLoadImage
                      src={item.service.image}
                      alt={item.service.name}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="align-middle">{item.service.name}</td>
                  <td className="align-middle">
                    {formatCurrency(item.service.price)}
                  </td>
                  <td className="align-middle">{item.service.time}</td>
                  <td className="align-middle">
                    {TYPE_LABEL[item.service.category]}
                  </td>
                  <td className="align-middle">
                    <Badge
                      className="py-2 px-3"
                      pill
                      bg={STATUS_LABEL[item.status].bg}
                    >
                      {STATUS_LABEL[item.status].name}
                    </Badge>
                  </td>
                  <td className="align-middle">
                    {item.status === "IN_PROCCESS" && (
                      <button
                        className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalData({
                            info: item.dataSchedule[0],
                            visible: true,
                            type: "destroy",
                          });
                        }}
                      >
                        <i className="far fa-times-circle"></i>
                      </button>
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
                                Khách hàng
                              </th>
                              <th scope="col" className="align-middle">
                                Số điện thoại
                              </th>
                              <th scope="col" className="align-middle">
                                Thời gian
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
                            {_map(item.dataSchedule, (ele, index) => (
                              <tr key={ele.updatedAt + index}>
                                <td className="align-middle">
                                  Buổi {ele.session}
                                </td>
                                <td className="align-middle">
                                  {item.customer.name || "_"}
                                </td>
                                <td className="align-middle">
                                  <Link
                                    className="link_router"
                                    to={parserRouter(
                                      ROUTES.ADMIN_CUSTOMER_DETAIL,
                                      item.customer.id
                                    )}
                                  >
                                    {item.customer.phone}
                                  </Link>
                                </td>
                                <td className="align-middle">
                                  {`${ele.timedate} ${ele.timehour}`}
                                </td>
                                <td className="align-middle">
                                  <Badge
                                    className="py-2 px-3"
                                    pill
                                    bg={STATUS_LABEL[ele.status].bg}
                                  >
                                    {STATUS_LABEL[ele.status].name}
                                  </Badge>
                                </td>
                                <td className="align-middle">
                                  {ele.note || "_"}
                                </td>
                                <td className="align-middle">
                                  {ele.session ===
                                    getIndexActive(item.dataSchedule) && (
                                    <div className="d-flex gap-2">
                                      <button
                                        className="btn btn-outline-success rounded-circle d-flex justify-content-center align-items-center"
                                        style={{
                                          width: 30,
                                          height: 30,
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setModalData({
                                            info: ele,
                                            visible: true,
                                            type: "confirm",
                                          });
                                        }}
                                      >
                                        <i className="far fa-check-circle"></i>
                                      </button>
                                      <button
                                        className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
                                        style={{
                                          width: 30,
                                          height: 30,
                                        }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setModalData({
                                            info: ele,
                                            visible: true,
                                            type: "destroy",
                                          });
                                        }}
                                      >
                                        <i className="far fa-times-circle"></i>
                                      </button>
                                    </div>
                                  )}
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
        {isLoading && _size(list) > 0 && (
          <div className="mb-2">
            <LinearProgress />
          </div>
        )}
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <FormConfirm
        data={modalData}
        onClear={() => setModalData({ info: {}, visible: false, type: "" })}
      />
    </div>
  );
}

export default BookingDetailList;
