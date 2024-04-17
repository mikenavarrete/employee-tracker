const inquirer = require( 'inquirer' );
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ROOTroot',
    database: 'tracker'
});

function startApp(){
    inquirer
        .prompt([
            {
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        } 
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Add an employee':
                    addEmployee();
                    break;

                case 'Update an employee role':
                    updateEmployeeRole();
                    break;

                case 'Exit':
                    connection.end();
                    break;
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.error("Prompt couldn't be rendered in the current environment") 
            } else {
                console.error("Something else went wrong")
            }
        });
    }



    function viewDepartments(){
        const query = 'SELECT * FROM department';
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            startApp();
        });
    }


    function viewRoles(){
        const query = 'SELECT * FROM role';
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            startApp();
        });
    }


    function viewEmployees(){
        const query = 'SELECT * FROM employee';
        connection.query(query, (err, res) => {
            if (err) throw err;
            console.table(res);
            startApp();
        });
    }

    function addDepartment(){
        inquirer.prompt({
            name: 'name',
            type: 'input',
            message: 'Enter the name of the department:' 
        }).then((answer) => {
            const query = 'INSERT INTO department (name) VALUES (?)';
            connection.query(query, answer.name, (err, res) => {
                if (err) throw err;
                console.log(`${answer.name} department added!`);
                startApp();
            });
        })
    }

    function addRole() {
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the title of the role:'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the salary for this role:'
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'Enter the department ID for this role:'
            }
        ]).then((answers) => {
            const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
            connection.query(query, [answers.title, answers.salary, answers.department_id], (err, res) => {
                if (err) throw err;
                console.log(`${answers.title} role added!`);
                startApp();
            });
        });
    }

    function addEmployee() {
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter the first name of the employee:'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the last name of the employee:'
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'Enter the role ID for this employee:'
            },
            {
                name: 'manager_id',
                type: 'input',
                message: 'Enter the manager ID for this employee (optional):'
            }
        ]).then((answers) => {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
            connection.query(query, [answers.first_name, answers.last_name, answers.role_id, answers.manager_id], (err, res) => {
                if (err) throw err;
                console.log('Employee added successfully!');
                startApp();
            });
        });
    }

    function updateEmployeeRole() {
        const query = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee';
        connection.query(query, (err, employees) => {
            if (err) throw err;
    
            const employeeChoices = employees.map(employee => ({
                name: employee.name,
                value: employee.id
            }));
    
            inquirer.prompt([
                {
                    name: 'employeeId',
                    type: 'list',
                    message: 'Select an employee to update:',
                    choices: employeeChoices
                },
                {
                    name: 'roleId',
                    type: 'input',
                    message: 'Enter the new role ID for this employee:'
                }
            ]).then((answers) => {
                const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
                connection.query(query, [answers.roleId, answers.employeeId], (err, res) => {
                    if (err) throw err;
                    console.log('Employee role updated successfully!');
                    startApp();
                });
            });
        });
    }

    startApp();