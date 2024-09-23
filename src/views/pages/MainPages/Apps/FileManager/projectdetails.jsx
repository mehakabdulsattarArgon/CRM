import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Key, Link2 } from "react-feather";
import {
  Avatar_05,
  Avatar_10,
  Avatar_16,
} from "../../../../../Routes/ImagePath";
import DatePicker from "react-datepicker";
import Select from "react-select";
import DefaultEditor from "react-simple-wysiwyg";
import { Navigation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../../../../../constants/urls";
const ProjectDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [rating, setRating] = useState(null);
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [figmaLink, setFigmaLink] = useState("");
  const [serverLink, setServerLink] = useState("");
  const [serverLoginEmail, setServerLoginEmail] = useState("");
  const [serverLoginPassword, setServerLoginPassword] = useState("");
  const [teamLeader, setTeamLeader] = useState();
  const [teamMembers, setTeamMembers] = useState();
  const [description, setDescription] = useState("here is a test project");
  const [platforms, setPlatforms] = useState();
  const [techStack, setTechStack] = useState();
  const [industry, setIndustry] = useState();
  const [logo, setLogo] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [selectedDate1, setSelectedDate1] = useState();
  const [selectedDate2, setSelectedDate2] = useState();
  const [teamMemberOptions, setTeamMemberOptions] = useState([]);
  const [teamLeaderOptions, setTeamLeaderOptions] = useState([]);
  const [techStackOptions, setTechStackOptions] = useState([]);
  const [stacks, setStacks] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [platformOptions, setPlatformOptions] = useState([]);
  const [team, setTeam] = useState();
  const { project } = location.state || {};

  const handleDownload = (fileURL, fileName) => {
    const url = fileURL;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  useEffect(() => {
    const authToken = localStorage.getItem("BearerToken");
    const fetchPlatforms = async () => {
      try {
        const response = await fetch(`${BASE_URL}platforms/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();

        const options = data.map((platform) => ({
          value: platform.id,
          label: platform.name,
        }));

        setPlatformOptions(options);
      } catch (error) {
        console.error("Error fetching platforms:", error);
      }
    };

    fetchPlatforms();
  }, []);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const authToken = localStorage.getItem("BearerToken");
      try {
        const response = await fetch(`${BASE_URL}users/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        const options = data.map((user) => ({
          value: user.id,
          label: user.username,
        }));
        setTeamMemberOptions(options);
        setTeamLeaderOptions(options);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  useEffect(() => {
    const authToken = localStorage.getItem("BearerToken");
    const fetchTechStacks = async () => {
      try {
        const response = await fetch(`${BASE_URL}techstacks/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();

        const options = data.map((stack) => ({
          value: stack.id,
          label: stack.name,
        }));

        setTechStackOptions(options);
      } catch (error) {
        console.error("Error fetching tech stacks:", error);
      }
    };

    fetchTechStacks();
  }, []);

  useEffect(() => {
    try {
      const tech_stack = techStackOptions
        .filter((option) => project.tech_stack.includes(option.value))
        .map((option) => option.label);
      setStacks(tech_stack);
      setTeam(
        teamLeaderOptions
          .filter((option) => project.development_team.includes(option.value))
          .map((option) => option.label)
      );
    } catch {
      console.log("not edit");
    }
  }, [project, techStackOptions, teamMemberOptions]);

  useEffect(() => {
    try {
      const selected = platformOptions.filter((option) =>
        project.platform.includes(option.value)
      );
      const tech_selected = techStackOptions.filter((option) =>
        project.tech_stack.includes(option.value)
      );
      const dev_team = teamMemberOptions.filter((option) =>
        project.development_team.includes(option.value)
      );

      const person = teamMemberOptions.filter(
        (option) => option.label === project.responsible_person
      );

      const ind = companies.find(
        (company) =>
          company.label.toLowerCase() === project.industry.toLowerCase()
      );
      setProjectName(project.name);
      setClientName(project.client_name);
      setGithubLink(project.git_link);
      setLiveLink(project.live_link);
      setFigmaLink(project.figma_link);
      setServerLoginEmail(project.server_email);
      setServerLoginPassword(project.server_password);
      setTeamLeader(person);
      setTeamMembers(dev_team);
      setDescription(project.description);
      setPlatforms(selected);
      setTechStack(tech_selected);
      setIndustry(ind);
      setLogo(project.logo_icon);
      setSelectedDate1(project.start_date);
      setSelectedDate2(project.end_date);
      setServerLink(project.server_link);
      setRating(parseInt(project.rating));
    } catch {
      console.log("not edir");
    }
  }, [project, teamMemberOptions]);

  const companies = [
    { value: 1, label: "Fintech" },
    { value: 2, label: "Block chain" },
    { value: 3, label: "Real Estate" },
    { value: 4, label: "Game development" },
    { value: 5, label: "Education and research" },
    { value: 6, label: "Logistics and transformation" },
    { value: 7, label: "Health care" },
    { value: 8, label: "Retail and distribution" },
    { value: 9, label: "E-Commerce" },
    { value: 10, label: "Artificial Intelligence" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

  const handleDelete = async () => {
    const authToken = localStorage.getItem("BearerToken");
    try {
      const response = await axios.delete(
        `${BASE_URL}projects/${project.id}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Project deleted successfully", response);
      const modalElement = document.querySelector('[data-bs-dismiss="modal"]');
      if (modalElement) {
        modalElement.click();
      }
      navigate("/file-manager");
      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the project!", error);
    }
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("BearerToken");

    if (selectedDate1 > selectedDate2) {
      setFormErrors({
        ...formErrors,
        selectedDate1: "Start Date cannot be after End Date",
        selectedDate2: "End Date cannot be before Start Date",
      });
    } else {
      setFormErrors({
        ...formErrors,
        selectedDate1: "",
        selectedDate2: "",
      });
    }
    const formData = new FormData();
    formData.append("name", projectName);
    formData.append("description", description);
    formData.append("client_name", clientName);
    formData.append("rating", rating);
    const formattedDate = selectedDate2.toLocaleDateString("en-CA");
    formData.append("end_date", formattedDate);
    const formattedDate1 = selectedDate1.toLocaleDateString("en-CA");
    formData.append("start_date", formattedDate1);
    documents.forEach((file, index) => {
      formData.append("project_documents", file);
    });

    console.log(formData.getAll("project_documents"));
    formData.append("git_link", githubLink);
    formData.append("live_link", liveLink);
    formData.append("figma_link", figmaLink);
    formData.append("server_link", serverLink);
    formData.append("industry", industry.label);
    formData.append("logo_icon", logo);
    formData.append("server_email", serverLoginEmail);
    formData.append("server_password", serverLoginPassword);
    formData.append(
      "responsible_person",
      teamLeader[0]?.value || teamLeader[0]
    );
    teamMembers.forEach((member, index) => {
      formData.append("development_team", parseInt(member.value, 10));
    });

    techStack.forEach((tech, index) => {
      formData.append("tech_stack", parseInt(tech.value, 10));
    });

    platforms.forEach((platform, index) => {
      formData.append("platform", parseInt(platform.value, 10));
    });

    try {
      const response = await fetch(`${BASE_URL}projects/${project.id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Project updated successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error updating project:", errorData);
      }
      //window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDocumentChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 0) {
      // Filter out duplicates (optional)
      const newFiles = selectedFiles.filter(
        (file) => !documents.some((doc) => doc.name === file.name)
      );

      // Append new files to the state
      setDocuments((prevDocs) => [...prevDocs, ...newFiles]);
      setFormErrors({ ...formErrors, documents: "" });
    } else {
      setFormErrors({
        ...formErrors,
        documents: "Document upload is required",
      });
    }
  };

  const removeDocument = (indexToRemove) => {
    setDocuments((prevDocs) =>
      prevDocs.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <div>
        <div className="page-wrapper">
          <div className="content container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="contact-head">
                  <div className="row align-items-center">
                    <div className="col">
                      <ul className="contact-breadcrumb">
                        <li>
                          <Link to="/file-manager">
                            <i className="las la-arrow-left" />
                            File Manager
                          </Link>
                        </li>
                        <li>{project?.name || ""}</li>

                        <Link
                          to="#"
                          className="action-icon "
                          style={{
                            marginLeft: "80%",
                          }}
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="material-icons ">more_vert</i>
                        </Link>
                        <div className="dropdown-menu dropdown-menu-right ">
                          <Link
                            className="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_project"
                            //onClick={() => handleClick(project)}
                          >
                            <i className="fa fa-pencil m-r-5" /> Edit
                          </Link>
                          <Link
                            className="dropdown-item"
                            to="#"
                            data-bs-toggle="modal"
                            data-bs-backdrop="static"
                            data-bs-target="#delete"
                            //onClick={() => handleClick(project)}
                          >
                            <i className="fa fa-trash m-r-5" /> Delete
                          </Link>
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="contact-wrap">
                  <div className="contact-profile">
                    <div className="avatar avatar-xxl">
                      <img
                        src={project?.logo_icon || ""}
                        alt="Project Logo"
                        style={{
                          width: "100px", // Set the width you want
                          height: "100px", // Set the height you want
                          objectFit: "cover", // Ensures the image scales properly
                        }}
                      />
                      <span className="status online" />
                    </div>
                    <div className="name-user">
                      <h4>{project?.name || ""}</h4>
                      <p>{project?.client_name || ""}</p>
                      <div className="badge-rate">
                        <span className="badge badge-light">
                          {project?.industry || ""}
                        </span>
                        <p>
                          <i className="fa-solid fa-star" />
                          {project?.rating || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="contacts-action">
                    <ul className="social-info">
                      <li>
                        <Link to={project?.git_link || ""}>
                          <i className="fa-brands fa-github" />
                        </Link>
                      </li>
                      {"    "}
                      <li>
                        <Link to={project?.figma_link || ""}>
                          <i className="fa-brands fa-figma" />
                        </Link>
                      </li>
                      {"    "}
                      <li>
                        <Link to={project?.live_link || ""}>
                          <i className="fa-brands fa-chrome" />
                        </Link>
                      </li>
                      {"    "}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3">
                <div className="stickybar">
                  <div className="card contact-sidebar">
                    <h5>Project Information</h5>
                    <ul className="other-info">
                      <li>
                        <span className="other-title">Team Lead:</span>
                        <ul className="team-members">
                          <li>
                            <Link
                              to="#"
                              data-bs-toggle="tooltip"
                              title="Jeffery Lalor"
                            >
                              <img alt="" src={Avatar_16} />
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className="other-title">Team Members:</span>
                        <ul className="team-members">
                          <li>
                            <Link
                              to="#"
                              data-bs-toggle="tooltip"
                              title="John Smith"
                            >
                              <img alt="" src={Avatar_10} />
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="#"
                              data-bs-toggle="tooltip"
                              title="Mike Litorus"
                            >
                              <img alt="" src={Avatar_05} />
                            </Link>
                          </li>
                          <li className="dropdown avatar-dropdown">
                            <Link
                              to="#"
                              className="all-users dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              +15
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <span className="other-title">Tech Stack:</span>
                        <span>{stacks}</span>
                      </li>
                      <li>
                        <span className="other-title">Platform:</span>
                        <span>{project?.platforms || ""}</span>
                      </li>
                      <li>
                        <span className="other-title">Start Date:</span>
                        <span>{project?.start_date || ""}</span>
                      </li>
                      <li>
                        <span className="other-title">End Date:</span>
                        <span>{project?.end_date || ""}</span>
                      </li>
                    </ul>
                    <h5>Server Information</h5>
                    <ul className="basic-info">
                      <li>
                        <span>
                          <Mail size={15} />
                        </span>
                        <p>{project?.server_email || ""}</p>
                      </li>
                      <li>
                        <span>
                          <Key size={15} />
                        </span>
                        <p>{project?.server_password || ""}</p>
                      </li>
                      <li>
                        <span>
                          <Link2 size={15} />
                        </span>
                        <a
                          href={project?.server_link || ""}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ cursor: "pointer" }}
                        >
                          {project?.server_link || ""}
                        </a>
                      </li>
                    </ul>

                    <ul className="other-info">
                      {project?.documents && project?.documents.length > 0 ? (
                        project?.documents.map((document, index) => (
                          <li key={index}>
                            <div className="d-flex align-items-center">
                              <span className="file-icon">
                                <i className="la la-file-alt" />
                              </span>
                              <p>{document.name}</p>
                            </div>
                            <div className="file-download">
                              <Link
                                // to={document.downloadLink}
                                target="_blank"
                                //rel="noopener noreferrer"
                                onClick={() =>
                                  handleDownload(document.file, document.name)
                                }
                              >
                                <i className="la la-download" />
                                Download
                              </Link>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li>No documents available</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-9">
                <div className="contact-tab-view">
                  <div className="tab-content pt-0">
                    <div className="tab-pane active show" id="activities">
                      <div className="contact-activity">
                        <ul>
                          <li className="activity-wrap">
                            <span className="activity-icon bg-warning">
                              <i className="las la-file-alt" />
                            </span>
                            <div className="activity-info">
                              <h4>Description</h4>
                              <p>{project?.description || ""}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="edit_project" className="modal custom-modal fade" role="dialog">
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Project</h5>
              <button
                style={{ backgroundColor: "#667eea", borderColor: "white" }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span style={{ color: "white" }}>x</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditFormSubmit}>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Project Name</label>
                      <input
                        className="form-control"
                        type="text"
                        value={projectName}
                        onChange={(e) => {
                          setProjectName(e.target.value);
                          setFormErrors({
                            ...formErrors,
                            projectName:
                              e.target.value === ""
                                ? "Project Name is required"
                                : "",
                          });
                        }}
                        required
                      />
                      {formErrors.projectName && (
                        <span className="text-danger">
                          {formErrors.projectName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Client Name</label>
                      <input
                        className="form-control"
                        type="text"
                        value={clientName}
                        onChange={(e) => {
                          setClientName(e.target.value);
                          setFormErrors({
                            ...formErrors,
                            clientName:
                              e.target.value === ""
                                ? "Client Name is required"
                                : "",
                          });
                        }}
                        required
                      />
                      {formErrors.clientName && (
                        <span className="text-danger">
                          {formErrors.clientName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Start Date</label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={selectedDate1}
                          onChange={setSelectedDate1}
                          className="form-control datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                          required
                        />
                        {formErrors.selectedDate1 && (
                          <span className="text-danger">
                            {formErrors.selectedDate1}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">End Date</label>
                      <div className="cal-icon">
                        <DatePicker
                          selected={selectedDate2}
                          onChange={setSelectedDate2}
                          className="form-control datetimepicker"
                          type="date"
                          dateFormat="dd-MM-yyyy"
                          required
                        />
                        {formErrors.selectedDate2 && (
                          <span className="text-danger">
                            {formErrors.selectedDate2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">GitHub Link</label>
                      <input
                        className="form-control"
                        type="text"
                        value={githubLink}
                        onChange={(e) => {
                          setGithubLink(e.target.value);
                          setFormErrors({
                            ...formErrors,
                            githubLink:
                              e.target.value === ""
                                ? "GitHub Link is required"
                                : "",
                          });
                        }}
                        required
                      />
                      {formErrors.githubLink && (
                        <span className="text-danger">
                          {formErrors.githubLink}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Figma Link</label>
                      <input
                        className="form-control"
                        type="text"
                        value={figmaLink}
                        onChange={(e) => {
                          setFigmaLink(e.target.value);
                          setFormErrors({
                            ...formErrors,
                            figmaLink:
                              e.target.value === ""
                                ? "Figma Link is required"
                                : "",
                          });
                        }}
                        required
                      />
                      {formErrors.figmaLink && (
                        <span className="text-danger">
                          {formErrors.figmaLink}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Live Link</label>
                      <input
                        className="form-control"
                        type="text"
                        value={liveLink}
                        onChange={(e) => {
                          setLiveLink(e.target.value);

                          setFormErrors({
                            ...formErrors,
                            liveLink:
                              e.target.value === ""
                                ? "Live Link is required"
                                : "",
                          });
                        }}
                        required
                      />
                      {formErrors.liveLink && (
                        <span className="text-danger">
                          {formErrors.liveLink}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Server Link</label>
                      <input
                        className="form-control"
                        type="text"
                        value={serverLink}
                        onChange={(e) => {
                          setServerLink(e.target.value);

                          setFormErrors({
                            ...formErrors,
                            serverLink:
                              e.target.value === ""
                                ? "Server Link is required"
                                : "",
                          });
                        }}
                        required
                      />
                      {formErrors.serverLink && (
                        <span className="text-danger">
                          {formErrors.serverLink}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Rating</label>
                      <div className="rating-input">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <div
                            key={parseInt(value)}
                            className="form-check form-check-inline"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rating"
                              value={value}
                              checked={rating === value}
                              onChange={(e) => {
                                setRating(parseInt(e.target.value));
                                setFormErrors({
                                  ...formErrors,
                                  rating:
                                    e.target.value === ""
                                      ? "Rating is required"
                                      : "",
                                });
                              }}
                              required
                            />
                            <label className="form-check-label">{value}</label>
                          </div>
                        ))}
                      </div>
                      {formErrors.rating && (
                        <span className="text-danger">{formErrors.rating}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Platform</label>
                      <Select
                        options={platformOptions}
                        placeholder="Select"
                        styles={customStyles}
                        value={platforms}
                        onChange={(selectedOption) => {
                          setPlatforms(selectedOption);
                          setFormErrors({
                            ...formErrors,
                            platforms:
                              selectedOption && selectedOption.length > 0
                                ? ""
                                : "Platform selection is required",
                          });
                        }}
                        isMulti
                        required
                      />
                      {formErrors.platforms && (
                        <span className="text-danger">
                          {formErrors.platforms}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Tech Stack</label>
                      <Select
                        options={techStackOptions}
                        placeholder="Select"
                        styles={customStyles}
                        value={techStack}
                        onChange={(selectedOption) => {
                          setTechStack(selectedOption);
                          setFormErrors({
                            ...formErrors,
                            techStack: selectedOption
                              ? ""
                              : "Tech stack selection is required",
                          });
                        }}
                        isMulti
                        required
                      />
                      {formErrors.techStack && (
                        <span className="text-danger">
                          {formErrors.techStack}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Industry</label>
                      <Select
                        options={companies}
                        placeholder="Select"
                        styles={customStyles}
                        value={industry}
                        onChange={(selectedOption) => {
                          setIndustry(selectedOption);
                          setFormErrors({
                            ...formErrors,
                            industry: selectedOption
                              ? ""
                              : "Industry selection is required",
                          });
                        }}
                        required
                      />
                      {formErrors.industry && (
                        <span className="text-danger">
                          {formErrors.industry}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Server Login Email
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        value={serverLoginEmail}
                        onChange={(e) => {
                          setServerLoginEmail(e.target.value);

                          setFormErrors({
                            ...formErrors,
                            serverLoginEmail:
                              e.target.value === ""
                                ? "Server Login Email is required"
                                : "",
                          });
                        }}
                        required
                      />
                      {formErrors.serverLoginEmail && (
                        <span className="text-danger">
                          {formErrors.serverLoginEmail}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Server Login Password
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={serverLoginPassword}
                        onChange={(e) => {
                          setServerLoginPassword(e.target.value);

                          setFormErrors({
                            ...formErrors,
                            serverLoginPassword:
                              e.target.value === ""
                                ? "Server Login Password is required"
                                : "",
                          });
                        }}
                        required
                      />
                      {formErrors.serverLoginPassword && (
                        <span className="text-danger">
                          {formErrors.serverLoginPassword}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">
                        Add Project Leader
                      </label>
                      <Select
                        options={teamLeaderOptions}
                        placeholder="Select"
                        styles={customStyles}
                        value={teamLeader}
                        onChange={(selectedOption) => {
                          setTeamLeader(selectedOption);
                          setFormErrors({
                            ...formErrors,
                            teamLeader:
                              selectedOption && selectedOption.length > 0
                                ? ""
                                : "Team Leader selection is required",
                          });
                        }}
                        required
                      />
                      {formErrors.projectLeader && (
                        <span className="text-danger">
                          {formErrors.projectLeader}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="input-block mb-3">
                      <label className="col-form-label">Add Team Members</label>
                      <Select
                        options={teamMemberOptions}
                        placeholder="Select"
                        styles={customStyles}
                        value={teamMembers}
                        onChange={(selectedOption) => {
                          setTeamMembers(selectedOption);
                          setFormErrors({
                            ...formErrors,
                            teamMembers:
                              selectedOption && selectedOption.length > 0
                                ? ""
                                : "Team Members selection is required",
                          });
                        }}
                        isMulti
                        required
                      />
                      {formErrors.teamMembers && (
                        <span className="text-danger">
                          {formErrors.teamMembers}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="input-block mb-3">
                  <label className="col-form-label">Description</label>
                  <DefaultEditor
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setFormErrors({
                        ...formErrors,
                        description:
                          e.target.value === ""
                            ? "Description is required"
                            : "",
                      });
                    }}
                  />
                  {formErrors.description && (
                    <span className="text-danger">
                      {formErrors.description}
                    </span>
                  )}
                </div>

                <div className="input-block mb-3">
                  <label className="col-form-label">Upload Logo</label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setLogo(file);
                        setFormErrors({ ...formErrors, logo: "" });
                      } else {
                        setFormErrors({
                          ...formErrors,
                          logo: "Logo is required",
                        });
                      }
                    }}
                    required={!logo}
                  />
                  {formErrors.logo && (
                    <span className="text-danger">{formErrors.logo}</span>
                  )}
                  {logo && typeof logo === "string" && (
                    <img
                      src={logo}
                      alt="Current logo"
                      style={{
                        width: "100px",
                        height: "auto",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>

                <div className="input-block mb-3">
                  <label className="col-form-label">Upload Documents</label>
                  <input
                    className="form-control"
                    type="file"
                    multiple
                    onChange={handleDocumentChange}
                    required={documents.length === 0} // Make required only if no document exists
                  />
                  {formErrors.documents && (
                    <span className="text-danger">{formErrors.documents}</span>
                  )}

                  {/* Display existing and newly uploaded documents */}
                  {documents.length > 0 && (
                    <ul>
                      {documents.map((doc, index) => (
                        <li key={index}>
                          {typeof doc === "string" ? (
                            <a
                              href={doc}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Document {index + 1}
                            </a>
                          ) : (
                            doc.name
                          )}
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            style={{ marginLeft: "10px" }}
                          >
                            Remove
                          </button>
                        </li>
                      ))}

                      {project?.documents && project?.documents.length > 0 ? (
                        project?.documents.map((document, index) => (
                          <li key={index}>
                            <div className="d-flex align-items-center">
                              <span className="file-icon">
                                <i className="la la-file-alt" />
                              </span>
                              <p>{document.name}</p>
                            </div>
                            <div className="file-download">
                              <Link
                                to={document.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="la la-download" />
                                Download
                              </Link>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li>No documents available</li>
                      )}
                    </ul>
                  )}
                </div>

                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="modal custom-modal fade" id="delete" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">
                <p>Are you sure you want to delete?</p>
              </div>
              <div className="modal-btn delete-action">
                <div className="row">
                  <div className="col-6">
                    <Link
                      to="#"
                      className="btn btn-primary submit-btn"
                      onClick={handleDelete}
                    >
                      Delete
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link
                      to="#"
                      data-bs-dismiss="modal"
                      className="btn btn-primary submit-btn"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
