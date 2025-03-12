# Use the official Bun image
FROM oven/bun:canary-alpine


# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Svelte application
RUN bun run build

# Expose port 80
EXPOSE 80

# Start the application
CMD ["bun", "run", "start"]