-- (1) Create a new user account, together with email, password, username, and display name.
-- Assume a new user wants to sign up at some time with:
-- email = 'email@email.com', username = 'username', display name = 'display_name', password = 'password', create date = '2020-01-01 10:10:10'
-- The the insert query will be like this:
insert into user(user_email,user_name, user_alias, user_password, create_date) values 
('email@email.com','username','display_name', 'password','2020-01-01 10:10:10');

-- (2) Create an issue for a project with title and description, and initialize the status of this issue.
-- Assume the the parent project of this issue has id number 1.
-- The reporter's id is 1. issue title = 'issue1', description = 'issue_description', create date = '2020-02-01 10:10:11'
insert into issue(project_id, reporter_id, current_status_id, issue_title, issue_description, create_date)  
select 1, 1, status_id , 'issue1', 'issue_description', '2020-02-01 10:10:11'
from special_status where project_id = 1 and status_type = 'OPEN';

-- (3) For a current user and a certain issue, first check if this user is authorized to assign it to other
-- users (i.e., is a lead); then write a query to add an assignee.
-- Assume: user id = 1, issue id = 1,  assignee id = 9, assign date = '2020-01-01 10:10:14'

SET @uid = 1;
SET @iid = 1;
SET @aid = 9;
Set @adate = '2020-01-01 10:10:14';
-- check if this user is the project creator.
SET @creator = (select creator_id from project where project_id = 
(select project_id from issue where issue_id = 1));
-- check if this user is a lead of the project
SET @leads = (select grantee_id from grant_lead where project_id = 
(select project_id from issue where issue_id = 1));
-- check if this user is authorized to add lead.
SET @if_lead = (
select case 
when (1 = @creator) then 'yes'
when (1 in (@leads)) then 'yes'
else 'no' end);
-- add lead if authorized
insert into assign_issue(assignor_id,assignee_id,issue_id,assign_date)
select @uid, @aid, @iid, @adate
where @if_lead = 'yes';



-- (4) List all possible next statuses of a certain issue, based on its current status
-- Assume: issue id = 1

select end_status_id from transition a 
join 
(select project_id, current_status_id from issue where issue_id = 1) b
on a.project_id = b.project_id and a.start_status_id = b.current_status_id;

-- (5) Show the status change history of a certain issue, sorted by change timestamps in descending order.
-- Assume: issue id = 1

select a.start_status_id, a.end_status_id, b.done_date from
transition a join 
(select transition_id, done_date from issue_status_history where issue_id = 1) b
on a.transition_id = b.transition_id
order by done_date;

-- (6) List any issues for the project with name “Amazon Kindle” where the issue title contains the
-- term “screen”, user “Jeff Bezos” is one of the assignees, and the status of the issue is
-- “OPEN”. 

select a.issue_id, a.project_id, a.reporter_id, a.current_status_id, a.issue_title, a.issue_description, a.create_date 
from issue a 
join (select project_id from project where project_name = 'Amazon Kindle') b
join (select issue_id from 
assign_issue a join user b 
on a.assignee_id = b.user_id
where user_name = 'Jeff Bezos') c
join (select project_id, status_id from status where status_name = 'OPEN') d
on a.project_id = b.project_id and a.issue_id = c.issue_id and a.project_id = d.project_id and a.current_status_id = d.status_id
where a.issue_title like '%screen%';
