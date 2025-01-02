const inquirer = require('inquirer'); 
const { viewAllDepartments, addDepartment } = require('./queries/departmentQueries');
const { viewAllRoles, addRole } = require('./queries/roleQueries');
const { viewAllEmployees, addEmployee, updateEmployeeRole } = require('./queries/employeeQueries');
const cTable = require('console.table'); 

const mainMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
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
    ]).then(answer => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments().then(res => {
                    console.table(res.rows);
                    mainMenu();
                });
                break;
            case 'View all roles':
                viewAllRoles().then(res => {
                    console.table(res.rows);
                    mainMenu();
                });
                break;
            case 'View all employees':
                viewAllEmployees().then(res => {
                    console.table(res.rows);
                    mainMenu();
                });
                break;
            case 'Add a department':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter the name of the department:'
                    }
                ]).then(answer => {
                    addDepartment(answer.name).then(() => {
                        console.log('Department added successfully!');
                        mainMenu();
                    });
                });
                break;
            case 'Add a role':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Enter the title of the role:'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter the salary for the role:'
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'Enter the department ID for the role:'
                    }
                ]).then(answer => {
                    addRole(answer.title, answer.salary, answer.department_id).then(() => {
                        console.log('Role added successfully!');
                        mainMenu();
                    });
                });
                break;
                case 'Add an employee':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'Enter the first name of the employee:'
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'Enter the last name of the employee:'
                        },
                        {
                            type: 'input',
                            name: 'role_id',
                            message: 'Enter the role ID for the employee:',
                            validate: (input) => {
                                const roleIdInt = parseInt(input, 10);
                                if (isNaN(roleIdInt)) {
                                    return 'Please enter a valid integer for the role ID.';
                                }
                                return true;
                            }
                        },
                        {
                            type: 'input',
                            name: 'manager_id',
                            message: 'Enter the manager ID for the employee (optional):',
                            default: null,
                            validate: (input) => {
                                if (input === null || input === '') {
                                    return true; // Allow empty input for manager_id
                                }
                                const managerIdInt = parseInt(input, 10);
                                if (isNaN(managerIdInt)) {
                                    return 'Please enter a valid integer for the manager ID.';
                                }
                                return true;
                            }
                        }
                    ]).then(answer => {
                        const { first_name, last_name, role_id, manager_id } = answer;
                        addEmployee(first_name, last_name, role_id, manager_id).then(() => {
                            console.log('Employee added successfully!');
                            mainMenu();
                        }).catch(err => {
                            console.error('Error adding employee:', err.message);
                            mainMenu();
                        });
                    });
                    break;
                    case 'Update an employee role':
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'employee_id',
                                message: 'Enter the ID of the employee you want to update:',
                                validate: (input) => {
                                    const employeeIdInt = parseInt(input, 10);
                                    if (isNaN(employeeIdInt)) {
                                        return 'Please enter a valid integer for the employee ID.';
                                    }
                                    return true;
                                }
                            },
                            {
                                type: 'input',
                                name: 'role_id',
                                message: 'Enter the new role ID for the employee:',
                                validate: (input) => {
                                    const roleIdInt = parseInt(input, 10);
                                    if (isNaN(roleIdInt)) {
                                        return 'Please enter a valid integer for the role ID.';
                                    }
                                    return true;
                                }
                            }
                        ]).then(answer => {
                            const { employee_id, role_id } = answer;
                            updateEmployeeRole(employee_id, role_id)
                                .then(() => {
                                    console.log('Employee role updated successfully!');
                                    mainMenu();
                                })
                                .catch(err => {
                                    console.error('Error updating employee role:', err.message);
                                    mainMenu();
                                });
                        });
                        break;
            case 'Exit':
                process.exit();
        }
    });
};

mainMenu();