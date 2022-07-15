module.exports = {
    'up': `
    
        CREATE TABLE TrackCandidate
        (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(100),
            artist VARCHAR(100),
            state VARCHAR(20),
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
            userId VARCHAR(100) NULL,
            trackId VARCHAR(100) NULL
        )
    
    `,
    'down': `
        DROP TABLE TrackCandidates
            
    `
}