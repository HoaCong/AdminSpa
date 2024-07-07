// react-bootstrap components

import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Form, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionDelete, actionGetList, resetData } from "store/Factory/action";
import FormFactory from "./FormFactory";
function Factory() {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.factoryReducer);

  const dispatch = useDispatch();
  const onGetListFactory = (body) => dispatch(actionGetList(body));
  const onDeleteFactory = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState({
    topic: {},
    visible: false,
    type: "",
  });
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
  });

  useEffect(() => {
    if (!isLoading) onGetListFactory(params);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListFactory({ ...params, page });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };
  return (
    <>
      <TemplateContent
        title="Danh sách cơ sở"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
      >
        <Table className="table-hover table-striped">
          <thead>
            <tr>
              <th className="align-middle">#</th>
              <th className="align-middle">Tên cơ sở</th>
              <th className="align-middle">Trạng thái</th>
              <th className="align-middle">Hành động</th>
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
              <tr key={item.id}>
                <th scope="row" className="align-middle">
                  {index + 1}
                </th>
                <td className="align-middle">{item.name}</td>
                <td className="align-middle">
                  <Form>
                    <Form.Check
                      checked={item.active}
                      type="switch"
                      id="custom-switch"
                      className="fs-4"
                      onChange={() => {}}
                    />
                  </Form>
                </td>
                <td className="align-middle" style={{ width: 200 }}>
                  <ActionTable
                    onDetail={() =>
                      setDetail({
                        info: item,
                        visible: true,
                        type: "detail",
                      })
                    }
                    onEdit={() =>
                      setDetail({ info: item, visible: true, type: "edit" })
                    }
                    onDelete={(e) => {
                      setTooltip((prev) => {
                        return {
                          visible:
                            prev.target === e.target ? !tooltip.visible : true,
                          target: e.target,
                          id: item.id,
                        };
                      });
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <FormFactory
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
      <CustomTooltip
        content="Bạn có chắc muốn xóa cơ sở này không?"
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteFactory(tooltip.id)}
      />
    </>
  );
}

export default Factory;
