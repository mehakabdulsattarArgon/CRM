import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../../../constants/urls";
import { useNavigate } from "react-router-dom";
import { Avatar_16 } from "../../../../../Routes/ImagePath";

const Files = ({ setData }) => {
  const [teamMemberOptions, setTeamMemberOptions] = useState([]);
  const [teamLeaderOptions, setTeamLeaderOptions] = useState([]);
  const [lead, setLead] = useState([]);

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
  const [projects, setProjects] = useState([]);
  const authToken = localStorage.getItem("BearerToken");
  const navigate = useNavigate();
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

  const handleNavigate = (project) => {
    navigate("/view-project-details", { state: { project: project } });
  };

  const handleClick = (project) => {
    setData(project);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}projects/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(async (res) => {
        const projectData = await Promise.all(
          res.data.map(async (project) => {
            const platformIds = project.platform;
            const techStackIds = project.tech_stack;
            const responsiblePersonId = project.responsible_person;
            const developmentTeamIds = project.development_team;

            const platforms = await Promise.all(
              platformIds.map(async (platformId) => {
                const platformRes = await axios.get(
                  `${BASE_URL}platforms/${platformId}/`,
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                return platformRes.data.name;
              })
            );

            const techStacks = await Promise.all(
              techStackIds.map(async (techStackId) => {
                const techStackRes = await axios.get(
                  `${BASE_URL}techstacks/${techStackId}/`,
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                return techStackRes.data.name;
              })
            );
            const leaderRes = await axios.get(
              `${BASE_URL}users/${responsiblePersonId}/`,
              {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              }
            );
            const developmentTeamNames = await Promise.all(
              developmentTeamIds.map(async (memberId) => {
                const memberRes = await axios.get(
                  `${BASE_URL}users/${memberId}/`,
                  {
                    headers: {
                      Authorization: `Bearer ${authToken}`,
                    },
                  }
                );
                return memberRes.data.username;
              })
            );
            project.responsible_person = leaderRes.data.username;
            return {
              ...project,
              platforms: platforms.join(", "),
              // tech_stack: techStacks.join(", "),
              // responsible_person: leaderRes.data.username,
              // development_team: developmentTeamNames.join(", "),
            };
          })
        );
        setProjects(projectData);
      })
      .catch((err) => console.error(err));
  }, [authToken]);

  return (
    <div className="row">
      {projects.map((project) => (
        <div
          key={project.id}
          className="col-lg-4 col-sm-6 col-md-4 col-xl-3 d-flex"
        >
          <div className="card w-100">
            <div className="card-body">
              <div className="dropdown dropdown-action profile-action ">
                <Link
                  to="#"
                  className="action-icon dropdown-toggle"
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
                    onClick={() => handleClick(project)}
                  >
                    <i className="fa fa-pencil m-r-5" /> Edit
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="#"
                    data-bs-toggle="modal"
                    data-bs-backdrop="static"
                    data-bs-target="#delete"
                    onClick={() => handleClick(project)}
                  >
                    <i className="fa fa-trash m-r-5" /> Delete
                  </Link>
                </div>
              </div>
              <div className="pro-deadline m-b-15">
                <img
                  src={project.logo_icon}
                  alt="Project Logo"
                  style={{
                    width: "170px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h4
                className="project-title"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate(project)}
              >
                {project.name}
              </h4>
              <p className="text-muted">
                {project.description.length > 140
                  ? `${project.description.slice(0, 140)}...`
                  : project.description}
              </p>
              <div className="pro-deadline m-b-15">
                <div className="sub-title">Client:</div>
                <div className="text-muted">{project.client_name}</div>
              </div>
              <div className="pro-deadline m-b-15">
                <div className="sub-title">Industry:</div>
                <div className="text-muted">{project.industry}</div>
              </div>
              <div className="pro-deadline m-b-15">
                <div className="sub-title">Platform:</div>
                <div className="text-muted">{project.platforms}</div>
              </div>
              <div className="pro-deadline m-b-15">
                <div className="sub-title">Project Leader:</div>
                {/* <div className="text-muted">{project.responsible_person}</div> */}
                <ul className="team-members">
                  <li>
                    <Link to="#" data-bs-toggle="tooltip" title="Jeffery Lalor">
                      <img alt="" src={Avatar_16} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Files;
