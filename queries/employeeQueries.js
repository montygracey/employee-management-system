const db = require('../db/connection');

const viewAllEmployees = () => {
    return db.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id 
        LEFT JOIN department ON role.department_id = department.id 
        LEFT JOIN employee manager ON employee.manager_id = manager.id
    `);
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
    
    const managerIdInt = manager_id ? parseInt(manager_id, 10) : null;

    
    if (manager_id && isNaN(managerIdInt)) {
        throw new Error('Invalid manager ID. Please provide a valid integer.');
    }

    return db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
        [first_name, last_name, role_id, managerIdInt]
    );
};
const updateEmployeeRole = (employee_id, role_id) => {
    
    const employeeIdInt = parseInt(employee_id, 10);
    const roleIdInt = parseInt(role_id, 10);

    
    if (isNaN(employeeIdInt) || isNaN(roleIdInt)) {
        throw new Error('Invalid employee ID or role ID. Please provide valid integers.');
    }

    return db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleIdInt, employeeIdInt]);
};


module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole };