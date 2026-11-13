# Suyogya Yoga Centre: Full-Stack Web App, Containerized and Deployed on AWS

A website for a yoga studio in Lucknow, built with a Flask backend, a database and user authentication. The project is also my hands-on practice for cloud and DevOps: containers, AWS networking, infrastructure as code, Kubernetes and monitoring.

> **Status:** work in progress. The checklist below shows what is finished and what is planned.

## Features
- Enquiry form that saves submissions to a database
- Signup and login with hashed passwords and session-based authentication
- Logout, and a navbar that changes based on login status

## Tech Stack
| Area | Tools |
| Backend | Python, Flask, SQLAlchemy, Gunicorn |
| Database | SQLite (planned: PostgreSQL on AWS RDS) |
| Frontend | HTML, CSS, JavaScript, Jinja2 templates |
| Containers | Docker |
| Cloud | AWS (EC2, VPC, security groups; more planned below) |
| Planned | Terraform, GitHub Actions, Kubernetes, Prometheus, Grafana |

## Run Locally with Docker
bash
docker build -t yoga-website .
docker run -p 5000:5000 -e SECRET_KEY=your-secret-key yoga-website
Then open http://localhost:5000

## Project Structure

backend/
├── app.py
├── Dockerfile
├── requirement.txt
├── templates/
│   └── index.html
└── static/
    ├── css/
    ├── js/
    └── assets/


## Roadmap

### Phase 1: Application and container
- [x] Flask backend with enquiry, signup, login and logout
- [x] SQLite database with SQLAlchemy
- [x] Dockerfile, built and tested locally
- [x] Code version-controlled on GitHub
- [ ] Production hardening: debug off, secret key from environment variable, Gunicorn

### Phase 2: First AWS deployment
- [ ] Launch an EC2 instance (Ubuntu) with an SSH key pair
- [ ] Security group: SSH from my IP only, HTTP from anywhere
- [ ] Install Docker on EC2, pull the code, build and run the container
- [ ] Reach the site through the public IP

### Phase 3: Proper AWS networking
- [ ] Custom VPC with public and private subnets across two Availability Zones
- [ ] Internet Gateway, route tables, and a NAT Gateway for private subnets
- [ ] Application Load Balancer in the public subnets
- [ ] Security group chaining (ALB to app to database)
- [ ] Domain name with Route 53 and HTTPS with ACM

### Phase 4: Managed services and security
- [ ] Image stored in Amazon ECR
- [ ] Database moved to RDS (PostgreSQL) in a private subnet
- [ ] Secrets in AWS Secrets Manager or SSM Parameter Store
- [ ] IAM role for the instance (no access keys on the server)
- [ ] Logs and alarms in CloudWatch

### Phase 5: Automation
- [ ] Infrastructure as code with Terraform
- [ ] CI/CD with GitHub Actions: build, push to ECR, deploy

### Phase 6: Kubernetes and observability
- [ ] Run on Kubernetes (Minikube) with Deployment and Service manifests
- [ ] Prometheus for metrics, scraping a `/metrics` endpoint in the Flask app
- [ ] Grafana dashboards for request rate, latency and resource usage

## What I Am Learning From This
- Why the Flask development server is not used in production, and what WSGI servers like Gunicorn do
- How a request travels through AWS: DNS, Internet Gateway, route table, subnet, security group, instance
- Why debug mode must be off and secrets must stay out of Git
- How containers behave differently from a laptop (for example, binding to `0.0.0.0`)

## Author
Tanya Verma, final-year B.Tech (CS: AI and ML), aspiring Cloud and DevOps engineer.
GitHub: https://github.com/Tanyav10
