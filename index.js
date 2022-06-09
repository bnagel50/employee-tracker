const express = require('express');
const mysql = require('mysql2');
const console = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'CARpet!@#456',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database.')
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

};

const addEmployee = () => {

};

const updateEmployeeRole = () => {

};

const viewAllRoles = () => {

};

const addRole = () => {

};

const viewAllDepartments = () => {

};

const addDepartment = () => {

};