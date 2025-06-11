FROM node:20.19.0-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
      openssl \
      ca-certificates \
      libssl-dev \
      libssl3 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]