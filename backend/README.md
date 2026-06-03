# WeizVPN Backend

Node.js backend API for the WeizVPN application with Docker and Nginx support.

## Tech Stack

- **Runtime:** Node.js 20 (Alpine)
- **Framework:** Express.js
- **Reverse Proxy:** Nginx 1.25
- **Containerization:** Docker & Docker Compose

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── vpnController.js
│   ├── middleware/       # Express middleware
│   │   └── auth.js
│   ├── models/          # Data models (future DB integration)
│   ├── routes/          # API route definitions
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── vpn.js
│   ├── utils/           # Utility functions
│   └── index.js         # Application entry point
├── nginx/
│   └── nginx.conf       # Nginx configuration
├── docker/
│   └── Dockerfile.nginx # Nginx Dockerfile
├── Dockerfile           # Node.js Dockerfile
├── docker-compose.yml   # Docker Compose (root level)
├── package.json
└── .env.example
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - Logout

### VPN
- `GET /api/vpn/servers` - List VPN servers
- `GET /api/vpn/servers/:id` - Get server details
- `POST /api/vpn/connect` - Connect to VPN (auth required)
- `POST /api/vpn/disconnect` - Disconnect from VPN (auth required)
- `GET /api/vpn/status` - Get connection status (auth required)
- `GET /api/vpn/usage` - Get data usage (auth required)

### Users
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)
- `PUT /api/users/password` - Change password (auth required)
- `DELETE /api/users/account` - Delete account (auth required)

### Health
- `GET /api/health` - Health check

## Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Node.js 20+ (for local development)

### Run with Docker Compose

```bash
# From the project root (WeizVPN/)
docker-compose up --build
```

### Run Locally (Development)

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `production` |
| `JWT_SECRET` | JWT signing secret | (required) |
| `JWT_EXPIRES_IN` | Token expiration | `7d` |

## Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild a specific service
docker-compose build backend
docker-compose build nginx
```
