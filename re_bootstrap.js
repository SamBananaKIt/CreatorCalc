
import { spawn } from 'child_process';

const apiKey = 'sk-user-dDM0xE8u89jxVdinNIKTml9j5KSmgDhUrvjyfU2CIByNpQslE_ciRey_iQYP-AwolCe7CuRac2sto3qttforiTD_Jy6g3uCu5S_CL2LK5Ea34zk02DlSUFURC2EYKidaUfY';

const mcp = spawn('npx', ['-y', '@testsprite/testsprite-mcp@latest', 'server'], {
    env: { ...process.env, API_KEY: apiKey }
});

async function run() {
    const send = (msg) => mcp.stdin.write(JSON.stringify(msg) + '\n');

    await new Promise(r => setTimeout(r, 2000));
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

    await new Promise(r => setTimeout(r, 2000));
    // Call bootstrap to see if it refreshes anything
    send({
        jsonrpc: '2.0',
        method: 'tools/call',
        id: 3,
        params: {
            name: 'testsprite_bootstrap',
            arguments: {
                projectPath: '/home/nice/CreatorCalc',
                type: 'frontend'
            }
        }
    });

    await new Promise(r => setTimeout(r, 10000));
    mcp.kill();
}

run();
