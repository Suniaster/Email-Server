import {SMTPServer, SMTPServerOptions, SMTPServerDataStream, SMTPServerSession} from 'smtp-server'
import StorageInterface, { StorageObject } from '../Storage/StorageInterface';
import DictStorage from '../Storage/DictStorage';
import { parseEmailString, extendObject } from '../utils/helpers';
// const { PassThrough, Writable } = require('stream');


export default class EmailServerController{
  server : SMTPServer;

  constructor(configs: SMTPServerOptions = {}, public storage:StorageInterface = new DictStorage()){
    //! To change later
    const options: SMTPServerOptions = {
      // disable STARTTLS to allow authentication in clear text mode
      disabledCommands: ['STARTTLS', 'AUTH'],
      name: "suniaster",
      onData: this.handleMessage
      // logger: true,
    }

    this.server = new SMTPServer(extendObject(options, configs));
  }

  handleMessage = (stream:SMTPServerDataStream, session:SMTPServerSession, callback: (err?:Error)=> void) =>{
    let str = "";
    stream.on('data', (chunk) => { str+= chunk });

    stream.on('end', ()=>{
      this.storage.store(
        parseEmailString(str)
      )
    })
  }


  init(logFun = console.log){
    return this.server.listen(25, ()=>{
      logFun("Server started, listening on port 25...");
    });
  }

  close(callback = () =>{} ){
    this.server.close(callback);
  }

}

// sudo lsof -i -P -n | grep LISTEN
// sudo /etc/init.d/sendmail stop

