import React, { useState } from "react";
import DefaultEditor from "react-simple-wysiwyg";
import ReactLoading from "react-loading";
import { BASE_URL } from "../../../../../constants/urls";
import "./proposalcreation.css";
import { useNavigate } from "react-router-dom";

const ProposalCreation = () => {
  const [titleName, setTitleName] = useState("AI Tech");
  const [clientName, setClientName] = useState("John Doe");
  const [sourceLink, setSourceLink] = useState("https://www.google.com/");
  const [description, setDescription] = useState("here is a test project");
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", titleName);
    formData.append("client", clientName);
    formData.append("source_link", sourceLink);
    formData.append("description", description);
    const authToken = localStorage.getItem("BearerToken");

    try {
      const response = await fetch(`${BASE_URL}process-job/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Proposal submitted successfully!", data.data);

        navigate("/editer", { state: { data: data.data } });
      } else {
        console.log("Error submitting proposal.");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateUrl = (url) => {
    const regex =
      /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/i;
    return regex.test(url);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSourceLink(value);

    if (!validateUrl(value)) {
      setFormErrors({
        ...formErrors,
        sourceLink:
          value === "" ? "Source Link is required" : "Invalid URL format",
      });
    } else {
      setFormErrors({
        ...formErrors,
        sourceLink: "",
      });
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: "1000px",
      }}
    >
      {loading && (
        <>
          <div className="blur-background"></div>
          <div className="loading-overlay ">
            <ReactLoading type={"bars"} height={100} width={80} />
            <p>
              <strong>Proposal Generating...</strong>
            </p>
          </div>
        </>
      )}

      <h2
        style={{
          marginTop: "5rem",
        }}
      >
        Proposal
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-sm-6">
            <div className="input-block mb-3">
              <label className="col-form-label">Title</label>
              <input
                className="form-control"
                type="text"
                value={titleName}
                onChange={(e) => {
                  setTitleName(e.target.value);
                  setFormErrors({
                    ...formErrors,
                    titleName:
                      e.target.value === "" ? "Project Name is required" : "",
                  });
                }}
                required
              />
              {formErrors.titleName && (
                <span className="text-danger">{formErrors.titleName}</span>
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
                      e.target.value === "" ? "Client Name is required" : "",
                  });
                }}
                required
              />
              {formErrors.clientName && (
                <span className="text-danger">{formErrors.clientName}</span>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="input-block mb-3">
              <label className="col-form-label">Source Link</label>
              <input
                className="form-control"
                type="text"
                value={sourceLink}
                onChange={handleChange}
                required
              />
              {formErrors.sourceLink && (
                <span className="text-danger">{formErrors.sourceLink}</span>
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
                  e.target.value === "" ? "Description is required" : "",
              });
            }}
          />
          {formErrors.description && (
            <span className="text-danger">{formErrors.description}</span>
          )}
        </div>

        <div className="submit-section">
          <button
            className="btn btn-primary submit-btn"
            type="submit"
            disabled={loading}
          >
            Generate Proposal
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProposalCreation;
