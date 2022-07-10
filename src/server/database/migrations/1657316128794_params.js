module.exports = {
    'up': `
    
        CREATE TABLE Params 
        (
            name VARCHAR(30) PRIMARY KEY,
            VALUE VARCHAR(30)
        )

    `,
    'down': `

        DROP TABLE Params
    
    `
}