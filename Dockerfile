# Use node:14 as the base image
FROM node:16-alpine

# Create a working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 3000 for the React development server
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]