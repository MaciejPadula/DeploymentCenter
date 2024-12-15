# DeploymentCenter

## Description
This Application provides GUI for kubernetes cluster management. You can add multiple connections and switch between them.
Available Functions:
- Deployments
  - Create
  - List
  - Read Basic Info
  - Read Pods with their status and logs
  - Read Deployment Containers and Env Variables
  - Read Volumes
  - Scale Pods Count
  - Delete
- Load Balancers
  - Create
  - List
  - Read
  - Delete
- Volumes
  - Create
  - List

In future:
- complex AI

## System Architecture

## How to deploy it to your server?

You can use docker-compose for example:
```YAML
services:
  frontend:
    ports:
      - "80:8080"
    image: "dulik65/deployment-center-frontend:202412142244"
  api:
    ports:
      - "8080:8080"
    image: "dulik65/deployment-center-api:202412142244"
    environment:
    # optional
      OpenAI__Key: "..."
      OpenAI__Model: "gpt-4o"
```
`docker compose up` will start two containers, one with frontend app and second with API.

API application should be placed in the same subnet with cluster that you would like to connect to.