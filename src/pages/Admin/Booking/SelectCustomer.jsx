/* eslint-disable react-hooks/exhaustive-deps */
import _debounce from "lodash/debounce";
import _size from "lodash/size";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { actionGetList } from "store/Customer/action";

function SelectCustomer({ disabled = false, customer, selectCustomer }) {
  const {
    listStatus: { isLoading },
    list: listCustomers,
  } = useSelector((state) => state.customerReducer);
  const dispatch = useDispatch();
  const onGetCustomer = (body) => dispatch(actionGetList(body));
  const handleFocusCustomer = () => {
    if (!_size(listCustomers) && !isLoading)
      onGetCustomer({ limit: 10, page: 1 });
  };
  const debouncedSearchCustomer = useCallback(
    _debounce((query) => {
      onGetCustomer({ limit: 10, page: 1, query });
    }, 400),
    []
  );
  const handleSearchCustomer = (newValue, actionMeta) => {
    if (actionMeta.action === "input-change") {
      debouncedSearchCustomer(newValue);
    }
  };
  const resetCustomer = () => {
    selectCustomer(null);
    onGetCustomer({ limit: 10, page: 1 });
  };
  const makeListCustomer = (list) => {
    return list.map((item) => ({
      value: item.id,
      label: `${item.phone} (${item.fullname || "No Name"})`,
      item: item,
    }));
  };
  return (
    <>
      {customer?.phone ? (
        <div>
          <i className="fas fa-user me-2"></i>
          {`${customer.phone} (${customer.fullname || "No Name"})`}
          {!disabled && (
            <i
              className="fas fa-times ms-2 text-danger"
              onClick={() => resetCustomer()}
            ></i>
          )}
        </div>
      ) : (
        <Select
          options={makeListCustomer(listCustomers)}
          onInputChange={handleSearchCustomer}
          onFocus={handleFocusCustomer}
          isLoading={isLoading}
          isSearchable
          isClearable
          onChange={(data) => selectCustomer(data.item)}
          placeholder="Chọn khách hàng"
          noOptionsMessage={() => "Không tìm thấy khách hàng"}
        />
      )}
    </>
  );
}

export default SelectCustomer;
