const calculateBurnout = (metrics) => {
    const { nightRatio, weekendRatio, commitSpike, bugRate } = metrics;

    // Normalize commitSpike to a max of 1.0 to prevent it from blowing up the score completely
    const normalizedSpike = Math.min(commitSpike, 1.0);

    const burnoutScore =
        (0.4 * nightRatio) +
        (0.3 * weekendRatio) +
        (0.2 * normalizedSpike) +
        (0.1 * bugRate);

    // Format score to 2 decimal places
    const scoreFormatted = parseFloat(burnoutScore.toFixed(2));

    let burnoutStatus = 'Healthy';
    if (scoreFormatted >= 0.5) {
        burnoutStatus = 'Overloaded';
    } else if (scoreFormatted >= 0.25) {
        burnoutStatus = 'Medium';
    }

    return {
        burnoutScore: scoreFormatted,
        burnoutStatus
    };
};

module.exports = {
    calculateBurnout
};
