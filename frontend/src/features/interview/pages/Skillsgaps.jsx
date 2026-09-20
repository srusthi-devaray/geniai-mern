import React from "react";
import { useOutletContext } from "react-router-dom";

const SkillGaps = () => {
  const { report } = useOutletContext();

  return (
    <section className="report-section">
      <h2>Skill Gaps</h2>

      <div className="skill-list">
        {report.skillsgaps.map((item, index) => (
          <div className="skill-card" key={index}>
            <span>{item.skill}</span>

            <small className={item.severity}>{item.severity}</small>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillGaps;
