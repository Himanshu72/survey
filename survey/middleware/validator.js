const DButility = require("../DB/utility");

const sendDataTOclient = (res, status, message) => {
    res.status(status).json({
        message: message
    });
}

const isOwner = async (username, surveyID) => {
    const result = await DButility.getSurvey(surveyID);
    if (result && result[0] && result[0].username) {
        console.log(result)

        if (result[0].username === username)
            return true
        else
            return false
    }
    return false;
}

const isValidQuestionIDs = async (res, qids, username) => {
    const result = await DButility.getQuestionsByIds(qids);
    result.forEach(async ele => {
        const flag = await isOwner(username, ele.surveyID);
        if (!flag)
            sendDataTOclient(res, 402, "Access Denied")
    });
}

const filterQuestionsBySurvey = async (req) => {
    const result = await DButility.getQuestionsBySurveyID(req.body.surveyID);
    let map = [];
    result.forEach((ele) => {
        map[ele.questionID] = 1;
    })

    req.body.responses = req.body.responses.filter((ele) => {
        return map[ele.questionID];
    })
}
module.exports = {
    validateCreateSurey: (req, res, next) => {
        if (!req.body.surveyname)
            sendDataTOclient(res, 400, "surveyname required");
        next();

    },
    validateAddQuestions: async (req, res, next) => {
        console.log("----->", req.body)
        if (!req.body.surveyID)
            sendDataTOclient(res, 400, "surveyID  required")
        if (!req.body.questions || req.body.questions.length == 0)
            sendDataTOclient(res, 400, "questions  required")
        if (!await isOwner(req.body.username, req.body.surveyID))
            sendDataTOclient(res, 403, "Access Denied")
        next();
    },
    validateRemoveQuestion: async (req, res, next) => {
        if (!req.body.questionIDs || req.body.questionIDs.length == 0)
            sendDataTOclient(res, 400, "questionIDs required")
        await isValidQuestionIDs(res, req.body.questionIDs, req.body.username)
        next();
    },
    validateDeletSuervey: async (req, res, next) => {
        if (!req.body.surveyID)
            sendDataTOclient(res, 400, "surveyID required");
        if (!await isOwner(req.body.username, req.body.surveyID))
            sendDataTOclient(res, 403, "Acess Denied");
        next();
    }
    ,
    validteGetAllQuestion: (req, res, next) => {
        if (!req.body.surveyID)
            sendDataTOclient(res, 400, "surveyID Required");
        next();
    },
    async validateTakeSurvey(req, res, next) {
        if (!req.body.surveyID)
            sendDataTOclient(res, 400, "surveyID Required");
        if (!req.body.responses || req.body.responses.length == 0)
            sendDataTOclient(res, 400, "responses Required");
        await filterQuestionsBySurvey(req)
        next();
    },
    validateGetSurveyResponse: async (req, res, next) => {
        if (!req.body.surveyID)
            sendDataTOclient(res, 400, "surveyID Required");
        if (!req.body.Rusername)
            sendDataTOclient(res, 400, "Rusername Required");
        if (!await isOwner(req.body.username, req.body.surveyID))
            sendDataTOclient(res, 403, "Acess Denied");
        next();
    },
    validateGetAllResponse: async (req, res, next) => {
        if (!req.body.surveyID)
            sendDataTOclient(res, 400, "surveyID Required");
        if (!await isOwner(req.body.username, req.body.surveyID))
            sendDataTOclient(res, 403, "Acess Denied");
        next();
    },
    validateGetAllParticipant: async (req, res, next) => {
        if (!req.body.surveyID)
            sendDataTOclient(res, 400, "surveyID Required");
        if (!await isOwner(req.body.username, req.body.surveyID))
            sendDataTOclient(res, 403, "Acess Denied");
        next();
    }
}