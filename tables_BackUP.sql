CREATE TABLE "survey" (
	"surveyID"	INTEGER,
	"surveyname"	VARCHAR(50) NOT NULL,
	"username"	VARCHAR(50) NOT NULL,
	PRIMARY KEY("surveyID" AUTOINCREMENT)
);

CREATE TABLE "questions" (
	"questionID"	INTEGER,
	"question"	text NOT NULL,
	"surveyID"	INTEGER ,
	PRIMARY KEY("questionID","question"),
	FOREIGN KEY(surveyID) REFERENCES survey(surveyID) ON DELETE CASCADE  
);

CREATE TABLE "response" (
	"questionID"	INTEGER,
	"username"	 varchar(50),
	"response"	INT  ,
	PRIMARY KEY("questionID","username"),
	FOREIGN KEY(questionID) REFERENCES question(questionID) ON DELETE CASCADE,
	CHECK ("response" IN (1,0))

);

CREATE TABLE "participants" (
	"surveyID"	INTEGER,
	"username"	 varchar(50),
	PRIMARY KEY("surveyID","username"),
	FOREIGN KEY(surveyID) REFERENCES survey(surveyID) ON DELETE CASCADE  
);