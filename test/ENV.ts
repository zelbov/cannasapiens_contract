import { config } from 'dotenv'

process.env.NODE_ENV = 'test';
process.env.DISABLE_API_LOGGING = 'true'

config({ path: '.env.sample' })

console.log('Test initiated at', new Date().toLocaleString());

const req = require.context('./', true, /(\/unit\/).+\.(j|t)sx?$/)
req.keys().forEach(req);