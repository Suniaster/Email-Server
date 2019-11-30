import {SMTPServer, SMTPServerOptions, SMTPServerDataStream, SMTPServerSession} from 'smtp-server'
import StorageInterface, { StorageObject } from '../Storage/StorageInterface';
import DictStorage from '../Storage/DictStorage';
// const { PassThrough, Writable } = require('stream');


export default class ServerController{
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


    this.storage.setup();
    this.server = new SMTPServer(ServerController.extendObject(options, configs));
  }

  handleMessage = (stream:SMTPServerDataStream, session:SMTPServerSession, callback: (err?:Error)=> void) =>{
    let str = "";
    stream.on('data', (chunk) => { str+= chunk });

    stream.on('end', ()=>{
      this.storage.store(
        ServerController.parseEmailString(str)
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



  static extendObject(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
  }

  static parseEmailString(emailStr:string):StorageObject{
    let lines = emailStr.split("\n")
    let subject;
    let to;
    let from;
    let body = "";
    let bodyInic = false;
    lines.forEach((line)=>{
      if(line.startsWith("From")){
        from = line.split("From: ")[1];
      }
      if(line.startsWith("To")){
        to = line.split("To: ")[1];
      }
      if(line.startsWith("Subject")){
        subject = line.split("Subject: ")[1];
      }

      if(bodyInic) body+=line;
      if(!line.replace(/\s/g, '').length) bodyInic = true;
    })

    return {
      to: to.replace('\r', ''),
      from: from.replace('\r', ''),
      subject: subject.replace('\r', ''),
      body: body.replace('\r', '')
    }
  }
}

// sudo lsof -i -P -n | grep LISTEN
// sudo /etc/init.d/sendmail stop

/**
 * email format: 
 *  Received: (from root@localhost)
      by thiago-Inspiron-7472 (8.15.2/8.15.2/Submit) id xAUMdLfQ005545;
      Sat, 30 Nov 2019 19:39:22 -0300
    Date: Sat, 30 Nov 2019 19:39:22 -0300
    From: root <root@thiago-Inspiron-7472>
    Message-Id: <201911302239.xAUMdLfQ005545@thiago-Inspiron-7472>
    Subject: Testando email\n Testando
    To: <localhost@suniaster>
    X-Mailer: mail (GNU Mailutils 3.4)
    
    Teste email
 */