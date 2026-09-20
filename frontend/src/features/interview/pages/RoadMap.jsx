import React from "react";
import { useOutletContext } from "react-router-dom";

const RoadMap = () => {
  const { report } = useOutletContext();

  return (
    <section className="report-section">
      <h2>Road Map</h2>

      {report.preparationplan.map((item, index) => (
        <div className="roadmap-card" key={index}>
          <div className="day">{item.day}</div>

          <div>
            <h3>{item.focus}</h3>

            <ul>
              {item.tasks.map((task, taskindex) => (
                <li key={taskindex}>{task}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default RoadMap;
