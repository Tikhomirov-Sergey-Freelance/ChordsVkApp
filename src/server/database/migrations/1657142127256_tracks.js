module.exports = {
    'up': `

        CREATE TABLE Tracks
        (
            id VARCHAR(100) PRIMARY KEY,
            num INT,
            name VARCHAR(300),
            artistId VARCHAR(100),
            riff VARCHAR(500) NULL,
            riffNote VARCHAR(500) NULL,
            strumming VARCHAR(500) NULL,
            strummingNote VARCHAR(500) NULL,
            intro VARCHAR(500) NULL,
            introNote VARCHAR(500) NULL,
            outro VARCHAR(500) NULL,
            outroNote VARCHAR(500) NULL,
            chordsText VARCHAR(10000),
            trackVideoSrc VARCHAR(300) NULL,
            addedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
            userId VARCHAR(100) NULL,
            searchNameStartArtist VARCHAR(500),
            searchNameEndArtist VARCHAR(500),
            FOREIGN KEY (artistId) REFERENCES Artists (id)
        )
    
    `,
    'down': `
        DROP TABLE Track
    `
}