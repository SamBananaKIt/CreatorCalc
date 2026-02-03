
import { spawn } from 'child_process';

const apiKey = 'sk-user-dDM0xE8u89jxVdinNIKTml9j5KSmgDhUrvjyfU2CIByNpQslE_ciRey_iQYP-AwolCe7CuRac2sto3qttforiTD_Jy6g3uCu5S_CL2LK5Ea34zk02DlSUFURC2EYKidaUfY';

const mcp = spawn('npx', ['-y', '@testsprite/testsprite-mcp@latest', 'server'], {
    env: { ...process.env, API_KEY: apiKey }
});

mcp.stdout.on('data', (data) => console.log('[STDOUT]', data.toString()));
mcp.stderr.on('data', (data) => console.log('[STDERR]', data.toString()));

async function run() {
    const send = (msg) => {
        console.log('[SENDING]', JSON.stringify(msg));
        mcp.stdin.write(JSON.stringify(msg) + '\n');
    };

    await new Promise(r => setTimeout(r, 5000));
    send({
        jsonrpc: '2.0',
        method: 'initialize',
        id: 1,
        params: {
            protocolVersion: '2024-11-05',
            capabilities: {},
            clientInfo: { name: 'Antigravity', version: '1.0' }
        }
    });

    await new Promise(r => setTimeout(r, 5000));
    send({
        jsonrpc: '2.0',
        method: 'tools/call',
        id: 2,
        params: {
            name: 'testsprite_generate_code_and_execute',
            arguments: {
                projectPath: '/home/nice/CreatorCalc'
            }
        }
    });

    // Wait long enough for generation
    await new Promise(r => setTimeout(r, 300000)); // 5 minutes
    mcp.kill();
}

run();
