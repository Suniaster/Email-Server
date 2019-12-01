import express from 'express'
import StorageInterface from '../Storage/StorageInterface';


export default class RestServerController{

  private app =  express()
  public port = 3000;
  constructor(public storage: StorageInterface){

  }

  setup(){
    this.createRoutes();
  }

  init(){

    this.app.listen(this.port,()=>{
      console.log("REST Server alive")
    });
  }


  createRoutes(){
    
    /** Index */
    this.app.get('/emails', async (req, res)=>{
      res.status(200).send({
          emails: await this.storage.all()
        }
      )
    })
  }
}