const BaseBot = require('./baseBot');

/**
 * MomentumBot simulates a strategy that rides the trend.  It tends to move
 * consistently in the same direction for a while before switching.
 */
class MomentumBot extends BaseBot {
  constructor(opts) {
    super(opts);
    this.trend = Math.random() > 0.5 ? 1 : -1;
    this.stepsRemaining = Math.floor(Math.random() * 10) + 5;
  }
  updateMetrics() {
    // if trend has run out, choose a new trend
    if (this.stepsRemaining <= 0) {
      this.trend = Math.random() > 0.5 ? 1 : -1;
      this.stepsRemaining = Math.floor(Math.random() * 10) + 5;
    }
    const delta = this.trend * (Math.random() * 3 + 1); // trending move between 1 and 4
    this.metrics.profit += delta;
    this.metrics.trades += 1;
    this.metrics.pnlHistory.push({ timestamp: Date.now(), delta });
    this.stepsRemaining -= 1;
  }
}

module.exports = MomentumBot;