import express from 'express'
import StorageInterface from '../Storage/StorageInterface';
import url  from 'url';


export default class RestServerController{

  private app =  express()
  public port = 3001;
  constructor(public storage: StorageInterface){

  }

  setup(){
    this.createRoutes();
  }

  init(){

    this.app.listen(this.port,()=>{
      console.log(`REST Server alive on port ${this.port}`)
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

    /** Search */
    this.app.get('/emails/search/', async (req, res)=>{
      res.status(200).send({
          emails: await this.storage.search(req.query)
        }
      )
    })
  }
}