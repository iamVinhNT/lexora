/**
 * @file port-server.mjs
 * @description Serves the health contract and reports real TCP bind failures.
 */

import { createServer } from 'node:http';

const port = Number(process.env.PORT);
const server = createServer((request, response) => {
  if (request.url !== '/api/health') {
    response.writeHead(404).end();
    return;
  }

  response.writeHead(200, { 'content-type': 'application/json' });
  response.end(JSON.stringify({ success: true, data: { status: 'ok', app: 'Lexora API' } }));
});

server.once('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1');
