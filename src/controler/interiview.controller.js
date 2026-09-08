const pdfparse = require("pdf-parse");

const generateinterviewreport = require("../services/ai.services");

const interviewreportmodel = require("../models/interviewreport");

console.log("🔥 INTERVIEW REPORT SERVICE CALLED");

async function generateinterviewreportcontroller(req, res) {
  try {
    console.log("🔥 CONTROLLER STARTED");

    console.log(req.file);
    console.log(req.body);

    if (!req.file) {
      return res.status(400).json({
        message: "Resume file not uploaded",
      });
    }

    console.log(req.file.buffer);

    const resumefile = req.file;

    const resumecontent = await new pdfparse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();

    console.log("🔥 PDF TEXT EXTRACTED");

    const { selfdescription, jobdescription } = req.body;

    const interviewreportbyai = await generateinterviewreport({
      resume: resumecontent.text,
      selfdescription,
      jobdescription,
    });

    console.log("🔥 CONTROLLER RECEIVED:", interviewreportbyai);

    const interviewreport = await interviewreportmodel.create({
      user: req.user.id,
      resume: resumecontent.text,
      selfdescription,
      jobdescription,
      ...interviewreportbyai,
      title: "AI Generated Interview Report",
    });

    console.log("🔥 DATABASE REPORT CREATED:", interviewreport);

    res.status(201).json({
      message: "interview report generated successfully",
      interviewreport,
    });
  } catch (error) {
    console.error("🔥 INTERVIEW CONTROLLER ERROR:", error);

    res.status(500).json({
      message: "Failed to generate interview report",
      error: error.message,
    });
  }
}

async function getinterviewreportbyidcontroller(req, res) {
  const { interviewid } = req.params;

  const interviewreport = await interviewreportmodel.findById(interviewid);

  if (!interviewreport) {
    return res.status(404).json({
      message: "Interview report not found",
    });
  }

  res.status(200).json({
    message: "Interview report retrieved successfully",
    interviewreport,
  });
}

async function getallinterviewreportcontroller(req, res) {
  const interviewreports = await interviewreportmodel.find({
    user: req.user.id,
  });

  res.status(200).json({
    message: "Interview reports retrieved successfully",
    interviewreports,
  });
}

module.exports = {
  generateinterviewreportcontroller,
  getinterviewreportbyidcontroller,
  getallinterviewreportcontroller,
};
