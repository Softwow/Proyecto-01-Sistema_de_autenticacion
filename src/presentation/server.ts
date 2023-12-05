import express, { Router } from "express";
import path from 'path';


interface Options {
  port: number;
  routes: Router;
  public_path?: string;
  
}


export class Server {

  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;
  private readonly publicPath: string;


  private serverListener?: any;

  constructor({ port,routes, public_path = 'public'  }: Options) {
    this.port = port;
    this.routes = routes;
    this.publicPath = public_path;
  }
  
  
  
  async start() {
    //* Middlewares
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    


   //* Routes
   this.app.use(this.routes);   


   // ruta de prueba de auth google
      //* Public Folder
      this.app.use( express.static( this.publicPath ) );

      //* Routes
      this.app.use( this.routes );
  
      //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
      this.app.get('*', (req, res) => {
        const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
        res.sendFile(indexPath);
      });
      





   

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
