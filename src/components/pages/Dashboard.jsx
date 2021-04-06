import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Graph1, CardGraph1, CardGraph2, ColumnChart,Donut } from "../partials/Graph";
const Dashboard = () => {
  useEffect(() => {
    document.title = "IGL ADMIN | Dashboard";
    window.$("#activePageHead").text("Dashboard");
    window.$("#pageSpinner").hide();
    return () => {
      window.$("#pageSpinner").show();
    };
  }, []);
  return (
    <>
      <div className="page-wrapper">
        <div className="page-content-wrapper">
          <div className="page-content">
            <div class="row ">
              <div class="col-sm-12 col-md-4">
                <div class="card " style={{ borderRadius: "15px" }}>
                  <Link style={{ textDecoration: "none" }} to="/sales">
                    <div class="card-body">
                      <div>
                        <CardGraph1 title={'Sales'} count={'23,452'} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div class="col-sm-12 col-md-4">
                <div class="card " style={{ borderRadius: "15px" }}>
                  <Link style={{ textDecoration: "none" }} to="/sales">
                    <div class="card-body">
                      <div>
                        <CardGraph1 title={'ltrs'} count={'1,344'} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
              <div class="col-sm-12 col-md-4">
                <div class="card " style={{ borderRadius: "15px" }}>
                  <Link style={{ textDecoration: "none" }} to="/sales">
                    <div class="card-body">
                      <div>
                        <CardGraph2 title={'Bills'} count={'454'} />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-12">
                <div
                  className="card p-4"
                  style={{ borderRadius: "15px", overflow: "hidden" }}
                >
                  <Graph1  />
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="card p-4"
                  style={{ borderRadius: "15px", overflow: "hidden" }}
                >
                  <ColumnChart />
                </div>
              </div>
              <div className="col-md-6">
                <div
                  className="card p-4"
                  style={{ borderRadius: "15px", overflow: "hidden" }}
                >
                  <Donut />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
