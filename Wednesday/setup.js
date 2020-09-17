const pool = require('./config/connection');

const studentsTableSql = `
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    class VARCHAR(50),
    school VARCHAR(50)
);
`;

pool.query(studentsTableSql, (err, data) => {
    if (err) {
        throw err;
    } else {
        console.log('Table "students" created succesfully');
        pool.end();
    }
});