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
module.exports = { generateinterviewreportcontroller };
