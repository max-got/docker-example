# Docker Example

Ein simples Beispiel wie eine [SvelteKit](https://kit.svelte.dev/) App in einem Docker Container deployed werden kann.

## Docker Compose

```yaml
version: '3.9' # use docker-compose version 3.9
name: docker-example-wi # name of the docker-compose project

services: # define the services
  server: # define the server service
    build: # build the server service
      context: ./apps/server # build the server service in the ./apps/server directory
      dockerfile: Dockerfile # use the Dockerfile in the ./apps/server directory
    restart: always # restart the server service always
    container_name: prisma-express-api # name the container prisma-express-api
    ports: # open the ports
      - '3221:3221' # open the port 3221
    depends_on: # define the dependencies
      - db # the server service depends on the db service
    networks: # define the networks
      - app-network # the server service is in the app-network
  db: # define the db service
    image: postgres # use the offical postgres image
    container_name: postgres
    hostname: postgres # set the hostname to postgres
    ports:
      - '5432:5432'
    environment: # define the environment variables
      POSTGRES_USER: postgres # set the POSTGRES_USER to postgres
      POSTGRES_PASSWORD: postgres # set the POSTGRES_PASSWORD to postgres
      POSTGRES_DB: postgres # set the POSTGRES_DB to postgres
    restart: always
    networks:
      - app-network
    healthcheck: # define the healthcheck
      test: ['CMD', 'pg_isready', '-U', 'postgres'] # test if the postgres server is ready
      interval: 10s # check every 10 seconds
      timeout: 5s # timeout after 5 seconds
      retries: 5 # retry 5 times
      start_period: 5s # start after 5 seconds

  adminer:
    image: adminer
    container_name: adminer
    restart: always
    ports:
      - 8080:8080

  student:
    build:
      context: ./apps/student
      dockerfile: Dockerfile
    restart: always
    container_name: student-app
    ports:
      - '5050:5050'
    networks:
      - app-network
    depends_on:
      server:
        condition: service_healthy
        restart: true
      db:
        condition: service_healthy
        restart: true

  prof: # define the prof service
    build:
      context: ./apps/prof
      dockerfile: Dockerfile
    restart: always
    container_name: prof-app
    ports:
      - '5053:5053'
    networks:
      - app-network
    depends_on:
      server:
        condition: service_healthy
        restart: true
      db:
        condition: service_healthy
        restart: true

networks: # define the networks
  app-network: # define the app-network
    driver: bridge # use the bridge driver https://docs.docker.com/network/drivers/bridge/
```

## Dockerfile - Apps

```dockerfile
#Wir bauen unsere App in einem ersten Schritt in einem Node Image node:18-alpine mit dem alias builder
FROM node:18-alpine AS builder
#Wir setzen das Arbeitsverzeichnis auf `/apps/prof`
WORKDIR /apps/prof
#Wir kopieren die `package.json` und `package-lock.json` in das Arbeitsverzeichnis
COPY package*.json .
#Wir installieren die Dependencies
RUN npm ci
#Wir kopieren den Rest der App in das Arbeitsverzeichnis
COPY . .
#Wir bauen die App mit `npm run build` in diesem Fall mit der Adapter `node` SvelteKit Adapter
RUN npm run build
#Wir entfernen alle Dependencies die wir nicht für die Produktion brauchen
RUN npm prune --production

#Wir bauen ein neues Image mit dem Node Image `node:18-alpine`
FROM node:18-alpine
#Wir setzen das Arbeitsverzeichnis auf `/apps/prof`
WORKDIR /apps/prof
#Wir kopieren den `build` Ordner aus dem `builder` Image in das Arbeitsverzeichnis
COPY --from=builder /apps/prof/build build/
#Wir kopieren den `node_modules` Ordner aus dem `builder` Image in das Arbeitsverzeichnis
COPY --from=builder /apps/prof/node_modules node_modules/
#Wir kopieren die `package.json` in das Arbeitsverzeichnis
COPY package.json .
#Wir öffnen den Port 5053
EXPOSE 5053
# Wir setzen die Umgebungsvariablen
ENV NODE_ENV=production PORT=5053
#Wir starten die App
CMD [ "node", "build" ]
```

## Dockerfile - Server

```dockerfile
# Wir bauen unsere App in einem ersten Schritt in einem Node Image node:18-alpine mit dem alias builder
FROM node:18-alpine AS builder

# Wir setzen das Arbeitsverzeichnis auf `/server`
WORKDIR /server
# Wir kopieren die `package.json` und `package-lock.json` in das Arbeitsverzeichnis
COPY package*.json ./
# Wir kopierem den `prisma` Ordner in das Arbeitsverzeichnis (wird für die Generierung der Prisma Client Library benötigt -> ORM für die Datenbank)
COPY prisma ./prisma/
# Wir installieren die Dependencies
RUN npm install

# Wir kopieren den Rest der App in das Arbeitsverzeichnis
COPY . .
# Wir öffnen den Port 3221
EXPOSE 3221

# Wir starten die App mit `npm run start` (siehe package.json, füllt u.a. die Datenbank mit Daten)
CMD [ "npm", "run", "start" ]

# Healthcheck für den Server (prüft ob der Server läuft) -> wird von Docker verwendet um zu prüfen ob der Server läuft, siehe healthcheck.js
HEALTHCHECK --interval=5s --timeout=2s --retries=20 \
    CMD ["node", "healthcheck.js"]
```

 <font size="10">
 🎉🎉 Fertig! 🎉🎉
 </font>

<hr/>

## FAQ

### Warum werden die Dependencies in zwei Schritten installiert?

Wir installieren die Dependencies in zwei Schritten, da wir die Dependencies für die Produktion nicht brauchen. Wir installieren die Dependencies für die Produktion in einem eigenen Schritt, damit wir die Dependencies für die Entwicklung nicht mit in das Image packen müssen. Das spart Speicherplatz und Zeit beim Bauen des Images.

### Warum wird der Port 5050 geöffnet?

Wir öffnen den Port 5050, damit wir die App von außen erreichen können. Wenn wir die App in einem Container laufen lassen, dann ist die App nur im Container erreichbar. Wenn wir den Port 5050 öffnen, dann können wir die App von außen erreichen.

### Warum wird die Umgebungsvariable `NODE_ENV` auf `production` gesetzt?

Wir setzen die Umgebungsvariable `NODE_ENV` auf `production`, damit SvelteKit die App für die Produktion baut. Wenn wir die App für die Produktion bauen, dann werden die Sourcemaps nicht mit in das Bundle gepackt. Das spart Speicherplatz und Zeit beim Bauen der App.

### Warum wird die App mit `node build` gebaut?

Weil das nunmal so festgelegt ist. Siehe: `package.json` -> `scripts` -> `build`

## Wie starte ich den Server?

```bash
docker compose up
```

## Wie stoppe ich den Server?

```bash
docker compose down
```

## Wie starte ich den Server im Hintergrund?

```bash
docker compose up -d
```

## Wie erreiche ich die Apps?

### Student App

http://localhost:5050

### Prof App

http://localhost:5053

### Adminer

http://localhost:8080

## Wie erreiche ich den Server?

http://localhost:3221

## Wie lösche ich alle Images?

```bash
docker image rm ${IMAGE_ID}
```

## Wie lösche ich alle Container?

```bash
docker container rm ${CONTAINER_ID}
```

## Wie lösche ich alle Netzwerke?

```bash
docker network rm ${NETWORK_ID}
```
