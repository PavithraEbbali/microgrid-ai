# Deployment Guide - AI Energy Forecast Platform

This guide covers various deployment options for the AI Energy Forecast Platform.

## Table of Contents
1. [Local Development](#local-development)
2. [Docker Development](#docker-development)
3. [Docker Production](#docker-production)
4. [Heroku Deployment](#heroku-deployment)
5. [AWS Deployment](#aws-deployment)
6. [Azure Deployment](#azure-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip and npm

### Quick Start

1. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   python ai_model/train_model.py
   uvicorn main:app --reload --port 8000
   ```

2. **Frontend Setup** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Access Application**
   - Frontend: http://localhost:5173
   - Backend: http://127.0.0.1:8000
   - API Docs: http://127.0.0.1:8000/docs

---

## Docker Development

### Prerequisites
- Docker and Docker Compose installed

### Setup

1. **Build and Start Services**
   ```bash
   docker-compose up --build
   ```

2. **Access Application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000
   - API Docs: http://localhost:8000/docs

3. **View Logs**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend
   ```

4. **Stop Services**
   ```bash
   docker-compose down
   ```

---

## Docker Production

### Build Production Images

```bash
# Backend
docker build -t ai-energy-backend:latest ./backend

# Frontend
docker build -t ai-energy-frontend:latest ./frontend
```

### Run Production Containers

```bash
# Backend
docker run -d \
  --name ai-energy-backend \
  -p 8000:8000 \
  ai-energy-backend:latest

# Frontend
docker run -d \
  --name ai-energy-frontend \
  -p 80:80 \
  ai-energy-frontend:latest
```

### Docker Registry (Push to Registry)

```bash
# Tag images
docker tag ai-energy-backend:latest your-registry/ai-energy-backend:latest
docker tag ai-energy-frontend:latest your-registry/ai-energy-frontend:latest

# Push to registry
docker push your-registry/ai-energy-backend:latest
docker push your-registry/ai-energy-frontend:latest
```

---

## Heroku Deployment

### Backend Deployment

1. **Install Heroku CLI**
   ```bash
   # https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Procfile** in backend directory
   ```
   web: uvicorn main:app --host=0.0.0.0 --port=${PORT:-8000}
   ```

3. **Create runtime.txt**
   ```
   python-3.11.3
   ```

4. **Deploy**
   ```bash
   cd backend
   heroku login
   heroku create your-app-name-backend
   git push heroku main
   ```

### Frontend Deployment

1. **Create Procfile**
   ```
   web: npm start
   ```

2. **Update package.json**
   ```json
   "scripts": {
     "start": "vite preview --port 3000",
     "dev": "vite",
     "build": "vite build"
   }
   ```

3. **Deploy**
   ```bash
   cd frontend
   heroku create your-app-name-frontend
   git push heroku main
   ```

---

## AWS Deployment

### Backend (EC2 or ECS)

**Option 1: EC2**
1. Launch EC2 instance (Ubuntu 20.04+)
2. Install Python and dependencies
3. Clone repository
4. Run backend with PM2 or systemd

**Option 2: ECS (Recommended)**
1. Push Docker image to ECR
2. Create ECS task definition
3. Launch ECS service
4. Configure load balancer

### Frontend (S3 + CloudFront)

1. **Build Frontend**
   ```bash
   npm run build
   ```

2. **Upload to S3**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name/
   ```

3. **Create CloudFront Distribution**
   - Point to S3 bucket
   - Configure HTTPS
   - Set default root object to index.html

---

## Azure Deployment

### Backend (App Service)

1. **Create App Service**
   ```bash
   az appservice plan create \
     --name myAppServicePlan \
     --resource-group myResourceGroup
   
   az webapp create \
     --resource-group myResourceGroup \
     --plan myAppServicePlan \
     --name ai-energy-api
   ```

2. **Deploy from GitHub**
   - Push code to GitHub
   - Enable GitHub Actions deployment
   - Configure Python 3.11 runtime

3. **Environment Variables**
   ```bash
   az webapp config appsettings set \
     --resource-group myResourceGroup \
     --name ai-energy-api \
     --settings FLASK_ENV=production
   ```

### Frontend (Static Web Apps)

1. **Create Static Web App**
   ```bash
   az staticwebapp create \
     --name ai-energy-frontend \
     --resource-group myResourceGroup
   ```

2. **Configure CI/CD**
   - Connect GitHub repository
   - Set build folder to `dist`
   - Set API location to `api`

---

## Environment Variables

### Backend (.env)
```
PYTHONUNBUFFERED=1
FLASK_ENV=production
DATABASE_URL=your_database_url
API_PORT=8000
```

### Frontend (.env)
```
VITE_API_BASE=https://your-api-domain.com
VITE_ENABLE_ANALYTICS=false
```

---

## Health Checks

### Backend Health Check
```bash
curl http://localhost:8000/health
```

### Expected Response
```json
{
  "status": "Backend Connected"
}
```

---

## Monitoring & Logging

### Docker Logs
```bash
docker logs -f container-name
```

### Application Logs
- Backend: See uvicorn output
- Frontend: Browser console (F12)

### Error Tracking
- Set up error monitoring service (Sentry, etc.)
- Configure alerts for critical errors

---

## Performance Optimization

### Backend
- Use production ASGI server (Gunicorn + Uvicorn)
- Enable gzip compression
- Cache ML model predictions
- Use database connection pooling

### Frontend
- Enable code splitting
- Lazy load components
- Optimize assets
- Enable service worker

### Example Production Backend Start
```bash
gunicorn main:app \
  --workers 4 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind 0.0.0.0:8000
```

---

## Scaling

### Horizontal Scaling
- Use load balancer
- Run multiple instances
- Use managed database

### Vertical Scaling
- Increase server resources
- Upgrade server tier
- Optimize database queries

---

## Backup & Recovery

### Database Backup
```bash
# Depends on your database
pg_dump database_name > backup.sql
```

### Model Backup
```bash
# Backup trained model
cp ai_model/energy_model.pkl ai_model/energy_model_backup.pkl
```

---

## SSL/TLS Configuration

### Using Let's Encrypt
```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d your-domain.com

# Enable auto-renewal
sudo systemctl enable certbot.timer
```

### Nginx Configuration
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # ... rest of config
}
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :8000
# Kill process
kill -9 <PID>
```

### CORS Issues
- Check frontend API URL
- Verify backend CORS settings
- Check browser console errors

### Docker Build Issues
```bash
# Clean build
docker-compose down --volumes
docker-compose build --no-cache
docker-compose up
```

### Model Loading Issues
```bash
# Retrain model
python ai_model/train_model.py

# Check model file
ls -la ai_model/energy_model.pkl
```

---

## Support

For deployment issues:
1. Check application logs
2. Review error messages carefully
3. Test endpoints with curl/Postman
4. Check environment variables
5. Verify network connectivity

---

**Happy Deploying!** ⚡
