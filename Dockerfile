FROM node:20-slim

# Install Chrome dependencies and Chromium
RUN apt-get update \
    && apt-get install -y chromium \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install && npm ci
COPY . .

CMD ["npm", "test"]