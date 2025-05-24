# 1. Use the Node.js base image
FROM node:20

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy the rest of the app
COPY . .

# 5. Build the TypeScript files
RUN npm run build

# 6. Expose the port
EXPOSE 5000

# 7. Start the server
CMD ["npm", "start"]
