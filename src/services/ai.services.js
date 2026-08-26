require("dotenv").config({
  path: "../../.env",
});
const { GoogleGenAI } = require("@google/genai");

const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

console.log("🔥 USING ai.services.js");

const interivewreportschema = z.object({
  matchscore: z
    .number()
    .describe(
      "the score between 0 to 100 indicating how well the candidate matches the job description",
    ),

  technicalquestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question to be asked in the interview"),
        intention: z
          .string()
          .describe("the intention of interivew   behind asking the question"),
        answer: z
          .string()
          .describe(
            "how to answer this question what points to be covered in the answer",
          ),
      }),
    )
    .describe(
      "technical questions to be asked in the interview alongwith the intention behind asking the question and how to answer it",
    ),

  behavioralquestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question to be asked in the interview"),
        intention: z
          .string()
          .describe("the intention of interivew   behind asking the question"),
        answer: z
          .string()
          .describe(
            "how to answer this question what points to be covered in the answer",
          ),
      }),
    )
    .describe(
      "behavioral questions to be asked in the interview alongwith the intention behind asking the question and how to answer it",
    ),

  skillsgaps: z
    .array(
      z.object({
        skill: z.string().describe("the skill which the  candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe("the severity of the skill gap"),
      }),
    )
    .describe(
      "list of skill gap in the candidate's profile along with there skills",
    ),

  preparationplan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("the day number of the preparation plan starting from 1"),
        focus: z
          .string()
          .describe("the focus was was preparation of an interivew"),
        tasks: z
          .array(z.string())
          .describe("the tasks to be completed on that day"),
      }),
    )
    .describe(
      "the preparation plan for the candidate to prepare for the interview along with the focus and tasks to be completed on that day",
    ),
});

async function generateinterviewreport({
  resume,
  selfdescription,
  jobdescription,
}) {
  const prompt = `Generate an interview report for a candidate based on the following information:
Resume: ${resume}
Self Description: ${selfdescription}
Job Description: ${jobdescription}`;

  console.log("🔥 INTERVIEW REPORT SERVICE CALLED");
  console.log("PROMPT:", prompt);
  const responce = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      jsonSchema: zodToJsonSchema(interivewreportschema),
    },
  });
  const result = JSON.parse(responce.text);
  console.log("🔥 GEMINI RESULT:");
  console.log(JSON.stringify(result, null, 2));

  console.log("INTERVIEW REPORT AI RESULT:", result);

  return result;

  console.log(JSON.parse(responce.text));
  return JSON.parse(responce.text);
}

module.exports = generateinterviewreport;
