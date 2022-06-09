const mysql = require('mysql2');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const employeeNames = [];
const roleNames = [];

const PORT = process.env.PORT || 3001;

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'CARpet!@#456',
        database: 'employee_db'
    }
);

db.connect(() => {
    promptUser()
});

const promptUser = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    ])
    .then(userChoice => {
        switch (userChoice.options) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;       
        }
    })
};

const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        promptUser();
    })
};

const addEmployee = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Please enter a first name.',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'Enter a last name.',
            name: 'lastName'
        },
        {
            type: 'input',
            message: 'Input the ID of the role.',
            name: 'roleID'
        },
        {
            type: 'input',
            message: 'Enter the manager ID for the employee.',
            name: 'manID'
        }
    ])
    .then(res => {
        db.query('INSERT INTO employee SET ?'),
        {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.roleID,
            manager_id: res.manID
        },
        (err, res) => {
            console.log('Employee has been added!');
            promptUser();
        }
    })
};

const updateEmployeeRole = () => {
    db.query('SELECT CONCAT(employee.first_name, " ", employee.last_name) AS employeeName FROM employees;',
    function (err, results) {
        for (let i = 0; i < results.length; i++) {
            let name = res[i].employeeName;
            employeeNames.push(name);
        }
        inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which employee is being updated?',
                name: 'employeeSelection',
                choices: employeeNames
            }
        ])
        .then((res) => {
            let newEmp = res.employeeSelection;
            db.query('SELECT role_tbl.title AS roleTITLE from role_tbl',
            function(err, results) {
                for (let i = 0; i < results.length; i++) {
                let role = results[i].roleTitle;
                roleNames.push(role);   
            }
            inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What is the new role for this employee?',
                    name: 'roleSelection',
                    choices: roleNames
                }
            ])
            .then(res => {
                let newRole = res.roleSelection;
                db.query(`UPDATE employee SET ? WHERE CONCAT(employee.first_name, " ", employee.last_name) = '${newEmp}'; `,
                {
                    role_id: roleNames.indexOf(newRole) + 1                
                },
                (err, res) => {
                    console.log('Employee has had their role updated!');
                    promptUser();
                });
            })
            }
        )
        })
    }
    )
};

const viewAllRoles = () => {
    db.query('SELECT * FROM role_tbl', function (err, results) {
        console.table(results);
        promptUser();
    })
};

const addRole = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Please enter a role name',
            name: 'role'
        },
        {
            type: 'input',
            message: 'Enter a salary for this position (with two decimals).',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'Input the ID of the department.',
            name: 'departmentID'
        }
    ])
    .then(res => {
        db.query('INSERT INTO role_tbl SET ?'),
        {
            title: res.role,
            salary: res.salary,
            department_id: res.departmentID
        },
        (err, res) => {
            console.log('Role has been added!');
            promptUser();
        }
    })
};

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        promptUser();
    })
};

const addDepartment = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Please enter a department name',
            name: "department"
        }
    ])
    .then(res => {
        db.query('INSERT INTO department SET ?'),
        {
            d_name: res.department
        },
        (err, res) => {
            console.log('Department has been added!');
            promptUser();
        }
    })
};