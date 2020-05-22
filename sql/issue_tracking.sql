DROP DATABASE IF EXISTS issue_tracking;

CREATE DATABASE issue_tracking;
USE issue_tracking;

CREATE TABLE user (
  user_id int AUTO_INCREMENT NOT NULL,
  user_email varchar(40) UNIQUE NOT NULL ,
  user_name varchar(40) UNIQUE NOT NULL,
  user_alias varchar(40) NOT NULL,
  user_password varbinary(60) NOT NULL,
  create_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY (user_email, user_name),
  PRIMARY KEY (user_id)
);

INSERT INTO user(user_email, user_name, user_alias, user_password, create_date) VALUES
('user1@email.com','test_user_1','user1', AES_ENCRYPT('user_password1',"project"),'2020-01-01 10:10:10'),
('user2@email.com','test_user_2','user2', AES_ENCRYPT('user_password2',"project"),'2020-01-02 10:10:10'),
('user3@email.com','test_user_3','user3', AES_ENCRYPT('user_password3',"project"),'2020-01-03 10:10:10'),
('user4@email.com','test_user_4','user4', AES_ENCRYPT('user_password4',"project"),'2020-01-04 10:10:10'),

('boss@amazon.com','test_user_5','Jeff Bezos', AES_ENCRYPT('amazon_boss_password',"project"),'2020-01-05 10:10:10'),
('boss@apple.com','test_user_6','Steve Jobs', AES_ENCRYPT('apple_boss_password',"project"),'2020-01-06 10:10:10'),
('boss@facebook.com','test_user_7','Mark Zuckerberg', AES_ENCRYPT('facebook_boss_password',"project"),'2020-01-07 10:10:10'),
('boss@microsoft.com','test_user_8','Bill Gates', AES_ENCRYPT('microsoft_boss_password',"project"),'2020-01-08 10:10:10'),

('staff1@amazon.com','test_user_9','amazon_staff1', AES_ENCRYPT('amazon_staff1_password',"project"),'2020-01-09 10:10:10'),
('staff1@apple.com','test_user_10','apple_staff1', AES_ENCRYPT('apple_staff1_password',"project"),'2020-01-10 10:10:10'),
('staff1@facebook.com','test_user_11','facebook_staff1', AES_ENCRYPT('facebook_staff1_password',"project"),'2020-01-11 10:10:10'),
('staff1@microsoft.com','test_user_12','microsoft_staff1', AES_ENCRYPT('microsoft_staff1_password',"project"),'2020-01-12 10:10:10');

CREATE TABLE project (
  project_id int AUTO_INCREMENT NOT NULL,
  creator_id int NOT NULL,
  project_name varchar(40) NOT NULL,
  project_description varchar(150) NOT NULL,
  create_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT project_uk_creator_project UNIQUE KEY (creator_id, project_name),
  CONSTRAINT project_fk_creator_id FOREIGN KEY (creator_id) REFERENCES user (user_id),
  PRIMARY KEY (project_id)
);

INSERT INTO project(creator_id, project_name, project_description, create_date) VALUES
(1,'Amazon', 'Start Amazon.','2020-01-01 10:10:11'),
(2,'Apple', 'Start Apple.','2020-01-02 10:10:11'),
(3,'Facebook', 'Start Facebook.','2020-01-03 10:10:11'),
(4,'Microsoft', 'Start Microsoft.','2020-01-04 10:10:11');


CREATE TABLE status (
  status_id int AUTO_INCREMENT NOT NULL,
  project_id int NOT NULL,
  status_name varchar(40) NOT NULL,
  CONSTRAINT status_fk_project_id FOREIGN KEY (project_id) REFERENCES project (project_id),
  PRIMARY KEY (status_id)
);

INSERT INTO status(project_id, status_name) VALUES
(1,'OPEN'),
(1,'IN PROGRESS'),
(1,'UNDER REVIEW'),
(1,'FINAL APPROVAL'),
(1,'DONE'),

(2,'OPEN'),
(2,'IN PROGRESS'),
(2,'UNDER REVIEW'),
(2,'FINAL APPROVAL'),
(2,'DONE'),

(3,'OPEN'),
(3,'IN PROGRESS'),
(3,'UNDER REVIEW'),
(3,'FINAL APPROVAL'),
(3,'DONE'),

(4,'OPEN'),
(4,'IN PROGRESS'),
(4,'UNDER REVIEW'),
(4,'FINAL APPROVAL'),
(4,'DONE');

CREATE TABLE special_status (
  status_id int NOT NULL,
  project_id int NOT NULL,
  status_type ENUM('OPEN','CLOSED') NOT NULL,
  CONSTRAINT special_status_fk_status_id FOREIGN KEY (status_id) REFERENCES status (status_id),
  CONSTRAINT special_status_fk_project_id FOREIGN KEY (project_id) REFERENCES project (project_id),
  PRIMARY KEY (project_id, status_type)
);

INSERT INTO special_status(status_id, project_id, status_type) VALUES
(1,1,'OPEN'),
(5,1,'CLOSED'),

(6,2,'OPEN'),
(10,2,'CLOSED'),

(11,3,'OPEN'),
(15,3,'CLOSED'),

(16,4,'OPEN'),
(20,4,'CLOSED');


CREATE TABLE transition (
  transition_id int AUTO_INCREMENT NOT NULL,
  project_id int NOT NULL,
  start_status_id int NOT NULL,
  end_status_id int NOT NULL,
  CONSTRAINT transition_fk_project_id FOREIGN KEY (project_id) REFERENCES project (project_id),
  CONSTRAINT transition_fk_start_status_id FOREIGN KEY (start_status_id) REFERENCES status (status_id),
  CONSTRAINT transition_fk_end_status_id FOREIGN KEY (end_status_id) REFERENCES status (status_id),
  PRIMARY KEY (transition_id)
);

INSERT INTO transition(project_id,start_status_id,end_status_id) VALUES
(1,1,2),
(1,2,3),
(1,3,4),
(1,4,3),
(1,3,2),
(1,2,1),
(1,4,5),

(2,6,7),
(2,7,8),
(2,8,9),
(2,9,8),
(2,8,7),
(2,7,6),
(2,9,10),

(3,11,12),
(3,12,13),
(3,13,14),
(3,14,13),
(3,13,12),
(3,12,11),
(3,14,15),

(4,16,17),
(4,17,18),
(4,18,19),
(4,19,18),
(4,18,17),
(4,17,16),
(4,19,20);

CREATE TABLE issue (
  issue_id int AUTO_INCREMENT NOT NULL,
  project_id int NOT NULL,
  reporter_id int NOT NULL,
  current_status_id int NOT NULL,
  issue_title varchar(40) NOT NULL,
  issue_description varchar(150) NOT NULL,
  create_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT issue_fk_project_id FOREIGN KEY (project_id) REFERENCES project (project_id),
  CONSTRAINT issue_fk_reporter_id FOREIGN KEY (reporter_id) REFERENCES user (user_id),
  CONSTRAINT issue_fk_current_status_id FOREIGN KEY (current_status_id) REFERENCES status (status_id),
  PRIMARY KEY (issue_id)
);

INSERT INTO issue(project_id, reporter_id, current_status_id, issue_title, issue_description, create_date) VALUES
(1,1,1,'Amazon issue 1', 'Amazon has some issues.', '2020-01-01 10:10:12'),
(1,2,2,'Amazon issue 1', 'Amazon has some issues.', '2020-01-01 10:10:12'),
(2,2,6,'Apple issue 1', 'Apple has some issues.', '2020-01-02 10:10:12'),
(3,3,11,'Facebook issue 1', 'Facebook has some issues.', '2020-01-03 10:10:12'),
(4,4,16,'Microsoft issue 1', 'Microsoft has some issues.', '2020-01-04 10:10:12');


CREATE TABLE grant_lead (
  grantor_id int NOT NULL,
  grantee_id int NOT NULL,
  project_id int NOT NULL,
  grant_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT grant_lead_fk_grantor_id FOREIGN KEY (grantor_id) REFERENCES user (user_id),
  CONSTRAINT grant_lead_fk_grantee_id FOREIGN KEY (grantee_id) REFERENCES user (user_id),
  CONSTRAINT grant_lead_fk_project_id FOREIGN KEY (project_id) REFERENCES project (project_id),
  PRIMARY KEY (grantee_id, project_id)
);

INSERT INTO grant_lead(grantor_id, grantee_id, project_id, grant_date) VALUES
(1,5,1,'2020-01-01 10:10:13'),
(2,6,2,'2020-01-02 10:10:13'),
(3,7,3,'2020-01-03 10:10:13'),
(4,8,4,'2020-01-04 10:10:13');


CREATE TABLE assign_issue (
  assignor_id int NOT NULL,
  assignee_id int NOT NULL,
  issue_id int NOT NULL,
  assign_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT assign_issue_fk_assignor_id FOREIGN KEY (assignor_id) REFERENCES user (user_id),
  CONSTRAINT assign_issue_fk_assignee_id FOREIGN KEY (assignee_id) REFERENCES user (user_id),
  CONSTRAINT assign_issue_fk_issue_id FOREIGN KEY (issue_id) REFERENCES issue (issue_id),
  PRIMARY KEY (assignee_id, issue_id)
);

INSERT INTO assign_issue(assignor_id, assignee_id, issue_id, assign_date) VALUES
(5,9,1,'2020-01-01 10:10:14'),
(6,10,2,'2020-01-02 10:10:14'),
(7,11,3,'2020-01-03 10:10:14'),
(8,12,4,'2020-01-04 10:10:14');

CREATE TABLE issue_status_history (
  issue_id int NOT NULL,
  assignee_id int NOT NULL,
  transition_id int NOT NULL,
  done_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT issue_status_history_fk_issue_id FOREIGN KEY (issue_id) REFERENCES issue (issue_id),
  CONSTRAINT issue_status_history_fk_assignee_id FOREIGN KEY (assignee_id) REFERENCES user (user_id),
  CONSTRAINT issue_status_history_fk_transition_id FOREIGN KEY (transition_id) REFERENCES transition (transition_id),
  PRIMARY KEY (issue_id, assignee_id, transition_id, done_date)
);

INSERT INTO issue_status_history(issue_id, assignee_id, transition_id, done_date) VALUES
(1,9,1,'2020-01-01 10:10:15'),
(1,9,2,'2020-01-01 10:10:16'),
(1,9,3,'2020-01-01 10:10:17'),
(1,9,7,'2020-01-01 10:10:18'),

(2,10,8,'2020-01-02 10:10:15'),
(2,10,9,'2020-01-02 10:10:16'),
(2,10,10,'2020-01-02 10:10:17'),
(2,10,14,'2020-01-02 10:10:18'),

(3,11,15,'2020-01-03 10:10:15'),
(3,11,16,'2020-01-03 10:10:16'),
(3,11,17,'2020-01-03 10:10:17'),
(3,11,21,'2020-01-03 10:10:18'),

(4,12,22,'2020-01-04 10:10:15'),
(4,12,23,'2020-01-04 10:10:16'),
(4,12,24,'2020-01-04 10:10:17'),
(4,12,28,'2020-01-04 10:10:18');