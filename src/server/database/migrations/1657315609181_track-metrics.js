module.exports = {
    'up': `
    
        CREATE TABLE TrackMetrics
        (
            id VARCHAR(100) PRIMARY KEY,
            views INT DEFAULT 0,
            inFavorites INT DEFAULT 0,
            FOREIGN KEY (id) REFERENCES Track (id)
        )

    `,
    'down': `
    
        DROP TABLE TrackMetrics
    
    `
}