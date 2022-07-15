module.exports = {
    'up': `
    
        CREATE TABLE ArtistTag
        (
            id VARCHAR(100) PRIMARY KEY,
            artistId VARCHAR(100),
            tag VARCHAR(100),
            strict BOOL DEFAULT false,
            FOREIGN KEY (artistId)  REFERENCES Artists (id)
        );

    `,
    'down': `
        DROP TABLE ArtistTag
    `
}