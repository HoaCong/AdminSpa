// react-bootstrap components
import TemplateContent from "components/layout/TemplateContent";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGet, resetData } from "store/Setting/action";
import FormSetting from "./FormSetting";
function Setting() {
  const {
    dataStatus: { isLoading },
    data,
  } = useSelector((state) => state.settingReducer);

  const dispatch = useDispatch();
  const onGetSetting = (body) => dispatch(actionGet(body));
  const onResetData = () => dispatch(resetData());

  const [detail, setDetail] = useState({
    topic: {},
    visible: false,
    type: "",
  });

  useEffect(() => {
    if (!isLoading) onGetSetting();
    return () => {
      onResetData();
    };
  }, []);

  return (
    <>
      <TemplateContent
        title="Cấu hình"
        labelNew="Cập nhật"
        showNew
        btnProps={{
          onClick: () => setDetail({ info: data, visible: true, type: "edit" }),
        }}
      >
        <div>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center w-full py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="row">
              <div className="col-4">
                <p>Logo: {data.logo}</p>
                <p>Tên shop: {data.nameBanner}</p>
                <p>Số điện thoại: {data.numberPhone}</p>
              </div>
              <div className="col-4">
                <div className="">
                  <span> Màu chủ đạo 1</span>
                  <span
                    className="ms-2"
                    style={{
                      background: data.colorone,
                      paddingInline: 10,
                      height: 20,
                      border: "1px solid black",
                    }}
                  ></span>
                </div>
                <div className="mt-3">
                  <span> Màu chủ đạo 2</span>
                  <span
                    className="ms-2"
                    style={{
                      background: data.colortwo,
                      paddingInline: 10,
                      height: 20,
                      border: "1px solid black",
                    }}
                  ></span>
                </div>
                <div className="mt-3">
                  <span> Màu chủ đạo 3</span>
                  <span
                    className="ms-2"
                    style={{
                      background: data.colorthree,
                      paddingInline: 10,
                      height: 20,
                      border: "1px solid black",
                    }}
                  ></span>
                </div>
              </div>
              <div className="col-4">
                <p>Nhắc nhở trước: {data.reminderbefore || 0} ngày</p>
                <p>Nhắc nhở chăm sóc sau: {data.remindercarebelow || 0} ngày</p>
                <p>Nhắc nhở chăm sóc trước: {data.remindercaretop || 0} ngày</p>
              </div>
            </div>
          )}
        </div>
      </TemplateContent>
      <FormSetting
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
    </>
  );
}

export default Setting;
