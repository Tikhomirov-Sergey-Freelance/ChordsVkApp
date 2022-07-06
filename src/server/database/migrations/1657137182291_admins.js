module.exports = {
    'up': `
    
    CREATE TABLE Admins
    (
        vkId INT PRIMARY KEY,
        name VARCHAR(50)
    );
    
    `,
    'down': `
        DROP TABLE Admins;
    `
}