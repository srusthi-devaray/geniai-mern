import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/interview",
  withCredentials: true,
});

export const generateinterviewreport = async ({
  jobdescription,
  selfdescription,
  resumefile,
}) => {
  const formData = new FormData();
  formData.append("jobdescription", jobdescription);
  formData.append("selfdescription", selfdescription);
  formData.append("resume", resumefile);

  const response = await api.post("/", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getinterviewreportbyid = async (interviewid) => {
  const response = await api.get(`/report/${interviewid}`);
  return response.data;
};

export const getallinterviewreports = async () => {
  const response = await api.get("/report");
  return response.data;
};
