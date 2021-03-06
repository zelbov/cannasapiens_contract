import 'mocha/mocha'
import { existsSync, mkdirSync } from 'fs';
import path from 'path'
import { config } from 'dotenv'

process.env.NODE_ENV = 'test';
process.env.DISABLE_API_LOGGING = 'true'

config({ path: '.env.sample' })

describe('Benchmarking', () => {

    after(async function(){

        this.timeout(0)

        console.log('Performing forced garbage collection...');

        (global.gc ? global.gc : () => { return; })();

    })

    before(async function(){

        const dumpsPath = path.join(
            process.cwd(), 'log', 'benchmark'
        )

        if(!existsSync(dumpsPath))
            mkdirSync(dumpsPath, { recursive: true })

        console.log('Test initiated at', new Date().toLocaleString());

    })

    const breq = require.context('./', true, /(\/benchmark\/).+\.test\.(j|t)sx?$/)
    breq.keys().forEach(breq);

})