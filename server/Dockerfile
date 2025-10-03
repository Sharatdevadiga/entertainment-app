# Use Node.js 18 (Alpine)
FROM node:18-alpine

# Set working directory in container
WORKDIR /app

# Install certs first (critical for HTTPS fetch)
RUN apk add --no-cache ca-certificates && update-ca-certificates

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Optional: Add curl for debugging network issues
RUN apk add --no-cache curl

# Force IPv4 resolution (sometimes prevents TLS handshake failures)
ENV NODE_OPTIONS=--dns-result-order=ipv4first

# Expose the app port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
