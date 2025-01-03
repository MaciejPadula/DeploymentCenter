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
  - Read Deployment Metrics in MB and cpu minutes
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
- CronJobs
- Request Limits in Deployments
- Modyfing Env Variables in Deployments
- Modyfing IP Addresses and Ports in LBs
- More complex and versatile AI solution

## System Architecture
TODO

## How to deploy this solution to your server?

You can use docker-compose, for example:
```YAML
services:
  frontend:
    ports:
      - "80:8080"
    image: "dulik65/deployment-center-frontend:202501021714"
  api:
    ports:
      - "8080:8080"
    image: "dulik65/deployment-center-api:202501021714"
    environment:
    # optional
      OpenAI__Key: "..."
      OpenAI__Model: "gpt-4o"
```
`docker compose up` will start two containers, one with frontend app and second with API.

API application should be placed in the same subnet with cluster that you would like to connect to.

## Setup connection process
1. When you enter application first time, you will be informed about lack of cluster configuration.

![image](https://github.com/user-attachments/assets/55d32743-4543-4fde-8156-6b703fe0052f)

2. To add cluster you have to click selector in the top right corner and 'Edit Clusters'.

![image](https://github.com/user-attachments/assets/d421889c-976a-46f2-872a-11137ee2d7c9)

3. You will be redirected to your clusters list. From there you can add new cluster. You have to provide cluster name, API applicatin url and your .kube file content.

![image](https://github.com/user-attachments/assets/a439b197-5f0f-4360-ad3c-e25848867625)

4. After these steps, you'll be able to explore your cluster 😸.

![image](https://github.com/user-attachments/assets/8a31c80e-bc40-4ba7-a079-0b91e40ef05b)



