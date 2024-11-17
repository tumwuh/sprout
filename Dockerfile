# Stage 1: Build the application
FROM oven/bun:1 AS builder

# Set the working directory
WORKDIR /app


# Set build arguments
ARG BASE_API_URL
ARG SESSION_PASSWORD

# Print build arguments for debugging
RUN echo "BASE_API_URL=${BASE_API_URL}" && echo "SESSION_PASSWORD=${SESSION_PASSWORD}"


# Copy the package.json and bun.lockb files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the application
RUN bun run build

# Stage 2: Create the production image
FROM oven/bun:1

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.output /app/.output
COPY --from=builder /app/package.json /app/bun.lockb /app/

# Install only production dependencies
RUN bun install

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV BASE_API_URL=$BASE_API_URL
ENV SESSION_PASSWORD=$SESSION_PASSWORD

# Print environment variables for debugging
RUN echo "BASE_API_URL=${BASE_API_URL}" && echo "SESSION_PASSWORD=${SESSION_PASSWORD}"

# Use a non-root user
USER bun

# Start the application
CMD ["bun", ".output/server/index.mjs"]