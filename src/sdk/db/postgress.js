import { Client } from "pg";
const tunnel = require("tunnel-ssh");
const { readFileSync } = require("fs");

export default function Query(query, db) {
  return new Promise((resolve, reject) => {
    const tunnelPort = 33000 + Math.floor(Math.random() * 1000);

    tunnel(
        {
          host: process.env.SSH_HOST,
          username: process.env.SSH_USERNAME,
          privateKey: readFileSync(process.env.SSH_PRIVATE_KEY),
          port: 22,
          dstHost: db.host,
          dstPort: 5432,
          localPort: tunnelPort,
        },
        async (err) => {
          if (err) throw err;
         // console.log("Tunnel connected");

          const client = new Client({
            connectionString: `postgres://${db.user}:${db.password}@127.0.0.1:${tunnelPort}/${db.database}`,
          });

          try {
            await client.connect();
            const res = await client.query(query);
            await client.end();

            resolve(res.rows);
          } catch (e) {
            reject(e);
          }
        }
    );
  });
}

