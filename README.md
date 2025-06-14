# venti API (Summary)

**venti** is a demo express API Gateway (reverse-proxy) featuring:

- **JWT Authentication & RBAC:** Register/login endpoints, admin-only routes.
- **Proxying:** Forwards API requests to two mock microservices.
- **PostgreSQL + Prisma:** User data and roles stored in a database.
- **Dockerized:** One-command local setup for API, DB, microservices, and web UI.

**Run locally:**
```bash
docker compose up --build
```

- main API: `localhost:3000`
- microservices: `localhost:4000`, `localhost:4001`
- pgweb: `localhost:8081`

**Featured endpoints:**
- `POST /auth/register` — Register
- `POST /auth/login` — Log in (get JWT)
- `GET /secret-data` — Admin only
- `/api/service1/*` — Proxy to microservice 1
- `/api/service2/*` — Proxy to microservice 2 (admin-only)

---
Great for learning JWT, RBAC, gateway/proxy patterns, and Dockerized Node.js.