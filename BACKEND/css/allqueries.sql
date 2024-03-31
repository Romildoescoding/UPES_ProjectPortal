-- Drop the foreign key constraint on group_assigned table
ALTER TABLE IF EXISTS group_assigned DROP CONSTRAINT IF EXISTS group_assigned_activitycoordinator_id_fkey;

-- Create the Activity_coordinator table
CREATE TABLE IF NOT EXISTS Activity_coordinator (
    activitycoordinator_id VARCHAR(15) PRIMARY KEY,
    activitycoordinator_name VARCHAR(20),
    passwords VARCHAR(20)
);

-- Drop the events table if it exists
DROP TABLE IF EXISTS events;

-- Create the events table
CREATE TABLE IF NOT EXISTS events (
    event_date DATE,
    event_time TIME,
    rubrics VARCHAR(15)
);

-- Insert data into Activity_coordinator table from events
INSERT INTO Activity_coordinator (activitycoordinator_id, activitycoordinator_name, passwords)
SELECT event_date::VARCHAR(15), event_time::VARCHAR(20), rubrics::VARCHAR(20)
FROM events;

-- Drop the students table and its dependent objects
DROP TABLE IF EXISTS students CASCADE;

-- Recreate the students table
CREATE TABLE IF NOT EXISTS students(
    students_id VARCHAR(15) PRIMARY KEY,
    student_name VARCHAR(15),
    passwords VARCHAR(15),
    project_id VARCHAR(10) UNIQUE,
    assigned_faculty JSONB,
    report TEXT
);

-- Drop the group_assigned table if it exists
DROP TABLE IF EXISTS group_assigned;

-- Create the group_assigned table
CREATE TABLE IF NOT EXISTS group_assigned (
    activitycoordinator_id VARCHAR(15) REFERENCES Activity_coordinator(activitycoordinator_id),
    student_id VARCHAR(15) REFERENCES students(students_id),
    group_name VARCHAR(50)
);

-- Drop the project_presentation table if it exists
DROP TABLE IF EXISTS project_presentation;

-- Create the project_presentation table
CREATE TABLE IF NOT EXISTS project_presentation (
    presentation_id SERIAL PRIMARY KEY,
    faculty_id VARCHAR(15) REFERENCES faculty(faculty_id),
    student_id VARCHAR(15) REFERENCES students(students_id),
    marks INT,
    presentation_date DATE
);

-- Insert data into Activity_coordinator and students tables
INSERT INTO Activity_coordinator (activitycoordinator_id, activitycoordinator_name, passwords) VALUES
    ('ac1','john', 'xyz'),
    ('ac2','sqasa' ,'abc'),
    ('ac3', 'asqwe', 'thx')
ON CONFLICT DO NOTHING; -- Ignore duplicate key errors

INSERT INTO students (students_id, student_name, passwords, project_id, assigned_faculty, report) VALUES
    ('s1', 'TANISHQ','xys','PUPES1', '{"faculty_id": "f1", "faculty_name": "DR.GHEE"}','MY NAME IS TANISHQ'),
    ('s2', 'TRIPTI','asq','PUPES2', '{"faculty_id": "f2", "faculty_name": "DR.FEEV"}','MY NAME IS TRIPTI');

-- Insert data into group_assigned table
INSERT INTO group_assigned (activitycoordinator_id, student_id, group_name) VALUES
    ('ac1', 's1', 'Group A'),
    ('ac1', 's2', 'Group A'),
    ('ac2', 's2', 'Group B');

-- Drop the faculty table if it exists
DROP TABLE IF EXISTS faculty CASCADE;

-- Create the faculty table
CREATE TABLE IF NOT EXISTS faculty (
    faculty_id VARCHAR(15) PRIMARY KEY,
    faculty_name VARCHAR(15),
    faculty_password VARCHAR(15)
);

-- Insert data into the faculty table
INSERT INTO faculty (faculty_id, faculty_name, faculty_password) VALUES
    ('f1', 'DR.GHEE', 'password1'),
    ('f2', 'DR.FEEV', 'password2');

-- Select data from the tables
SELECT
    ac.activitycoordinator_name AS activity_coordinator_name,
    s.student_name AS student_name,
    ga.group_name
FROM
    group_assigned ga
JOIN
    Activity_coordinator ac ON ga.activitycoordinator_id = ac.activitycoordinator_id
JOIN
    students s ON ga.student_id = s.students_id;

SELECT f.faculty_name, s.student_name, pp.marks, pp.presentation_date
FROM project_presentation pp
JOIN faculty f ON pp.faculty_id = f.faculty_id
JOIN students s ON pp.student_id = s.students_id;

SELECT s.student_name, f.faculty_name, s.report
FROM students s
JOIN faculty f ON s.faculty_id = f.faculty_id;
