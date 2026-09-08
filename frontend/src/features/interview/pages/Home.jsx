import React, { useState, useRef } from "react";
import "../style/home.scss";
import { useinterview } from "../hooks/useinterview.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, report, reports, generateReport } = useinterview();

  const [jobdescription, setjobdescription] = useState("");
  const [selfdescription, setselfdescription] = useState("");
  const [resumefile, setresumefile] = useState(null);

  const resumeref = useRef(null);
  const navigate = useNavigate();

  const handlegeneratereport = async () => {
    const resumefile = resumeref.current.files[0];

    if (!jobdescription) {
      alert("Please enter job description");
      return;
    }

    if (!resumefile) {
      alert("Please upload resume");
      return;
    }

    const data = await generateReport({
      jobdescription,
      selfdescription,
      resumefile: resumefile,
    });

    if (!data) {
      return;
    }

    navigate(`/interview/${data._id}`);
  };

  return (
    <main className="home">
      <div className="home-header">
        <div className="badge">✨ AI Powered Interview Preparation</div>

        <h1>
          Prepare for your <span>Interview</span>
        </h1>

        <p>
          Upload your resume and tell us about yourself. Let AI create your
          interview report.
        </p>
      </div>

      <div className="interview-input-group">
        <div className="left">
          <label className="jobdescription" htmlFor="jobdescription">
            Job Description
          </label>

          <textarea
            name="jobdescription"
            id="jobdescription"
            value={jobdescription}
            onChange={(e) => setjobdescription(e.target.value)}
            placeholder="Enter the job description..."
          ></textarea>
        </div>

        <div className="right">
          <div className="input-group">
            <p>
              Resume
              <small>Upload your resume in PDF format</small>
            </p>

            <label className="file-label" htmlFor="resume">
              📄 Upload Resume
            </label>

            <input
              ref={resumeref}
              hidden
              type="file"
              name="resume"
              id="resume"
              accept=".pdf"
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="selfdescription">About Yourself</label>

            <textarea
              value={selfdescription}
              onChange={(e) => setselfdescription(e.target.value)}
              name="selfdescription"
              id="selfdescription"
              placeholder="Describe yourself in a few sentences..."
            ></textarea>
          </div>

          <button
            className="button primary-button"
            onClick={handlegeneratereport}
            disabled={loading}
          >
            {loading ? "Generating report..." : "✨ Generate Interview Report"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
