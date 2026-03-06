const dayjs = require('dayjs');

const parseGitLog = (rawLog) => {
    if (!rawLog || rawLog.trim() === '') return [];

    // Split by our custom separator
    const rawCommits = rawLog.split('commit_separator|').filter(c => c.trim().length > 0);

    const commits = rawCommits.map(rawCommit => {
        // The first line contains author|date|message
        const lines = rawCommit.trim().split('\n');
        const headerLine = lines[0];

        const [author, dateStr, ...msgParts] = headerLine.split('|');
        const message = msgParts.join('|').toLowerCase(); // Rejoin in case message has '|'
        const date = dayjs(dateStr);

        // numstat lines follow the header
        let additions = 0;
        let deletions = 0;

        for (let i = 1; i < lines.length; i++) {
            const statLine = lines[i].trim();
            if (statLine) {
                const parts = statLine.split('\t');
                if (parts.length >= 2) {
                    const add = parseInt(parts[0], 10);
                    const del = parseInt(parts[1], 10);
                    if (!isNaN(add)) additions += add;
                    if (!isNaN(del)) deletions += del;
                }
            }
        }

        return {
            author: author ? author.trim() : 'Unknown',
            date,
            message,
            additions,
            deletions
        };
    });

    return commits;
};

module.exports = {
    parseGitLog
};
