
import { spawn } from 'child_process';

const mcp = spawn('npx', ['-y', '@testsprite/testsprite-mcp@latest', 'server'], {
    env: {
        ...process.env,
        API_KEY: 'sk-user-dDM0xE8u89jxVdinNIKTml9j5KSmgDhUrvjyfU2CIByNpQslE_ciRey_iQYP-AwolCe7CuRac2sto3qttforiTD_Jy6g3uCu5S_CL2LK5Ea34zk02DlSUFURC2EYKidaUfY'
    },
    detached: true,
    stdio: ['pipe', 'pipe', 'pipe']
});

mcp.stdout.on('data', (data) => {
    const line = data.toString();
    console.log(line);
    if (line.includes('Starting server on')) {
        const match = line.match(/http:\/\/localhost:(\d+)/);
        if (match) {
            const port = match[1];
            const url = `http://localhost:${port}/init?project_path=${encodeURIComponent('/home/nice/CreatorCalc')}&default_type=frontend`;
            console.log('\n\n🚀 TESTSPRITE PORTAL READY!');
            console.log('URL:', url);
        }
    }
});

mcp.stdin.write(JSON.stringify({
    jsonrpc: '2.0',
    method: 'initialize',
    id: 1,
    params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'Antigravity', version: '1.0' }
    }
}) + '\n');

// Keep the process running for a long time
setTimeout(() => { }, 3600000);
