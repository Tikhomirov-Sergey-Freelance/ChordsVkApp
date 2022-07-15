module.exports = {
    'up': `
    
        CREATE TABLE UserFavourites
        (
            id VARCHAR(100) PRIMARY KEY,
            trackId VARCHAR(100),
            FOREIGN KEY (trackId) REFERENCES Tracks (id)
        )
    
    `,
    'down': `
    
        DROP TABLE UserFavourites
    
    `
}