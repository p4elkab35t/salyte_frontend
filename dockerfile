# Use the official Bun image
FROM oven/bun:canary-alpine


# Set the working directory
WORKDIR /app/frontend

# Copy package.json and bun.lockb
COPY package.json bun.lock /app/frontend/

# Install dependencies
RUN bun install

RUN chown root:root /app/frontend -R

USER root

# Copy the rest of the application code
COPY . /app/frontend/

# COPY --chown=vite:vite /app/frontend/node_modules/ ./node_modules/

# Generate SvelteKit types and config
RUN bun run prepare

# Build the Svelte application
RUN bun run build

# Expose port 80
EXPOSE 80

# Start the application
CMD ["bun", "run", "start"]