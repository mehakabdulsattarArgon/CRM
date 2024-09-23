import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../../constants/urls";

const Proposals = ({ setData }) => {
  const [proposals, setProposals] = useState([]);
  const authToken = localStorage.getItem("BearerToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}jobs/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setProposals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching proposals:", error);
      });
  }, [authToken]);

  const handleNavigate = (proposal) => {
    navigate("/view-proposal-details", { state: { proposal } });
  };

  return (
    <div className="row">
      {proposals.map((proposal) => (
        <div
          key={proposal.id}
          className="col-lg-4 col-sm-6 col-md-4 col-xl-3 d-flex"
        >
          <div className="card w-100">
            <div className="card-body">
              <h4
                className="project-title"
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate(proposal)}
              >
                {proposal.title}
              </h4>
              <p className="text-muted">
                {proposal.description.length > 140
                  ? `${proposal.description.slice(0, 140)}...`
                  : proposal.description}
              </p>
              <div className="pro-deadline m-b-15">
                <div className="sub-title">Client:</div>
                <div className="text-muted">{proposal.client}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Proposals;
