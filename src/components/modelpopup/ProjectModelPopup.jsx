import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import DefaultEditor from "react-simple-wysiwyg";
import { createProject } from "../../helpers/projects";
import { BASE_URL } from "../../constants/urls";
import { Link } from "react-router-dom";
import axios from "axios";

const ProjectModelPopup = ({ project }) => {
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
  const [formErrors, setFormErrors] = useState({});
  const [teamMemberOptions, setTeamMemberOptions] = useState([]);
  const [teamLeaderOptions, setTeamLeaderOptions] = useState([]);
  const [techStackOptions, setTechStackOptions] = useState([]);
  const [platformOptions, setPlatformOptions] = useState([]);

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
      setDocuments(project.project_documents);
      setSelectedDate1(project.start_date);
      setSelectedDate2(project.end_date);
    } catch {
      console.log("not edir");
    }
  }, [project, teamMemberOptions]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    formData.append("git_link", githubLink);
    formData.append("live_link", liveLink);
    formData.append("figma_link", figmaLink);
    formData.append("server_link", serverLink);
    formData.append("industry", industry.label);
    formData.append("logo_icon", logo);
    formData.append("server_email", serverLoginEmail);
    formData.append("server_password", serverLoginPassword);
    formData.append("responsible_person", teamLeader.value);

    teamMembers.forEach((member, index) => {
      console.log(formData.getAll("development_team"));
      formData.append("development_team", parseInt(member.value, 10));
    });

    techStack.forEach((tech, index) => {
      formData.append("tech_stack", parseInt(tech.value, 10));
    });

    // formData.append("project_documents", documents);

    // projectData.keywords.forEach((keyword, index) => {
    //   formData.append(`keywords[${index}]`, keyword);
    // });

    platforms.forEach((platform, index) => {
      formData.append("platform", parseInt(platform.value, 10));
    });

    documents.forEach((file, index) => {
      formData.append("project_documents", file);
    });

    console.log(formData.get("platform"));

    try {
      await createProject(formData);
      const modalElement = document.querySelector('[data-bs-dismiss="modal"]');
      if (modalElement) {
        modalElement.click();
      }
      //window.location.reload();
    } catch (error) {
      console.error("Error creating project:", error);
    }
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

      window.location.reload();
    } catch (error) {
      console.error("There was an error deleting the project!", error);
    }
  };

  const validateUrl = (url, type) => {
    const regexes = {
      github:
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i,
      figma:
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i,
      live: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/,
      server:
        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i,
    };
    return regexes[type].test(url);
  };

  const handleGithubChange = (e) => {
    const value = e.target.value;
    setGithubLink(value);
    setFormErrors({
      ...formErrors,
      githubLink: !validateUrl(value, "github")
        ? value === ""
          ? "GitHub Link is required"
          : "Invalid GitHub URL format"
        : "",
    });
  };

  const handleFigmaChange = (e) => {
    const value = e.target.value;
    setFigmaLink(value);
    setFormErrors({
      ...formErrors,
      figmaLink: !validateUrl(value, "figma")
        ? value === ""
          ? "Figma Link is required"
          : "Invalid Figma URL format"
        : "",
    });
  };

  const handleLiveChange = (e) => {
    const value = e.target.value;
    setLiveLink(value);
    setFormErrors({
      ...formErrors,
      liveLink: !validateUrl(value, "live")
        ? value === ""
          ? "Live Link is required"
          : "Invalid Live URL format"
        : "",
    });
  };

  const handleServerChange = (e) => {
    const value = e.target.value;
    setServerLink(value);
    setFormErrors({
      ...formErrors,
      liveLink: !validateUrl(value, "server")
        ? value === ""
          ? "Server Link is required"
          : "Invalid Live URL format"
        : "",
    });
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
    formData.append("end_date", selectedDate2);
    formData.append("start_date", selectedDate1);
    formData.append("project_documents", documents);
    formData.append("git_link", githubLink);
    formData.append("live_link", liveLink);
    formData.append("figma_link", figmaLink);
    formData.append("server_link", serverLink);
    formData.append("industry", industry.label);
    formData.append("logo_icon", logo);
    formData.append("server_email", serverLoginEmail);
    formData.append("server_password", serverLoginPassword);
    formData.append("responsible_person", teamLeader[0].value);
    teamMembers.forEach((member, index) => {
      console.log(formData.getAll("development_team"));
      formData.append("development_team", parseInt(member.value, 10));
    });

    techStack.forEach((tech, index) => {
      formData.append("tech_stack", parseInt(tech.value, 10));
    });

    // projectData.keywords.forEach((keyword, index) => {
    //   formData.append(`keywords[${index}]`, keyword);
    // });

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
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleFileChange = (e) => {
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

  const removeFile = (index) => {
    const updatedDocs = documents.filter((_, i) => i !== index); // Remove file by index
    setDocuments(updatedDocs);
  };

  return (
    <>
      <div
        id="create_project"
        className="modal custom-modal fade"
        role="dialog"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Project</h5>
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
              <form onSubmit={handleSubmit}>
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
                        onChange={handleGithubChange}
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
                        onChange={handleFigmaChange}
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
                        onChange={handleLiveChange}
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
                        onChange={handleServerChange}
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
                            key={value}
                            className="form-check form-check-inline"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rating"
                              value={value}
                              checked={rating === value}
                              onChange={(e) => {
                                setRating(Number(e.target.value));
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
                      setLogo(file);
                      setFormErrors({
                        ...formErrors,
                        logo: file ? "" : "Logo is required",
                      });
                    }}
                    required
                  />
                  {formErrors.logo && (
                    <span className="text-danger">{formErrors.logo}</span>
                  )}
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">Upload Documents</label>

                  <input
                    className="form-control"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    required
                  />
                  {formErrors.documents && (
                    <span className="text-danger">{formErrors.documents}</span>
                  )}
                  <ul>
                    {documents.map((file, index) => (
                      <li key={index}>
                        {file.name}{" "}
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="btn btn-sm btn-danger"
                          style={{
                            borderColor: "transparent",
                            backgroundColor: "transparent",
                            color: "red",
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
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
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
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
                            key={value}
                            className="form-check form-check-inline"
                          >
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rating"
                              value={rating}
                              checked={rating === value}
                              onChange={(e) => {
                                setRating(Number(e.target.value));
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
                      setLogo(file);
                      setFormErrors({
                        ...formErrors,
                        logo: file ? "" : "Logo is required",
                      });
                    }}
                    required
                  />
                  {formErrors.logo && (
                    <span className="text-danger">{formErrors.logo}</span>
                  )}
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">Upload Documents</label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setDocuments(file);
                      setFormErrors({
                        ...formErrors,
                        documents: file ? "" : "Document upload is required",
                      });
                    }}
                    required
                  />
                  {formErrors.documents && (
                    <span className="text-danger">{formErrors.documents}</span>
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

export default ProjectModelPopup;
