# Base image
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache g++ make py3-pip libc6-compat
COPY package*.json ./
EXPOSE 3000

# Install dependencies
FROM base AS deps
RUN npm ci --legacy-peer-deps

# Build app
FROM deps AS builder
COPY . .
RUN npm run build

# Production image
FROM node:22-alpine AS production
WORKDIR /app

ENV NODE_ENV=production

# Copy 
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules

# Add and use non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001
USER nextjs

CMD ["npm", "start"]

# Optional: development image
FROM deps AS dev
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "dev"]
