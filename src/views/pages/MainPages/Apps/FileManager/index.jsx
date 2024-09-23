import React, { useState } from "react";
import { Link } from "react-router-dom";
import Files from "./files";
import ProjectModelPopup from "../../../../../components/modelpopup/ProjectModelPopup";

const FileManager = () => {
  const [project, setData] = useState();
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

                          {/* <div
                            className="btn-group dropdown-action"
                            style={{
                              marginLeft: "50px",
                              height: "35px",
                              width: "70px",
                              marginTop: "5px",
                            }}
                          >
                            <button
                              type="button"
                              className="btn btn-white dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              Filter <i className="fa fa-angle-down " />
                            </button>
                            &nbsp;
                            <div className="dropdown-menu">
                              <Link className="dropdown-item" to="#">
                                Project Name
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Client Name
                              </Link>
                              <Link className="dropdown-item" to="#">
                                Technology
                              </Link>
                            </div>
                          </div> */}

                          <div className="d-flex justify-content-start mt-3"></div>

                          <div className="file-options">
                            {/* <button
                              className="btn btn-sm btn-primary"
                              style={{
                                borderRadius: "20px",
                                marginLeft: "50px",
                                marginTop: "10px",
                              }}
                            >
                              Project Name
                            </button>
                            <button
                              className="btn btn-sm btn-primary"
                              style={{
                                borderRadius: "20px",
                                marginLeft: "50px",
                                marginTop: "10px",
                              }}
                            >
                              Client Name
                            </button>
                            <button
                              className="btn btn-sm btn-primary"
                              style={{
                                borderRadius: "20px",
                                marginLeft: "50px",
                                marginTop: "10px",
                              }}
                            >
                              Technology
                            </button> */}
                            <Link
                              style={{
                                borderRadius: "20px",
                                marginLeft: "50px",
                                marginTop: "10px",
                              }}
                              className="btn btn-sm btn-primary"
                              to="#"
                              data-bs-toggle="modal"
                              data-bs-backdrop="static"
                              data-bs-target="#create_project"
                            >
                              + Add Project
                            </Link>
                          </div>
                        </div>
                      </form>

                      {/* Add Rectangle Buttons */}

                      <div className="file-body">
                        <div className="file-scroll">
                          <div className="file-content-inner">
                            <h4>Projects</h4>
                            <Files setData={setData} />
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
      <ProjectModelPopup project={project} />
    </>
  );
};

export default FileManager;
