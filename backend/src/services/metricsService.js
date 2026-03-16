const dayjs = require('dayjs');

// Bug-related keywords (inlined – no external utils dependency)
const BUG_KEYWORDS = ['fix', 'bug', 'patch', 'hotfix', 'issue', 'error', 'crash', 'fault', 'defect', 'resolve'];

// Refactor-related keywords
const REFACTOR_KEYWORDS = ['refactor', 'cleanup', 'clean up', 'restructure', 'reorganize', 'rewrite', 'optimize', 'improve'];

//Checks if a string contains any of the keywords.
const containsKeyword = (text, keywords) => {
    return keywords.some(kw => text.includes(kw));
};

const calculateMetrics = (commits, developerName = null) => {
    // --- NEW: If a specific developer was requested, keep only their commits ---
    if (developerName) {
        commits = commits.filter(
            c => c.author.toLowerCase() === developerName.toLowerCase()
        );

        // No commits found for the requested developer → signal to controller
        if (commits.length === 0) {
            return null;
        }
    }

    const totalCommits = commits.length;

    if (totalCommits === 0) {
        return {
            developerName: 'Unknown',
            totalCommits: 0,
            nightRatio: 0,
            weekendRatio: 0,
            bugRate: 0,
            refactorRate: 0,
            commitSpike: 0
        };
    }

    // When developerName was supplied the list is already filtered,
    // so the "most frequent author" logic still works correctly (it will
    // resolve to that single developer). When not supplied, original
    // behaviour is preserved — pick the most prolific author.
    const authorCounts = {};
    commits.forEach(c => {
        authorCounts[c.author] = (authorCounts[c.author] || 0) + 1;
    });
    const mainDeveloperName = Object.keys(authorCounts).reduce((a, b) => authorCounts[a] > authorCounts[b] ? a : b);

    let nightCommits = 0;
    let weekendCommits = 0;
    let bugCommits = 0;
    let refactorCommits = 0;

    // To calculate spike
    const commitsPerDay = {};

    commits.forEach(commit => {
        const hour = commit.date.hour();
        const dayOfWeek = commit.date.day(); // 0 is Sunday, 6 is Saturday
        const dateKey = commit.date.format('YYYY-MM-DD');

        // Night is 10 PM to 5 AM (inclusive 22, 23, 0, 1, 2, 3, 4)
        if (hour >= 22 || hour < 5) {
            nightCommits++;
        }

        // Weekend is Saturday (6) or Sunday (0)
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            weekendCommits++;
        }

        if (containsKeyword(commit.message, BUG_KEYWORDS)) {
            bugCommits++;
        }

        if (containsKeyword(commit.message, REFACTOR_KEYWORDS)) {
            refactorCommits++;
        }

        commitsPerDay[dateKey] = (commitsPerDay[dateKey] || 0) + 1;
    });

    const activeDaysCount = Object.keys(commitsPerDay).length;
    const maxCommitsInOneDay = Math.max(...Object.values(commitsPerDay));
    const averageCommitsPerDay = totalCommits / activeDaysCount;

    // Define commitSpike as ratio of max day to average. Limit lower bound to 0
    let commitSpike = activeDaysCount > 1 ? maxCommitsInOneDay / averageCommitsPerDay : 0;
    // Normalize it slightly so it stays mostly around 0-1 for formula stability, though it can exceed 1
    // A spike of 3x the average is huge. Let's cap it reasonably or normalize it.
    // Assuming standard spike ranges from 1 to 5. We'll leave it as actual mathematical ratio but subtract 1 
    // so 0 means no spike (max == avg), and 2 means max is 3x avg.
    commitSpike = Math.max(0, commitSpike - 1);

    return {
        developerName: mainDeveloperName,
        totalCommits,
        nightRatio: nightCommits / totalCommits,
        weekendRatio: weekendCommits / totalCommits,
        bugRate: bugCommits / totalCommits,
        refactorRate: refactorCommits / totalCommits,
        commitSpike
    };
};

module.exports = {
    calculateMetrics
};

