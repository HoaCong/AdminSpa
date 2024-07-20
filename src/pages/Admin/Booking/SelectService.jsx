/* eslint-disable react-hooks/exhaustive-deps */
import LazyLoadImage from "components/common/LazyLoadImage";
import { formatCurrency } from "helper/functions";
import _size from "lodash/size";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { actionGetList } from "store/Product/action";
import { addToast } from "store/Toast/action";

function SelectService({ listService, selectService }) {
  const {
    listStatus: { isLoading },
    list,
  } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const onGetProduct = (body) => dispatch(actionGetList(body));
  const onAddToast = (data) => dispatch(addToast(data));
  const handleFocusProduct = () => {
    if (!_size(list) && !isLoading) onGetProduct({});
  };

  const makeListProduct = (list) => {
    return list.map((item) => ({
      value: item.id,
      label: `${item.name} - ${item.numbersesion} buổi`,
      item: item,
    }));
  };

  const handleSelect = (data) => {
    const isExist = listService.findIndex((item) => item.id === data.value);
    if (isExist < 0) {
      selectService([...listService, data.item]);
    } else {
      onAddToast({
        text: "Dịch vụ này đã được chọn trước đó",
        type: "warning",
        title: "",
      });
    }
  };

  const handleRemoveService = (service) => {
    const newService = listService.filter((item) => item.id !== service.id);
    selectService(newService);
  };

  return (
    <>
      <Select
        options={makeListProduct(list)}
        onFocus={handleFocusProduct}
        isLoading={isLoading}
        isSearchable
        isClearable
        onChange={handleSelect}
        value={null}
        placeholder="Lựa chọn dịch vụ"
        noOptionsMessage={() => "Không tìm thấy dịch vụ"}
      />
      {listService.length ? (
        <div className="py-2 px-3 rounded-3 bg-blue-50">
          <div
            className="overflow-auto custom-scrollbar"
            style={{ maxHeight: 230 }}
          >
            {listService.map((item, index) => (
              <div
                key={index}
                className="d-flex py-2 my-1 border-bottom gap-2  text-14"
              >
                <span> {index + 1}. </span>
                <LazyLoadImage
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                />
                <div>
                  {item.name} - {item.numbersesion} buổi
                </div>
                <div className="ms-auto">{formatCurrency(item.price)}</div>
                <span className="cursor-pointer">
                  <i
                    className="fas fa-times text-danger"
                    onClick={() => handleRemoveService(item)}
                  ></i>
                </span>
              </div>
            ))}
          </div>
          <div className="d-flex mt-2">
            <div>Tổng:</div>
            <div className="ms-auto">
              {formatCurrency(listService.reduce((s, i) => (s += i.price), 0))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default SelectService;
