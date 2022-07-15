module.exports = {
    'up': `
    
        CREATE TABLE TrackError
        (
            id VARCHAR(100) PRIMARY KEY,
            userId VARCHAR(100),
            trackId VARCHAR(100),
            message VARCHAR(2000),
            FOREIGN KEY (trackId) REFERENCES Tracks (id)
        )

    `,
    'down': `
    
        DROP TABLE TrackError
    
    `
}