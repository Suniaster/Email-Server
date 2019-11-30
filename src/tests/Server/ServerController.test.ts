
import ServerController from '../../Server/ServerController';
import { Server } from 'net';
import { exec } from 'child_process';


describe('ServerController', () => {
  test('it should create server', ()=>{
    const server = new ServerController();
  
    expect(server.init()).toBeInstanceOf(Server);
    server.close();
  })
  
  test('it should change server options', ()=>{
    const server = new ServerController({
      name: "test133"
    });

    expect(server.server.options.name).toBe("test133")
  })

  test('extend object works', ()=>{
    let obj1 = {
      "test1": "aaaa",
      "test2": "bbbb"
    }
    let obj2 = {
      "test2": "aaaa",
      "test3": "bbbb"
    }

    expect(ServerController.extendObject(obj1, obj2)).toStrictEqual({
      "test1": "aaaa",
      "test2": "aaaa",
      "test3": "bbbb"
    })
  })

  test('receives messsage', async ()=>{
    const server = new ServerController();
    server.init(()=>{})
    // await exec('./scripts/test.sh', (err, out) => {
    //   console.log(err, out);
    //   // expect(...some file to be created);
    //   // done();
    // });
    server.close();
  })


})


// Server:
/**
 * SMTPServer {
        _events: [Object: null prototype] {},
        _eventsCount: 0,
        _maxListeners: undefined,
        options:
          { disabledCommands: [ 'STARTTLS', 'AUTH' ],
            logger: true,
            name: 'test133',
            onData: [Function],
            authMethods: [ 'LOGIN', 'PLAIN' ] },
          secureContext: Map { '*' => SecureContext { context: SecureContext {} } },
        logger:
          { trace: [Function],
            debug: [Function],
            info: [Function],
            warn: [Function],
            error: [Function],
            fatal: [Function] },
        onData: [Function],
        _closeTimeout: false,
        connections: Set {},
        server:
        Server {
          _events:
            [Object: null prototype] {
              connection: [Function],
              listening: [Function],
              close: [Function],
              error: [Function] },
          _eventsCount: 4,
          _maxListeners: undefined,
          _connections: 0,
          _handle: null,
          _usingWorkers: false,
          _workers: [],
          _unref: false,
          allowHalfOpen: false,
          pauseOnConnect: false,
          [Symbol(asyncId)]: -1 } }
 */