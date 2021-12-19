FROM node:16.13.1-alpine3.13 AS node
RUN mkdir /app && chown -R node:node /app

FROM node as deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build

FROM node as release
WORKDIR /app
COPY --from=builder /app/.env ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules
RUN npx next telemetry disable
USER node
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node_modules/next/dist/bin/next", "start"]
