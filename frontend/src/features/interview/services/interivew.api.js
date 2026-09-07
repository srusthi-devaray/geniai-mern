import axios from "axios";

const api = axois.create({
  baseURL: "http://localhost:5000/api/interviews",
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
  formData.append("resumefile", resumefile);

  const response = await api.post("/api/interview", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getinterviewreportbyid = async (interviewid) => {
  const response = await api.get(`/api/interview/${interviewid}`);
  return response.data;
};

export const getallinterviewreports = async () => {
  const response = await api.get("/api/interview");
  return response.data;
};
