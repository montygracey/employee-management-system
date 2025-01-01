const db = require('../db/connection');

const viewAllRoles = () => {
    return db.query('SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id');
};

const addRole = (title, salary, department_id) => {
    return db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, department_id]);
};

module.exports = { viewAllRoles, addRole };