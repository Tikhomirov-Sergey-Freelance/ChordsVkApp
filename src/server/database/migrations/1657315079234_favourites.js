module.exports = {
    'up': `
    
        CREATE TABLE UserFavourites
        (
            id VARCHAR(100),
            trackId VARCHAR(100),
            PRIMARY KEY (id, trackId),
            FOREIGN KEY (trackId) REFERENCES Tracks (id)
        )
    
    `,
    'down': `
    
        DROP TABLE UserFavourites
    
    `
}