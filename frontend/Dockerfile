FROM node:20-alpine AS builder
WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build
FROM node:20-alpine
WORKDIR /frontend
RUN npm install -g serve
COPY --from=builder /frontend/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]