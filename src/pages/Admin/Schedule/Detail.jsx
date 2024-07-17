/* eslint-disable react-hooks/exhaustive-deps */
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import { STATUS_LABEL, TYPE_LABEL } from "constants";
import { ROUTES } from "constants/routerWeb";
import { formatCurrency } from "helper/functions";
import _map from "lodash/map";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Badge, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  actionConfirmReminderCareDetail,
  actionDetail,
} from "store/Schedule/action";
import FormConfirm from "./FormConfirm";

function ScheduleDetail(props) {
  const {
    actionStatus: { isLoading: actionLoading },
    detail,
    customer,
    factory,
  } = useSelector((state) => state.scheduleReducer);

  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch();
  const onGetDetailBooking = (id) => dispatch(actionDetail(id));
  const onConfirmReminderCareDetail = (body, note) =>
    dispatch(actionConfirmReminderCareDetail(body, note));

  const [modalData, setModalData] = useState({
    info: {},
    visible: false,
    type: "",
  });
  useEffect(() => {
    if (!actionLoading) onGetDetailBooking(id);
  }, []);

  return (
    <div className="mb-5">
      <TemplateContent
        title="Chi tiết chăm sóc khách hàng"
        showNew
        labelNew="Quay lại"
        btnProps={{
          onClick: () => navigate(ROUTES.ADMIN_SCHEDULE),
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
                      {_size(detail) && (
                        <tr>
                          <td className="align-middle">
                            <LazyLoadImage
                              src={detail[0].service.image}
                              alt={detail[0].service.name}
                              width={50}
                              height={50}
                            />
                          </td>
                          <td className="align-middle">
                            {detail[0].service.name}
                          </td>
                          <td className="align-middle">
                            {formatCurrency(detail[0].service.price)}
                          </td>
                          <td className="align-middle">
                            {detail[0].service.time}
                          </td>
                          <td className="align-middle">
                            {TYPE_LABEL[detail[0].service.category]}
                          </td>
                          <td className="align-middle">
                            <Badge
                              className="py-2 px-3"
                              pill
                              bg={STATUS_LABEL[detail[0].status].bg}
                            >
                              {STATUS_LABEL[detail[0].status].name}
                            </Badge>
                          </td>
                        </tr>
                      )}
                      {_size(detail) && (
                        <tr>
                          <td colSpan="9" className="p-0">
                            <div>
                              <table className="table table-hover table-striped mb-0">
                                <thead>
                                  <tr>
                                    <th scope="col" className="align-middle">
                                      #
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
                                  {_map(detail, (ele, index) => (
                                    <tr key={ele.updatedAt + index}>
                                      <td className="align-middle">
                                        Sau buổi {ele.session}
                                      </td>
                                      <td className="align-middle">
                                        {`${ele.timedate} ${
                                          ele.timehour || ""
                                        }`}
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
                                        {ele.status === "IN_PROCCESS" && (
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
                                            {/* <button
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
                                            </button> */}
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
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
                  width={80}
                  height={80}
                  className="rounded-circle"
                />
                <div>Tên khách hàng: {customer?.fullname || "_"}</div>
                <div>Email: {customer?.email || "_"}</div>
                <div>Số điện thoại: {customer?.phone || "_"}</div>
              </div>
              <hr />
              <h5> Địa chỉ chăm sóc</h5>
              <p>{factory?.name || "_ _ _"}</p>
            </div>
          </div>
        </div>
      </TemplateContent>
      <FormConfirm
        data={modalData}
        onClear={() => setModalData({ info: {}, visible: false, type: "" })}
        onConfirm={(note) => onConfirmReminderCareDetail(modalData.info, note)}
      />
    </div>
  );
}

export default ScheduleDetail;
