module.exports = {
    'up': `
    
        CREATE TABLE TrackMetrics
        (
            id VARCHAR(100) PRIMARY KEY,
            views INT DEFAULT 0,
            inFavorites INT DEFAULT 0,
            FOREIGN KEY (id) REFERENCES Tracks (id)
        )

    `,
    'down': `
    
        DROP TABLE TrackMetrics
    
    `
}