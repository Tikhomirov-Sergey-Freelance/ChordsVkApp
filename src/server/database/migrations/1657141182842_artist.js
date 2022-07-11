module.exports = {
    'up': `
    
        CREATE TABLE Artist
        (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(100),
            description VARCHAR(2000),
            artistImage VARCHAR(300),
            searchName VARCHAR(100)
        );    

    `,
    'down': `
        DROP TABLE Artist;
    `
}