/* eslint-disable react-hooks/exhaustive-deps */
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import { STATUS_LABEL, TYPE_LABEL } from "constants";
import { ROUTES } from "constants/routerWeb";
import { formatCurrency, parserRouter } from "helper/functions";
import { Fragment, useEffect, useState } from "react";
import { Badge, Collapse, Spinner, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  actionConfirmReminderCare,
  actionConfirmSchedules,
  actionDestroySchedules,
  actionGetList,
  resetData,
} from "store/Schedule/action";
import FormConfirm from "./FormConfirm";

function Schedule(props) {
  const {
    listStatus: { isLoading },
    list,
  } = useSelector((state) => state.scheduleReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onGetListBooking = (tab) => dispatch(actionGetList(tab));
  const onConfirmSChedules = (body, note) =>
    dispatch(actionConfirmSchedules(body, note));
  const onDestroySChedules = (body, note) =>
    dispatch(actionDestroySchedules(body, note));
  const onConfirmReminderCare = (body, note) =>
    dispatch(actionConfirmReminderCare(body, note));

  const onResetData = () => dispatch(resetData());
  const [expandedRows, setExpandedRows] = useState(-1);

  const [currentTab, setCurrentTab] = useState("today");

  useEffect(() => {
    if (!isLoading) onGetListBooking(currentTab);
    return () => {
      onResetData();
    };
  }, []);

  const handleSelect = (key) => {
    setCurrentTab(key);
    onGetListBooking(key);
    setExpandedRows(-1);
  };

  const handleExpandCollapse = (index) => {
    setExpandedRows((prev) => {
      if (prev === index) return -1;
      return index;
    });
  };

  const handleDetailSchedule = (id) => {
    navigate(parserRouter(ROUTES.ADMIN_SCHEDULE_DETAIL, id));
  };

  const [modalData, setModalData] = useState({
    info: {},
    visible: false,
    type: "",
  });

  const handleConfirmAction = (note) => {
    if (currentTab === "today") {
      onConfirmSChedules(modalData.info, note);
    }
    if (currentTab === "reminder") {
      onConfirmSChedules(modalData.info, note);
    }
    if (currentTab === "remindercare") {
      onConfirmReminderCare(modalData.info, note);
    }
  };
  const handleDestroyAction = (note) => {
    if (currentTab === "today") {
      onDestroySChedules(modalData.info, note);
    }
    if (currentTab === "reminder") {
      onDestroySChedules(modalData.info, note);
    }
  };

  const ContentTab = (
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
        {isLoading ? (
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
            {!list.length && (
              <tr>
                <td colSpan={9}>
                  <div className="text-center">Không có lời hẹn nào</div>
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
                    {item.sessionreminder
                      ? `Buổi ${item.sessionreminder}`
                      : index + 1}
                  </th>
                  <td className="align-middle">
                    {item.customer.fullName || "_"}
                  </td>
                  <td className="align-middle">
                    <Link
                      className="link_router text-primary"
                      to={parserRouter(
                        ROUTES.ADMIN_CUSTOMER_DETAIL,
                        item.idcustomer
                      )}
                    >
                      {item.phone}
                    </Link>
                  </td>
                  <td className="align-middle">
                    {`${item.timedate} ${item.timehour || ""}`}
                  </td>
                  <td className="align-middle">{item?.factory?.name || "_"}</td>
                  <td className="align-middle">
                    <Badge
                      className="py-2 px-3"
                      pill
                      bg={STATUS_LABEL[item.status].bg}
                    >
                      {STATUS_LABEL[item.status].name}
                    </Badge>
                  </td>
                  <td className="align-middle">{item.note || "_"}</td>
                  <td className="align-middle">
                    {currentTab !== "remindercare" &&
                      item.status === "IN_PROCCESS" && (
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
                                info: item,
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
                                info: item,
                                visible: true,
                                type: "destroy",
                              });
                            }}
                          >
                            <i className="far fa-times-circle"></i>
                          </button>
                        </div>
                      )}
                    {currentTab === "remindercare" && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center"
                          style={{ width: 30, height: 30 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDetailSchedule(item.idbookingdetail);
                          }}
                        >
                          <i className="far fa-eye"></i>
                        </button>
                        {item.status === "IN_PROCCESS" && (
                          <button
                            className="btn btn-outline-success rounded-circle d-flex justify-content-center align-items-center"
                            style={{ width: 30, height: 30 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalData({
                                info: item,
                                visible: true,
                                type: "confirm",
                              });
                            }}
                          >
                            <i className="far fa-check-circle"></i>
                          </button>
                        )}
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
                            <tr>
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
  );

  return (
    <div className="mb-5">
      <TemplateContent title="Danh sách lịch hẹn">
        <Tabs
          activeKey={currentTab}
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={handleSelect}
        >
          <Tab eventKey="today" title="Hôm nay"></Tab>
          <Tab eventKey="reminder" title="Ngày tái hẹn"></Tab>
          <Tab eventKey="remindercare" title="Chăm sóc khách hàng"></Tab>
        </Tabs>
        {ContentTab}
      </TemplateContent>
      <FormConfirm
        data={modalData}
        onClear={() => setModalData({ info: {}, visible: false, type: "" })}
        onConfirm={handleConfirmAction}
        onDestroy={handleDestroyAction}
      />
    </div>
  );
}

export default Schedule;
