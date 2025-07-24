# Build stage
FROM node:18 AS build
WORKDIR /app
COPY buddy-tales_-ai-dialogue-studio/package*.json ./buddy-tales_-ai-dialogue-studio/
RUN cd buddy-tales_-ai-dialogue-studio && npm ci
COPY buddy-tales_-ai-dialogue-studio ./buddy-tales_-ai-dialogue-studio
RUN cd buddy-tales_-ai-dialogue-studio && npm run build

# Runtime stage
FROM node:18-slim
WORKDIR /app
COPY --from=build /app/buddy-tales_-ai-dialogue-studio /app
EXPOSE 8080
ENV NODE_ENV=production
CMD ["npm", "start"]
