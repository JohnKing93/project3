USE stepup_db;

INSERT INTO Status_Ref (Type, Description, createdAt, updatedAt)
VALUES ('Project_Sts', 'In Progress', NOW(), NOW()),
('Project_Sts', 'Completed', NOW(), NOW()),
('Project_Sts', 'Archived', NOW(), NOW());
