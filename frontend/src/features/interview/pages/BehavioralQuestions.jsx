import React from "react";
import { useOutletContext } from "react-router-dom";

const BehavioralQuestions = () => {
  const { report } = useOutletContext();

  return (
    <section className="report-section">
      <h2>Behavioral Questions</h2>

      {report.behavioralquestions.map((item, index) => (
        <div className="question-card" key={index}>
          <h3>
            Q{index + 1}. {item.question}
          </h3>

          <p>
            <strong>Intention:</strong> {item.intention}
          </p>

          <p>
            <strong>How to answer:</strong> {item.answer}
          </p>
        </div>
      ))}
    </section>
  );
};

export default BehavioralQuestions;
