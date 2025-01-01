const db = require('./db/connection');

const viewAllDepartments = () => {
    return db.query('SELECT * FROM department');
};

const viewAllRoles = () => {
    return db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id');
};

const viewAllEmployees = () => {
    return db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, \' \', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id');
};

const addDepartment = (name) => {
    return db.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

const addRole = (title, salary, department_id) => {
    return db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
    return db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
};

const updateEmployeeRole = (employee_id, role_id) => {
    return db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};