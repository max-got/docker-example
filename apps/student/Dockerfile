FROM node:18-alpine AS builder
WORKDIR /apps/student
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:18-alpine
WORKDIR /apps/student
COPY --from=builder /apps/student/build build/
COPY --from=builder /apps/student/node_modules node_modules/
COPY package.json .
EXPOSE 5050
ENV NODE_ENV=production PORT=5050
CMD [ "node", "build" ]