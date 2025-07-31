const BaseBot = require('./baseBot');

/**
 * GridBot simulates a grid trading strategy where it places buy and sell
 * orders at fixed intervals.  The profit oscillates within a band.
 */
class GridBot extends BaseBot {
  updateMetrics() {
    // grid strategy: small positive or negative delta within ±1
    const delta = (Math.random() - 0.5) * 2;
    this.metrics.profit += delta;
    this.metrics.trades += 1;
    this.metrics.pnlHistory.push({ timestamp: Date.now(), delta });
  }
}

module.exports = GridBot;