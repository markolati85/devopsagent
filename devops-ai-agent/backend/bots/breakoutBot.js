const BaseBot = require('./baseBot');

/**
 * BreakoutBot simulates a strategy that has small changes most of the time
 * but occasionally experiences a large breakout.
 */
class BreakoutBot extends BaseBot {
  updateMetrics() {
    let delta;
    if (Math.random() < 0.1) {
      // breakout event: big move between -20 and +20
      delta = (Math.random() - 0.5) * 40;
    } else {
      // small noise between -2 and +2
      delta = (Math.random() - 0.5) * 4;
    }
    this.metrics.profit += delta;
    this.metrics.trades += 1;
    this.metrics.pnlHistory.push({ timestamp: Date.now(), delta });
  }
}

module.exports = BreakoutBot;