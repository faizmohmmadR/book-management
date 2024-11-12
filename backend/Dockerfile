# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the entire project files
COPY . .

# Step 6: Build the NestJS app
RUN npm run build

# Step 7: Expose the port your app will run on
EXPOSE 3000

# Step 8: Start the NestJS app
CMD ["npm", "run", "start:prod"]
