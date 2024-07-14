/* eslint-disable react-hooks/exhaustive-deps */
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import { ROUTES } from "constants/routerWeb";
import { formatCurrency } from "helper/functions";
import _map from "lodash/map";
import _size from "lodash/size";
import { Fragment, useEffect, useState } from "react";
import { Badge, Collapse, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionDetail } from "store/Booking/action";
const STATUS_LABEL = {
  IN_PROCCESS: { bg: "secondary", name: "Chưa duyệt" },
  CONFIRMED: { bg: "success", name: "Đã duyệt" },
  DESTROYED: { bg: "danger", name: "Đã hủy" },
};

const TYPE_LABEL = {
  TRIET_LONG: "Triệt lông",
  CHAM_DA: "Chăm da",
};
function BookingDetail(props) {
  const {
    actionStatus: { isLoading: actionLoading },
    detail,
    customer,
  } = useSelector((state) => state.bookingReducer);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const onGetDetailBooking = (id) => dispatch(actionDetail(id));

  const [expandedRows, setExpandedRows] = useState(-1);

  useEffect(() => {
    if (!actionLoading) onGetDetailBooking(id);
  }, []);

  const handleExpandCollapse = (index) => {
    setExpandedRows((prev) => {
      if (prev === index) return -1;
      return index;
    });
  };
  return (
    <div className="mb-5">
      <TemplateContent
        title="Chi tiết đặt lịch"
        showNew
        labelNew="Quay lại"
        btnProps={{
          onClick: () => navigate(ROUTES.ADMIN_BOOKING),
          variant: "outline-primary",
        }}
        cardProps={{ className: "col-12" }}
      >
        <div className="container-fluid">
          <div className="row gap-2">
            <div className="col-9 card">
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
                  </tr>
                </thead>
                <tbody>
                  {actionLoading ? (
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
                  ) : (
                    <>
                      {!_size(detail) && (
                        <tr>
                          <td colSpan={9}>
                            <div className="text-center">
                              Không có lời hẹn nào
                            </div>
                          </td>
                        </tr>
                      )}
                      {_map(detail, (item, index) => (
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
                            <td className="align-middle">
                              {item.service.name}
                            </td>
                            <td className="align-middle">
                              {formatCurrency(item.service.price)}
                            </td>
                            <td className="align-middle">
                              {item.service.time}
                            </td>
                            <td className="align-middle">
                              {TYPE_LABEL[item.service.category]}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="9" className="p-0">
                              <Collapse in={expandedRows === index}>
                                <div className="p-2">
                                  <table className="table table-hover table-striped mb-0">
                                    <thead>
                                      <tr>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          #
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Số điện thoại
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Thời gian
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Cơ sở
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Trạng thái
                                        </th>
                                        <th
                                          scope="col"
                                          className="align-middle"
                                        >
                                          Ghi chú
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {_map(item.list, (ele, index) => (
                                        <tr key={ele.service.updatedAt + index}>
                                          <td className="align-middle">
                                            {index + 1}
                                          </td>
                                          <td className="align-middle">
                                            {ele.phone}
                                          </td>
                                          <td className="align-middle">
                                            {`${ele.timedate} ${ele.timehour}`}
                                          </td>
                                          <td className="align-middle">
                                            {ele?.factory?.name || "_"}
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
                    </>
                  )}
                </tbody>
              </table>
            </div>
            <div className="col card text-center py-3">
              <h5>Thông tin khách hàng</h5>
              <div>
                <LazyLoadImage
                  src={customer?.image}
                  alt={customer?.name}
                  width={200}
                  height={200}
                  className="rounded-circle"
                />
                <div>Tên khách hàng: {customer?.fullname || "_"}</div>
                <div>Email: {customer?.email || "_"}</div>
                <div>Số điện thoại: {customer?.phone || "_"}</div>
              </div>
            </div>
          </div>
        </div>
      </TemplateContent>
    </div>
  );
}

export default BookingDetail;
