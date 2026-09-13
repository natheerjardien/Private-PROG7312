# Builds the React Dashboard (Docker, 2026e)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Executes the Vite build script defined in the scaffolding (Docker, 2026e)
RUN npm run build 

# Serves with Nginx (Docker, 2026f)
FROM nginx:alpine
# Copies the Vite output folder 'dist' to Nginx (Docker, 2026f)
COPY --from=build /app/dist /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Reference list:
# Docker, 2026e. Multi-stage builds. [online] Available at: <https://docs.docker.com/build/building/multi-stage/> [Accessed 9 September 2026].
# Docker, 2026f. Nginx official image documentation. [online] Available at: <https://hub.docker.com/_/nginx> [Accessed 9 September 2026].