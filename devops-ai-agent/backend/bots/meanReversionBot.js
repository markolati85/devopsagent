const BaseBot = require('./baseBot');

/**
 * MeanReversionBot simulates a strategy that oscillates around zero profit,
 * tending to revert to the mean after extreme movements.
 */
class MeanReversionBot extends BaseBot {
  updateMetrics() {
    // tendency to drift back towards zero
    const mean = -this.metrics.profit * 0.1;
    const noise = (Math.random() - 0.5) * 4; // random between -2 and 2
    const delta = mean + noise;
    this.metrics.profit += delta;
    this.metrics.trades += 1;
    this.metrics.pnlHistory.push({ timestamp: Date.now(), delta });
  }
}

module.exports = MeanReversionBot;