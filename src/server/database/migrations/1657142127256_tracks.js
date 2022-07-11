module.exports = {
    'up': `

        CREATE TABLE Track
        (
            id VARCHAR(100) PRIMARY KEY,
            num INT,
            name VARCHAR(100),
            artistId VARCHAR(100),
            riff VARCHAR(300) NULL,
            riffNote VARCHAR(300) NULL,
            strumming VARCHAR(300) NULL,
            strummingNote VARCHAR(300) NULL,
            intro VARCHAR(300) NULL,
            introNote VARCHAR(300) NULL,
            outro VARCHAR(300) NULL,
            outroNote VARCHAR(300) NULL,
            chordsText VARCHAR(10000),
            trackVideoSrc VARCHAR(100) NULL,
            addedDate DATE NULL,
            userId VARCHAR(100) NULL,
            FOREIGN KEY (artistId) REFERENCES Artist (id)
        )
    
    `,
    'down': `
        DROP TABLE Track
    `
}