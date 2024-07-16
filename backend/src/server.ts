/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import cors from "cors"

import mysqlConnection from "./db/mysql";
import { Credits } from "./models/creditsSchema";
import {
  createCreditsTable,
  createUsersTable,
} from "./db/querys";
import indexRoutes from "./routes/index.routes";
import creditsRoutes from "./routes/credits.routes";

class Server {
  public app: express.Application;
  private serverInstance: any

  constructor() {
    this.app = express();
    this.config();
    this.mysqlConnect();
    this.routes();
  }

  private config() {
    // Settings
    this.app.set("port", process.env.PORT);

    //Middlewares
    this.app.use(express.json())
    this.app.use(cors())
  }

  private async mysqlConnect() {
    try {
      await mysqlConnection.query<Credits[]>(`USE ${process.env.DB_NAME}`);
      await mysqlConnection.query<Credits[]>(createCreditsTable);
      await mysqlConnection.query<Credits[]>(createUsersTable);
    } catch (error) {
      console.error(`Error en la conexion de la base de datos`, error);
    }
  }

  private routes() {
    this.app.use(indexRoutes);
    this.app.use("/api/credits", creditsRoutes);
  }
  
  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port", this.app.get("port"));
    });
  }

  public stop() {
    if(this.serverInstance) {
      this.serverInstance.close(() => {
        console.log('Server stopped')
      })
    }
  }
}
export default Server

const server = new Server();
server.start();
