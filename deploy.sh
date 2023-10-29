#!/bin/bash

# Step 1: Install dependencies
# Replace "express" with any other required dependencies for your Express API
npm install express dotenv

# Step 2: Install Vercel CLI
npm install -g vercel

# Step 3: Login to Vercel (if not already logged in)
vercel login

# Step 4: Configure your Express API
# Replace "app.js" with the entry file of your Express API
echo "const app = require('./app');" > app.js
echo "const port = process.env.PORT || 3000;" >> app.js
echo "app.listen(port, () => console.log('Server running on port:', port));" >> app.js

# Step 5: Create vercel.json file
cat > vercel.json <<EOF
{
  "version": 2,
  "builds": [
    {
      "src": "app.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app.js"
    }
  ]
}
EOF

# Step 6: Deploy Express API on Vercel
vercel --yes