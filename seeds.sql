USE tracker;

INSERT INTO department
 (name)
VALUES 
("SALES"),
("ENGINEERING"),
("LEGAL"),
("FINANCES");

INSERT INTO role
(title, salary, department_id)
VALUES
("Sales Lead", 100000, 1),
("Salesperson", 60000, 1),
("Lawyer", 100000, 3),
("Accountant", 300000, 4),
("Software Engineer", 120000, 2),
("Accounts Receivables", 80000, 4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
("John", "Doe", 1, 1),
("Mary", "Mack", 2, 1),
("Mike", "Ike", 3, 1),
("Plain", "Jane", 4, 1),
("Fefe", "Fierce", 5, 1), 
("Mirana", "Cosgrove", 5, 1),
("Dylan", "Disaster", 6, 1);