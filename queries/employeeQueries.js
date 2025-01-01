const db = require('../db/connection');

const viewAllEmployees = () => {
    return db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`);
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
    // Convert manager_id to an integer (or null if empty)
    const managerIdInt = manager_id ? parseInt(manager_id, 10) : null;

    // Validate that manager_id is a valid integer (if provided)
    if (manager_id && isNaN(managerIdInt)) {
        throw new Error('Invalid manager ID. Please provide a valid integer.');
    }

    return db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [first_name, last_name, role_id, managerIdInt]
    );
};
const updateEmployeeRole = (employee_id, role_id) => {
    return db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
};

module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole };