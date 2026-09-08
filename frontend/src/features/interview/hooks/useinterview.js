import {
  generateinterviewreport,
  getallinterviewreports,
  getinterviewreportbyid,
} from "../services/interivew.api";

import { useContext } from "react";
import { InterviewContext } from "../interivew.context.jsx";

export const useinterview = () => {
  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useinterview must be used within an InterviewProvider");
  }
  const { loading, setloading, report, setreport, reports, setreports } =
    context;

  const generateReport = async ({
    jobdescription,
    selfdescription,
    resumefile: resumefil,
  }) => {
    setloading(true);
    try {
      const response = await generateinterviewreport({
        jobdescription,
        selfdescription,
        resumefile: resumefil,
      });
      setreport(response.interviewreport);
      return response.interviewreport;
    } catch (error) {
      console.error("Error generating interview report:", error);
    } finally {
      setloading(false);
    }
  };

  const getreportbyid = async (interviewid) => {
    setloading(true);
    try {
      const response = await getinterviewreportbyid(interviewid);
      setreport(response.interviewreport);
    } catch (error) {
      console.error("Error fetching interview report by ID:", error);
    } finally {
      setloading(false);
    }
  };

  const getreports = async () => {
    setloading(true);
    try {
      const response = await getallinterviewreports();
      setreports(response.interivewreports);
      return response.interivewreport;
    } catch (error) {
      console.error("Error fetching all interview reports:", error);
    } finally {
      setloading(false);
    }
  };
  return {
    loading,
    report,
    reports,
    generateReport,
    getreportbyid,
    getreports,
  };
};
