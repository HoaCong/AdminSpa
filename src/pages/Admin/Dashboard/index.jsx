import LazyLoadImage from "components/common/LazyLoadImage";
import { STATUS_LABEL, TYPE_LABEL } from "constants";
import { formatCurrency } from "helper/functions";
import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { actionDashboard } from "store/Dashboard/action";
export default function Dashboard() {
  const {
    dashboardStatus: { isLoading },
    dashboard: { overview, statisticStatus, listService },
  } = useSelector((state) => state.dashboardReducer);

  const dispatch = useDispatch();
  const onGetDashboard = () => dispatch(actionDashboard());
  useEffect(() => {
    if (!isLoading) {
      onGetDashboard();
    }
  }, []);
  const donut = {
    options: {
      labels: statisticStatus.map((item) => STATUS_LABEL[item?.status]?.name),
      colors: ["#FF5733", "#6c757d", "#198754"], // Thay đổi màu sắc tại đây
    },
    series: statisticStatus.map((item) => item.count),
  };

  const revenue = [
    {
      idquiz: 11,
      count: 27,
      quizz: {
        id: 11,
        name: "Test 01",
        image: "https://kubtool.000webhostapp.com/uploads/amazing.jpeg",
        idtopic: 1,
        idcategory: 2,
        groupquestion: "[4,3]",
        idcreated: 21,
        createdat: 1702478294,
        updatedat: 1702478294,
      },
    },
    {
      idquiz: 12,
      count: 2,
      quizz: {
        id: 12,
        name: "Test344",
        image:
          "https://kubtool.000webhostapp.com/uploads/green_trees_nature.jpeg",
        idtopic: 1,
        idcategory: 3,
        groupquestion: "[6,14]",
        idcreated: 21,
        createdat: 1702478382,
        updatedat: 1702478382,
      },
    },
    {
      idquiz: 15,
      count: 2,
      quizz: {
        id: 15,
        name: "Test Quiz 123456",
        image:
          "https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg",
        idtopic: 29,
        idcategory: 2,
        groupquestion: "[3,4,5,6]",
        idcreated: 13,
        createdat: 1705881190,
        updatedat: 1705881190,
      },
    },
    {
      idquiz: 16,
      count: 1,
      quizz: {
        id: 16,
        name: "QUIZ 1",
        image: "https://kubtool.000webhostapp.com/uploads/img3.jpg",
        idtopic: 1,
        idcategory: 2,
        groupquestion: "[3,4,10,16,17,15]",
        idcreated: 1,
        createdat: 1704288530,
        updatedat: 1704288530,
      },
    },
    {
      idquiz: 19,
      count: 5,
      quizz: {
        id: 19,
        name: "Happy quizz",
        image: "https://kubtool.000webhostapp.com/uploads/apple.png",
        idtopic: 1,
        idcategory: 5,
        groupquestion: "[44,37,45,64,63,49]",
        idcreated: 1,
        createdat: 1704288523,
        updatedat: 1704288523,
      },
    },
    {
      idquiz: 16,
      count: 7,
      quizz: {
        id: 16,
        name: "QUIZ 1",
        image: "https://kubtool.000webhostapp.com/uploads/img3.jpg",
        idtopic: 1,
        idcategory: 2,
        groupquestion: "[3,4,10,16,17,15]",
        idcreated: 1,
        createdat: 1704288530,
        updatedat: 1704288530,
      },
    },
    {
      idquiz: 12,
      count: 1,
      quizz: {
        id: 12,
        name: "Test344",
        image:
          "https://kubtool.000webhostapp.com/uploads/green_trees_nature.jpeg",
        idtopic: 1,
        idcategory: 3,
        groupquestion: "[6,14]",
        idcreated: 21,
        createdat: 1702478382,
        updatedat: 1702478382,
      },
    },
    {
      idquiz: 24,
      count: 2,
      quizz: {
        id: 24,
        name: "Test question",
        image: "https://kubtool.000webhostapp.com/uploads/accountant.png",
        idtopic: 29,
        idcategory: 2,
        groupquestion: "[5]",
        idcreated: 13,
        createdat: 1705881419,
        updatedat: 1705881419,
      },
    },
    {
      idquiz: 11,
      count: 1,
      quizz: {
        id: 11,
        name: "Test 01",
        image: "https://kubtool.000webhostapp.com/uploads/amazing.jpeg",
        idtopic: 1,
        idcategory: 2,
        groupquestion: "[4,3]",
        idcreated: 21,
        createdat: 1702478294,
        updatedat: 1702478294,
      },
    },
  ];
  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: revenue.map((item) => item.quizz.name),
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: revenue.map((item) => item.count),
      },
    ],
  };

  return (
    <div className="d-flex flex-column gap-2">
      <section>
        <h5>Thống kê</h5>
        <div className="row g-2">
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card px-4 py-2 h-100">
              <div className="d-flex justify-content-between">
                <h6>Doanh thu</h6>
                <div
                  className="d-flex justify-content-center align-items-center rounded text-warning"
                  style={{
                    width: 30,
                    height: 30,
                    background: "#ffe69c",
                  }}
                >
                  <i className="fas fa-money-bill"></i>
                </div>
              </div>
              <div className="">{formatCurrency(overview.totalRevenue)}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card px-4 py-2 h-100">
              <div className="d-flex justify-content-between">
                <h6>Số lượng đơn</h6>
                <div
                  className="d-flex justify-content-center align-items-center rounded text-info"
                  style={{
                    width: 30,
                    height: 30,
                    background: "#9eeaf9",
                  }}
                >
                  <i className="fas fa-cart-arrow-down"></i>
                </div>
              </div>
              <div className="">{overview.totalBookings}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card px-4 py-2 h-100">
              <div className="d-flex justify-content-between">
                <h6>Số lượng khách hàng</h6>
                <div
                  className="d-flex justify-content-center align-items-center rounded text-success"
                  style={{
                    width: 30,
                    height: 30,
                    color: "red",
                    background: "#a6e9d5",
                  }}
                >
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <div className="">{overview.totalCustomers}</div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <div className="card px-4 py-2 h-100">
              <div className="d-flex justify-content-between">
                <h6>Số lượng dịch vụ</h6>
                <div
                  className="d-flex justify-content-center align-items-center rounded text-primary"
                  style={{
                    width: 30,
                    height: 30,
                    color: "red",
                    background: "#9ec5fe",
                  }}
                >
                  <i className="fas fa-window-restore"></i>
                </div>
              </div>
              <div className="">{overview.totalServices}</div>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section>
        <h5>Biểu đồ</h5>
        <div className="row g-3">
          <div className="col-12 col-sm-6">
            <h6> Thống kê doanh thu</h6>
            <div className="mixed-chart">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                width="100%"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <h5>Thống kê trạng thái đặt lịch</h5>
            <Chart
              options={donut.options}
              series={donut.series}
              type="pie"
              width="80%"
            />
          </div>
        </div>
      </section>
      <hr />
      <section>
        <div className="row">
          <div className="col-12 col-sm-12">
            <h5>Top 10 dịch vụ được lựa chọn</h5>
            <table className="table table-hover table-striped">
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
                  <th scope="col" className="align-middle">
                    Số lượt
                  </th>
                </tr>
              </thead>
              <tbody>
                {listService.length > 0 &&
                  listService.map((item, index) => (
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
                      <td className="align-middle">{item.numbersesion} buổi</td>
                      <td className="align-middle">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="align-middle">{item.time}</td>
                      <td className="align-middle">
                        {TYPE_LABEL[item.category]}
                      </td>
                      <td className="align-middle">10</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
