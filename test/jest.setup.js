// Mock .env file

process.env.DATABASE_URL = process.env.DATABASE_URL ?? 'DATABASE_URL';
process.env.APP_HOST = 'localhost';
process.env.JWT_SECRET = 'testing-secret';
process.env.ARGON_SECRET = 'testing';
