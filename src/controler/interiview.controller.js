const pdfparse = require("pdf-parse");
const generateinterviewreport = require("../services/ai.services");
const interviewreportmodel = require("../models/interviewreport");

console.log("🔥 INTERVIEW REPORT SERVICE CALLED");
async function generateinterviewreportcontroller(req, res) {
  console.log(req.file);
  console.log(req.file.buffer);

  const resumefile = req.file;
  const resumecontent = await new pdfparse.PDFParse(
    Uint8Array.from(req.file.buffer),
  ).getText();
  const { selfdescription, jobdescription } = req.body;
  const interviewreportbyai = await generateinterviewreport({
    resume: resumecontent.text,
    selfdescription,
    jobdescription,
  });

  const interviewreport = await interviewreportmodel.create({
    user: req.user.id,
    resume: resumecontent.text,
    selfdescription,
    jobdescription,
    ...interviewreportbyai,
  });

  res.status(201).json({
    message: "interview report generated successfully",
    interviewreport,
  });

  console.log("🔥 CONTROLLER RECEIVED:", interviewreportbyai);
}

async function getinterviewreportbyidcontroller(req, res) {
  const {interviewid} = req.params;
  const interivewreport=await interviewreportmodel.findById(interviewid);
  if (!interivewreport) {
    return res.status(404).json({ message: "Interview report not found" });
}

res.status(200).json({
  message: "Interview report retrieved successfully",
  interivewreport,
})

async function getallinterviewreportcontroller(req, res) {
  const interviewreports = await interviewreportmodel.find({ user: req.user.id });
  res.status(200).json({
    message: "Interview reports retrieved successfully",
    interviewreports,
  });
}

module.exports = { generateinterviewreportcontroller, getinterviewreportbyidcontroller, getallinterviewreportcontroller }