import React, { useEffect } from "react";
import { useParams, Link, Outlet } from "react-router-dom";
import { useinterview } from "../hooks/useinterview.js";
import "./interview.scss";

const Interview = () => {
  const { interviewid } = useParams();

  const { loading, report, getreportbyid } = useinterview();

  useEffect(() => {
    getreportbyid(interviewid);
  }, [interviewid]);

  console.log("🔥 REPORT IN INTERVIEW UI:", report);

  if (loading) {
    return (
      <main className="interview-page">
        <div className="loading">
          <h2>Loading Interview Report...</h2>
          <p>Please wait...</p>
        </div>
      </main>
    );
  }

  if (!report) {
    return (
      <main className="interview-page">
        <div className="loading">
          <h2>Interview report not found</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="interview-page">
      {/* LEFT SIDEBAR */}

      <div className="interview-sidebar">
        <h2>Interview Report</h2>

        <nav>
          <Link to="technical">Technical Questions</Link>

          <Link to="behavioral">Behavioral Questions</Link>

          <Link to="skills">Skill Gaps</Link>

          <Link to="roadmap">Road Map</Link>
        </nav>
      </div>

      {/* MAIN CONTENT */}

      <div className="interview-content">
        {/* REPORT HEADER */}

        <div className="report-header">
          <div>
            <p className="report-label">AI GENERATED REPORT</p>

            <h1>{report.title}</h1>

            <p>
              Personalized interview preparation based on your resume and job
              description.
            </p>
          </div>

          {/* MATCH SCORE */}

          <div className="match-score">
            <span>Match Score</span>

            <strong>{report.matchscore}%</strong>
          </div>
        </div>

        {/* CHILD PAGE */}

        <Outlet context={{ report }} />
      </div>
    </main>
  );
};

export default Interview;
