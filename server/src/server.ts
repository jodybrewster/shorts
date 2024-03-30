import express from 'express';
import mongoose from 'mongoose';
//import { RateLimiterMemory } from "rate-limiter-flexible";
import { nanoid } from 'nanoid';
import swaggerUi from 'swagger-ui-express';
import YAML from 'js-yaml';
import fs from 'fs';
import path from 'path';

import { registerRoutes } from './routes';
import dbConfig from './config/db.config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// Swagger setup
const swaggerDocument: any = YAML.load(fs.readFileSync(path.join(__dirname, '../swagger.yaml'), 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
const options: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
//TODO: remove the user pass from the url, should be in docker-compose
mongoose.connect(dbConfig.url, options).then(()=>console.log('connected'))
.catch(e=>console.log(e));

// Rate limiting
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
// });

// Register the routes
registerRoutes(app);


// Define routes here

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});