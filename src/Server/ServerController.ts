import {SMTPServer, SMTPServerOptions, SMTPServerDataStream, SMTPServerSession} from 'smtp-server'
// const { PassThrough, Writable } = require('stream');


export default class ServerController{
  server : SMTPServer;

  constructor(configs: SMTPServerOptions = {}){
    const options: SMTPServerOptions = {
      // disable STARTTLS to allow authentication in clear text mode
      disabledCommands: ['STARTTLS', 'AUTH'],
      name: "suniaster",
      onData: this.handleMessage
      // logger: true,
    }
    this.server = new SMTPServer(ServerController.extendObject(options, configs));
  }

  handleMessage = (stream:SMTPServerDataStream, session:SMTPServerSession, callback: (err?:Error)=> void) =>{
    let str = "";
    stream.on('data', (chunk) => { str+=chunk });

    stream.on('end', ()=>{console.log(str)})
  }


  init(logFun = console.log){
    return this.server.listen(25, ()=>{
      logFun("Server started, listening on port 25...");
    });
  }

  close(callback = () =>{} ){
    this.server.close(callback);
  }

  static extendObject(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
  }
}

// sudo lsof -i -P -n | grep LISTEN
// sudo /etc/init.d/sendmail stop
