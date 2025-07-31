# DevOps AI Agent

This repository contains the source code for a **DevOps AI Agent**, a research prototype that brings together trading automation, infrastructure management and real‑time monitoring under a single roof.  It is **not a production‑ready system**; instead it lays the groundwork for a larger project by providing a modular architecture with clearly defined extension points.

## Highlights

The project is organised as a monorepo with a **Node.js backend**, placeholder **trading strategies**, and a **Helm chart** for Kubernetes deployment.  A high‑level overview:

* **Trading bots**: simple strategy classes (grid, momentum, breakout, mean reversion) that illustrate how one might interact with exchange APIs.  They use dummy data so you can test the control flow without risking real funds.
* **DevOps automation**: helper functions for interacting with Kubernetes (deployments, scaling, etc.), configuration management, and monitoring.  These functions currently log actions rather than performing real API calls—fill them in with your tooling of choice (e.g. `@kubernetes/client-node`, `kubejs`).
* **Express API**: a RESTful interface exposed under `backend/index.js` that accepts commands such as creating a bot, listing bots, scaling services, or checking health status.  The API demonstrates how to wire up your business logic to HTTP endpoints.
* **Helm chart**: located in the `helm/` directory, with basic Kubernetes resources (Deployment, Service).  Use this as a starting point for deploying the backend onto a cluster.
* **GitHub Actions workflow**: defined in `.github/workflows/deploy.yml`, it shows how you might automatically deploy the latest code to a remote server via SSH after every push to `main`.  To enable it, you must add secrets (see below).

## Quick start

This section walks through running the backend locally with Docker.

```bash
# build the container
docker build -t devops-ai-agent-backend -f backend/Dockerfile ./backend

# run the server on port 3000
docker run -p 3000:3000 --env-file backend/.env.example devops-ai-agent-backend

# call the API to create a dummy trading bot
curl -X POST http://localhost:3000/bots -H 'Content-Type: application/json' -d '{"exchange":"binance","strategy":"grid","symbol":"BTC/USDT"}'
```

## Deployment

To deploy automatically to your own server, fill out the `.github/workflows/deploy.yml` file with your remote path and commands, then set the following secrets in your GitHub repository:

* `SSH_PRIVATE_KEY`: an SSH private key with access to your server.
* `SERVER_HOST`: your server's IP address or domain name.
* `SERVER_USER`: the username to SSH into the server.
* `SERVER_PORT`: optional, defaults to `22`.
* `PROJECT_DIR`: path on the server where the repository should live (e.g. `/var/www/devops-ai-agent`).

The included workflow uses the [`appleboy/ssh-action`](https://github.com/appleboy/ssh-action) to clone or pull the latest commit and restart the Docker container.  Adjust the commands to match your environment (e.g. using `docker compose` or systemd).

## WARNING

This project is a **toy example**.  Do not use it for real money trading or in production without significant modification.  You assume all risk for using the code provided here.  See the `/backend/README.md` for details on individual components.