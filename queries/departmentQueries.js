const db = require('../db/connection');

const viewAllDepartments = () => {
    return db.query('SELECT * FROM department');
};

const addDepartment = (name) => {
    return db.query('INSERT INTO department (name) VALUES ($1)', [name]);
};

module.exports = { viewAllDepartments, addDepartment };