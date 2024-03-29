# Stage 1: Build
# Use a Node.js image to build the application
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./


# Install dependencies
RUN npm install --production

# Copy the rest of your app's source code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Stage 2: Runtime
# Use a clean Node.js image for the runtime environment
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app



# Copy built assets from the builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json and other necessary files for runtime
COPY --from=builder /app/package*.json ./

COPY --from=builder /app/swagger.yaml ./


# Install only production dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3000

# In the runtime stage
# Create a non-root user and switch to it
RUN adduser -D AstronautMonkey
USER AstronautMonkey

# Run the app
CMD ["node", "dist/server.js"]