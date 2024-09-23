import React, { useState } from "react";
import { Link } from "react-router-dom";
import Proposals from "./proposals";

const ProposalList = () => {
  const [proposal, setData] = useState();
  return (
    <>
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="file-wrap">
                <div className>
                  <div className="file-cont-inner">
                    <div className="file-content">
                      <form className="file-search">
                        <div className="input-group">
                          <div className="input-group-text">
                            <i className="fa-solid fa-magnifying-glass" />
                          </div>
                          <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Search"
                          />

                          {/* <div className="file-options">
                            <Link
                              style={{
                                borderRadius: "20px",
                                marginLeft: "50px",
                                marginTop: "10px",
                              }}
                              className="btn btn-sm btn-primary"
                              to="/proposal-creation"
                            >
                              Add Proposal
                            </Link>
                          </div> */}
                        </div>
                      </form>

                      <div className="file-body">
                        <div className="file-scroll">
                          <div className="file-content-inner">
                            <h4>Proposals</h4>
                            {/* <Files setData={setData} /> */}
                            <Proposals setData={setData} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default ProposalList;
