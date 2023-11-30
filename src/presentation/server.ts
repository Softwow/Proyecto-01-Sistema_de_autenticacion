import express, { Router } from "express";

interface Options {
  port: number;
  routes: Router;
  
}


export class Server {

  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;


  private serverListener?: any;

  constructor({ port,routes }: Options) {
    this.port = port;
    this.routes = routes;
  }
  
  
  
  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    


   //* Routes
   this.app.use(this.routes);   

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  /**
   * Closes the server and stops listening for incoming requests.
   */
  public close() {
    this.serverListener?.close();
  }
}
