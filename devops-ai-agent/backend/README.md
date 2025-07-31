# Backend

The backend is implemented in **Node.js** using **Express**.  It provides a REST API for
controlling trading bots and performing DevOps operations.

## Structure

* `index.js` – entry point that initialises the Express application, defines routes, and starts the server.
* `bots/` – contains classes for each trading strategy: Grid, Momentum, Breakout and Mean Reversion.  They extend a common `BaseBot` class which handles the timing loop and metric tracking.
* `services/devops.js` – placeholder functions for scaling services and deploying the latest version.  Extend these to interact with Kubernetes or your CI/CD pipeline.

## Running locally

Install dependencies and start the server:

```bash
cd backend
npm install
npm start
```

The server will listen on port `3000` by default.  You can override it via a `PORT` environment variable.

## API overview

### Health check

```
GET /health
```

Returns `{ "status": "ok", "uptime": <seconds> }`.

### Create a bot

```
POST /bots
Content-Type: application/json
{
  "exchange": "binance",
  "strategy": "grid",
  "symbol": "BTC/USDT"
}
```

Creates a new bot instance using the specified strategy.  Supported strategies: `grid`, `momentum`, `breakout`, `mean-reversion`.

### List bots

```
GET /bots
```

Returns a list of all running bots along with their metrics.

### Stop a bot

```
POST /bots/:id/stop
```

Stops the bot with the given `id`.

### Scale a service

```
POST /devops/scale
Content-Type: application/json
{
  "service": "dashboard",
  "replicas": 3
}
```

Calls the `scaleService` function in `services/devops.js`.  Replace the stub with actual scaling logic.

### Deploy latest version

```
POST /devops/deploy
```

Triggers the `deployLatest` function in `services/devops.js`.  Use this to wire in your CI/CD pipeline.

## Docker

Use the provided `Dockerfile` to build a container:

```bash
docker build -t devops-ai-agent-backend .
docker run -p 3000:3000 devops-ai-agent-backend
```

You can provide environment variables via an `.env` file or the CLI to override defaults.