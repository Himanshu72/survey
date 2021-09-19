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


  
 </ol>
</li>
 </ul>
