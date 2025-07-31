/**
 * BaseBot
 *
 * This abstract class defines the common behaviour for all trading bots.  A bot
 * updates its internal metrics at a regular interval and exposes methods to
 * start and stop the process.  Subclasses can override the `updateMetrics`
 * method to implement their own logic.
 */
class BaseBot {
  constructor({ exchange, symbol }) {
    this.exchange = exchange;
    this.symbol = symbol;
    this.active = false;
    this.metrics = {
      profit: 0,
      trades: 0,
      pnlHistory: []
    };
    this.interval = null;
  }

  /**
   * Start the bot.  Sets up a recurring timer to update metrics every
   * `INTERVAL_MS` milliseconds.
   */
  start() {
    if (this.active) return;
    this.active = true;
    const INTERVAL_MS = 2000;
    this.interval = setInterval(() => {
      if (!this.active) return;
      this.updateMetrics();
    }, INTERVAL_MS);
  }

  /**
   * Stop the bot and clear the update timer.
   */
  stop() {
    this.active = false;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  /**
   * Update the internal metrics.  Subclasses should override this to
   * implement strategy‑specific behaviour.
   */
  updateMetrics() {
    // Default implementation: random walk profit/loss
    const delta = (Math.random() - 0.5) * 10; // random change between -5 and 5
    this.metrics.profit += delta;
    this.metrics.trades += 1;
    this.metrics.pnlHistory.push({ timestamp: Date.now(), delta });
  }

  /**
   * Return a snapshot of current metrics.
   */
  getMetrics() {
    return { ...this.metrics };
  }
}

module.exports = BaseBot;