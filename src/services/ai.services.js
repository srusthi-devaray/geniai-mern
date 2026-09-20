require("dotenv").config({
  path: "../../.env",
});
const { GoogleGenAI } = require("@google/genai");

const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interivewreportschema = z.object({
  matchscore: z
    .number()
    .min(0)
    .max(100)
    .describe("ATS match score between 0 and 100"),

  technicalquestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  behavioralquestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    }),
  ),

  skillsgaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    }),
  ),

  preparationplan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    }),
  ),

  title: z.string(),
});
async function generateinterviewreport({
  resume,
  selfdescription,
  jobdescription,
}) {
  const prompt = `Generate a detailed AI interview preparation report for the candidate.

You MUST return the report using exactly these fields:

1. matchscore
- A numerical ATS match score from 0 to 100.
- Compare the candidate's resume with the job description.

2. technicalquestions
- Generate 5 technical interview questions.
- Questions must be based on the candidate's resume and the job description.
- For every question provide:
  - question
  - intention
  - answer
- The answer should be a good sample answer the candidate can use for preparation.

3. behavioralquestions
- Generate 5 behavioral interview questions.
- For every question provide:
  - question
  - intention
  - answer
- Answers should be realistic and personalized to the candidate.

4. skillsgaps
- Identify skills required by the job description that the candidate needs to improve.
- For every skill provide:
  - skill
  - severity: low, medium, or high

5. preparationplan
- Create a 7-day interview preparation roadmap.
- For every day provide:
  - day
  - focus
  - tasks

6. title
- Create a suitable title for the interview report.

IMPORTANT:
Do not use fields such as:
candidateName,
positionApplied,
overallMatchScore,
skillAlignment,
projectReview,
softSkillsAssessment,
keyStrengths,
growthAreas,
recommendedInterviewQuestions.

Use ONLY the fields defined in the requested structure.

Candidate Resume:
${resume}

Self Description:
${selfdescription}

Job Description:
${jobdescription}`;

  console.log(" INTERVIEW REPORT SERVICE CALLED");
  console.log("PROMPT:", prompt);

  const models = ["gemini-3.8-flash", "gemini-3.6-flash", "gemini-3.5-flash"];

  for (const model of models) {
    try {
      console.log(` TRYING MODEL: ${model}`);

      const responce = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          jsonSchema: zodToJsonSchema(interivewreportschema),
        },
      });

      console.log(`SUCCESS WITH MODEL: ${model}`);

      const result = JSON.parse(responce.text);

      console.log(" GEMINI RESULT:");
      console.log(JSON.stringify(result, null, 2));

      return result;
    } catch (error) {
      console.error(` ${model} FAILED:`, error.message);

      if (error.status === 503) {
        console.log(` ${model} is currently unavailable.`);
        console.log(" Trying the next model...");
        continue;
      }

      throw error;
    }
  }

  throw new Error(
    "All Gemini models are currently unavailable. Please try again later.",
  );
}

module.exports = generateinterviewreport;
