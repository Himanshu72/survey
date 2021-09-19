var express = require('express');
var router = express.Router();
const DBUtility = require("../DB/utility");
const JWTVerify = require("../middleware/JWTVerify")
const validator = require("../middleware/validator")
//JWT Verify Middleware
router.use(JWTVerify.JWTVerify);


/* GET home page. */



router.get('/', async function (req, res, next) {
  console.log(req.body);
  res.render('index', { title: 'Survey ENDPOINT' });
});

router.get("/getAllQuestions", validator.validteGetAllQuestion, async (req, res) => {
  try {
    const result = await DBUtility.getAllQuestions(req.body.surveyID);
    console.log(result);
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.post("/createSurvey", validator.validateCreateSurey, async function (req, res, next) {
  try {
    const result = await DBUtility.createSurvey(req.body);
    console.log(result);
    res.status(201).json({
      ...req.body,
      surveyID: result[0]
    });
  } catch (e) {
    console.log(e);
    res.status(500).json(e)
  }
});

router.delete("/deleteSurvey", validator.validateDeletSuervey, async (req, res) => {
  try {
    let result = await DBUtility.deleteSurvey(req.body.surveyID);
    if (result)
      res.status(200).json({ message: "Successfully deleted survey", surveyID: req.body.surveyID })
    else
      res.status(404).json({ message: "Invalid SurveyID..." })

  } catch (e) {
    console.log(e);
    res.status(400).json(e);

  }
});

router.post("/addQuestions", validator.validateAddQuestions, async (req, res) => {
  try {
    let lastID = await DBUtility.addQuestions(req.body);
    console.log(lastID)
    lastID = lastID[0];
    let result = [];
    let c = 0;
    for (let x = lastID - req.body.questions.length + 1; x <= lastID; x++) {
      result.push({
        surveyID: req.body.surveyID,
        questionID: x,
        question: req.body.questions[c]
      })
      c++;
    }
    console.log(result);
    res.status(201).json(result);

  } catch (e) {
    console.log(e);
    res.status(500).json(e)


  }
});

router.delete("/removeQuestions", validator.validateRemoveQuestion, async (req, res) => {
  try {
    let result = await DBUtility.removeQuestion(req.body.questionIDs);
    console.log(result);
    if (result)
      res.status(200).json({
        questionIDs: req.body.questionIDs,
        message: "Successfully Deleted",
        count: result
      })
    else
      res.status(404).json({ message: "Invalid Question ID" })

  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/takeSurvey", validator.validateTakeSurvey, async (req, res) => {
  try {
    const result = await DBUtility.takeSurvey(req.body);
    console.log(result);
    res.status(201).json({ message: "Sucessfully Responded", responses: req.body.responses })
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});
router.get("/getSurveyResponse", validator.validateGetSurveyResponse, async (req, res) => {
  try {
    const result = await DBUtility.getSurveyResponse(req.body.Rusername, req.body.surveyID)
    console.log(result)
    res.status(200).send({ surveyID: req.body.surveyID, data: result });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
})

router.get("/getAllResponse", validator.validateGetAllResponse, async (req, res) => {
  try {
    const result = await DBUtility.getAllResponse(req.body.surveyID);
    console.log(result)
    res.status(200).json({ surveyID: req.body.surveyID, data: result });
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
})

router.get("/getAllParticipants", validator.validateGetAllParticipant, async (req, res) => {
  try {
    const result = await DBUtility.getAllParticipants(req.body.surveyID);
    console.log(result);
    res.status(200).json({ surveyID: req.body.surveyID, data: result });
  } catch (e) {
    console.log(e);
    res.status(500).JSON(e);
  }
});

router.all("*", (req, res) => {
  res.status(404).json({ message: "Invalid Path" })
})

module.exports = router;
