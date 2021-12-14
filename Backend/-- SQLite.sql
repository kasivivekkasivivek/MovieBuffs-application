-- SQLite

CREATE TABLE users(
FirstName varchar(100) not null,
LastName varchar(100) not null,
UserName varchar(100) unique not null,
EmailAddress varchar(100) PRIMARY KEY not null,
SecurityQuestion varchar(100) not null,
SecurityAnswer varchar(500) not null,
UserPassword varchar(1000) not null
);

DROP table users;

INSERT INTO USERS(FirstName,LastName,UserName,EmailAddress,
SecurityQuestion,SecurityAnswer,UserPassword) VALUES ("vivek","Kasireddy","kasivivek",
"vivek@gmail.com","What id your pet name?","sunny","helloworld");

select * from users;
