import { envs } from './config/envs';
import { MongoDatabase } from './data/mongo/conectionBd';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();

async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.BASE_URL,
    dbName: envs.DB_NAME,
  });
const server = new Server({
  port: envs.PORT,
  routes: AppRoutes.routes,
});

server.start();
}

/*function main() {

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
} */