import React, { useState, useRef } from "react";
import "../style/home.scss";
import { useinterview } from "../hooks/useinterview.js";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { loading, report, reports, generateReport } = useinterview();
  const [jobdescription, setjobdescription] = useState("");
  const [selfdescription, setselfdescription] = useState("");
  const [resumefil, setresumefil] = useState(null);
  const [resumeref] = useRef(null);
  const navigate = useNavigate();

  const handlegeneratereport = async () => {
    const resumefile = resumeref.current.files[0];
    const data = await generateReport({
      jobdescription,
      selfdescription,
      resumefil: resumefile,
    });

    navigate(`/interview/${data._id}`);
  };

  return (
    <main className="home">
      <div className="interview-input-group">
        <div className="left">
          <label className="jobdescription" htmlFor="jobdescription">
            job description
          </label>
          <textarea
            name="jobdescription"
            id="jobdescription"
            value={jobdescription}
            onChange={(e) => setjobdescription(e.target.value)}
            placeholder="enter your jobdescription"
          ></textarea>
        </div>

        <div className="right">
          <div className="input-group">
            <p>
              {" "}
              Resume{" "}
              <small>
                use resume and self description together for best results
              </small>
            </p>
            <label className="file-label" htmlFor="resume">
              upload resume
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
            <label htmlFor="selfdescription">selfdescription</label>
            <textarea
              value={selfdescription}
              onChange={(e) => setselfdescription(e.target.value)}
              name="selfdescription"
              id="selfdescription"
              placeholder="describe yourself in few sentences"
            ></textarea>
          </div>

          <button
            className=" button primary-button"
            onClick={handlegeneratereport}
            disabled={loading}
          >
            Generate interview report
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
