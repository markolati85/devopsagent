const express = require('express');
const { v4: uuidv4 } = require('uuid');

// import bot strategies
const GridBot = require('./bots/gridBot');
const MomentumBot = require('./bots/momentumBot');
const BreakoutBot = require('./bots/breakoutBot');
const MeanReversionBot = require('./bots/meanReversionBot');
const devops = require('./services/devops');

const app = express();
app.use(express.json());

// in-memory store for running bots
const bots = {};

/**
 * Helper to create a new bot instance based on the strategy name.
 * @param {String} strategy
 */
function createStrategyInstance(strategy, options) {
  switch (strategy.toLowerCase()) {
    case 'grid':
      return new GridBot(options);
    case 'momentum':
      return new MomentumBot(options);
    case 'breakout':
      return new BreakoutBot(options);
    case 'meanreversion':
    case 'mean-reversion':
      return new MeanReversionBot(options);
    default:
      throw new Error(`Unknown strategy: ${strategy}`);
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

/**
 * Create a new trading bot.
 * Expected body: { exchange, strategy, symbol }
 */
app.post('/bots', async (req, res) => {
  const { exchange, strategy, symbol } = req.body;
  if (!exchange || !strategy || !symbol) {
    return res.status(400).json({ error: 'exchange, strategy and symbol are required' });
  }
  try {
    const id = uuidv4();
    const bot = createStrategyInstance(strategy, { exchange, symbol });
    bots[id] = { bot, exchange, strategy, symbol, createdAt: new Date(), active: true, id };
    bot.start();
    res.status(201).json({ id, message: `Bot ${id} created` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * List all bots.
 */
app.get('/bots', (req, res) => {
  const list = Object.values(bots).map(({ id, exchange, strategy, symbol, createdAt, active, bot }) => ({
    id,
    exchange,
    strategy,
    symbol,
    createdAt,
    active,
    metrics: bot.getMetrics()
  }));
  res.json(list);
});

/**
 * Stop a bot.
 */
app.post('/bots/:id/stop', (req, res) => {
  const { id } = req.params;
  const entry = bots[id];
  if (!entry) {
    return res.status(404).json({ error: 'bot not found' });
  }
  entry.active = false;
  entry.bot.stop();
  res.json({ id, message: 'Bot stopped' });
});

/**
 * DevOps: scale service
 * Body: { service, replicas }
 */
app.post('/devops/scale', async (req, res) => {
  const { service, replicas } = req.body;
  if (!service || typeof replicas !== 'number') {
    return res.status(400).json({ error: 'service and replicas are required' });
  }
  try {
    await devops.scaleService(service, replicas);
    res.json({ message: `Scaled ${service} to ${replicas} replicas` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * DevOps: deploy latest version
 */
app.post('/devops/deploy', async (req, res) => {
  try {
    await devops.deployLatest();
    res.json({ message: 'Deployment triggered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`DevOps AI Agent backend listening on port ${port}`);
});