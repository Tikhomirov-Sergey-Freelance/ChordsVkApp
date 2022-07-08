module.exports = {
    'up': `

        CREATE TABLE Chords
        (
            instrument VARCHAR(7),
            note VARCHAR(5),
            name VARCHAR(10),
            startFret INT,
            barre BOOL,
            guitarStrings VARCHAR(2000),
            searchName VARCHAR(30),
            PRIMARY KEY(instrument, name)
        );
    
    `,
    'down': `
        DROP TABLE Chords;
    `
}