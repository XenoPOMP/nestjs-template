import * as dotenv from 'dotenv';

// Automatically parses your .env file into process.env
dotenv.config({ quiet: true });

// Mock dotenv
process.env.APP_HOST = 'localhost';
process.env.JWT_SECRET = 'testing-secret';
process.env.ARGON_SECRET = 'testing';
