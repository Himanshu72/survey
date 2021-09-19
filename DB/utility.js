const knex = require("./knex");

module.exports = {
    createSurvey: (data) => {
        return knex("survey").insert(data);
    },
    deleteSurvey: (ID) => {
        return knex("survey").where('surveyID', ID).del();
    },
    addQuestions: (data) => {
        const row = [];
        data.questions.forEach(element => {
            row.push({ surveyID: data.surveyID, question: element })
        });
        return knex.batchInsert('questions', row, row.length)
            .returning('questionID');
    },
    removeQuestion: (IDs) => {
        return knex("questions").whereIn("questionID", IDs).del();
    },
    getAllParticipants: (surveyID) => {
        return knex("participants").select("username").where("surveyID", surveyID);
    },
    createParticipants: (data) => {
        return knex("participants").insert(data);
    },
    takeSurvey: (data) => {
        let responses = [];
        data.responses.forEach(ele => {
            responses.push({ ...ele, username: data.username });
        })

        return knex.transaction(function (trx) {

            knex('participants').transacting(trx).insert({ username: data.username, surveyID: data.surveyID })
                .then(function (resp) {
                    return knex.batchInsert('response', responses, responses.length)
                        .transacting(trx).returning("*");

                })
                .then(trx.commit)
                .catch(trx.rollback);


        })


    },

    getSurveyResponse: (username, surveyID) => {

        return knex('participants as p')
            .join('response as r', 'r.username', 'p.username')
            .select("r.username", "r.response", "r.questionID")
            .where({ surveyID: surveyID, "r.username": username })

    },
    getAllResponse: (surveyID) => {
        return knex('participants as p')
            .join('response as r', 'r.username', 'p.username')
            .select("r.username", "r.response", "r.questionID")
            .where({ surveyID: surveyID })

    },
    getAllQuestions: (surveyID) => {
        return knex("questions").where("surveyID", surveyID);
    },
    getSurvey(surveyID) {
        return knex("survey").where("surveyID", surveyID);
    },
    getQuestionsByIds(IDs) {
        return knex("questions").whereIn("questionID", IDs);
    },
    getQuestionsBySurveyID(surveyID) {
        return knex("questions").where("surveyID", surveyID);
    }
}
