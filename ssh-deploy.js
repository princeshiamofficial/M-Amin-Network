const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  console.log('Client :: ready');
  conn.exec('cd /home/m-aminnetwork.com/M-Amin-Network && git fetch origin main && git reset --hard origin/main && npm run build && pm2 restart m-amin-network', (err, stream) => {
    if (err) throw err;
    stream.on('close', (code, signal) => {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', (data) => {
      process.stdout.write('STDOUT: ' + data);
    }).stderr.on('data', (data) => {
      process.stderr.write('STDERR: ' + data);
    });
  });
}).connect({
  host: '187.127.186.19',
  port: 22,
  username: 'mamin1458',
  password: 'mamin1458'
});
