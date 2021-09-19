<h1> survey Assignment</h1>
<ul>
<li>
<h3>AuthEndpoint</h3>
<p>Takes mock username and Password genrate JWT.</p>
<ol>
<li> 
  POST /auth 
  <h4>Validations:</h4>
  <ul>
  <li>username required</li>
   <li>Password required</li>
  </ul>
</li>
</ol>
</li>
 
  <li>
<h3>SurveyEndpoint</h3>
<p>Allow user to take create delete survey.</p>
  <ol>
    <li> 
      POST /createSurvey : takes surveyname field and create new survey 
      <h4>Validations:</h4>
       <ul>
        <li>survename required</li>
      </ul>
   </li>
  
</li>
  
  <li> 
   POST /addQuestions  : Add mutiple Questions to survey. 
  <h4>Validations:</h4>
    <ul>
      <li>questions must have atleast one question in it</li>
      <li>surveyID required</li>
        <li>Only owner can add question</li>
    </ul>
  </li>

  <li> 
   DELETE /removeQuestions  : remove questions from survey 
  <h4>Validations:</h4>
    <ul>
      <li>questions must have atleast one question in it</li>
      <li>given ID must be exsit</li>
        <li>Only owner can add question</li>
    </ul>
  </li>

  <li> 
   GET /getAllQuestions  : get all questions of survey 
  <h4>Validations:</h4>
    <ul>
      <li>survey ID required</li>
    </ul>
  </li>

    <li> 
   POST /takeSurvey  : allow user to take survey
  <h4>Validations:</h4>
    <ul>
      <li>surveyID required</li>
      <li>response required and atlest containe one entry</li>
    </ul>
  </li>
  
    <li> 
   GET /getSurveyResponse  :Get Suevey Response By username 
  <h4>Validations:</h4>
    <ul>
      <li>surveyID required</li>
      <li>Rusername Required</li>
      <li>Only owner of survey can view response</li>
    </ul>
  </li>
  
  <li> 
   GET /getAllResponse : get all user resposes of particular survey 
  <h4>Validations:</h4>
    <ul>
      <li>surveyID required</li>
      <li>only owner can access</li>
    </ul>
  </li>
  
  <li> 
   GET /getAllParticipants : Get All user who participated on survey.
  <h4>Validations:</h4>
    <ul>
      <li>surveyID required</li>
      <li>only owner can access</li>
    </ul>
  </li>
  
  <li> 
   DELETE /deleteSurvey : Get All user who participated on survey.
  <h4>Validations:</h4>
    <ul>
      <li>surveyID required</li>
      <li>only owner can delete</li>
    </ul>
  </li>
  
  
 </ol>
</li>
 </ul>
