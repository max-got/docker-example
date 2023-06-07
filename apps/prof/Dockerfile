FROM node:18-alpine AS builder
WORKDIR /apps/prof
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine
WORKDIR /apps/prof
COPY --from=builder /apps/prof/build build/
COPY --from=builder /apps/prof/node_modules node_modules/
COPY package.json .
EXPOSE 5053
ENV NODE_ENV=production PORT=5053
CMD [ "node", "build" ]