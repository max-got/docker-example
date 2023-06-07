FROM node:18-alpine AS builder

# Create app directory
WORKDIR /server
COPY package*.json ./
COPY prisma ./prisma/ 
RUN npm install

COPY . .
EXPOSE 3221



CMD [ "npm", "run", "start" ]

HEALTHCHECK --interval=5s --timeout=2s --retries=20 \  
    CMD ["node", "healthcheck.js"]