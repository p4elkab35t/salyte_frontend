# Use the official Bun image
FROM oven/bun:canary-alpine

# Set the working directory
WORKDIR /app/frontend

# Copy package files first (better for caching layers)
COPY package.json bun.lock ./  

# Install dependencies
RUN bun install

# Ensure correct permissions
RUN chown -R root:root /app/frontend

# Debugging steps (check if files exist)
RUN ls -al /app/frontend
RUN ls -al /app/frontend/vite.config.ts || echo "vite.config.ts missing"

# Copy the rest of the application code
COPY . /app/frontend/

# Generate SvelteKit types
RUN bun run prepare

# Build the Svelte application
RUN bun run build

# Expose port 80
EXPOSE 80

# Start the application
CMD ["bun", "run", "start"]
