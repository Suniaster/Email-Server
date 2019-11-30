import DictStorage from "../../Storage/DictStorage"
import { StorageObject } from "../../Storage/StorageInterface";

let storage: DictStorage;
let templateObject:StorageObject;



describe('DictStorage', () => {
  
  beforeEach(()=>{
    // Setup storage
    storage = new DictStorage();
    storage.setup();

    // create valid object
    templateObject = {
      to: "Receiver",
      from: "Sencer",
      subject: "Test case",
      body: "This is my test case"
    }
  })

  it('creates empty storage', async ()=>{
    expect(await storage.all()).toStrictEqual([]);
  });

  describe('Store method: ', ()=>{
    it('store a valid object', async ()=>{
      await storage.store(templateObject);
      expect(await storage.all()).toContain(templateObject);
    })
  })

  describe('Search method: ', ()=>{
    it('search object by id', async ()=>{
      let stored_id = await storage.store(templateObject);
      expect(await storage.search({id: stored_id})).toContain(templateObject);
    })
  
    it('search object by "to" attribute', async ()=>{
      let stored_id = await storage.store(templateObject);
      expect(await storage.search({to: templateObject.to})).toContain(templateObject);
    })
  
    it('returns empty list when searching invalid id', async ()=>{
      let stored_id = await storage.store(templateObject);
      expect(await storage.search({id: 300})).toStrictEqual([]);
    })
  
    it('returns empty list when searching inexistent subject', async ()=>{
      let stored_id = await storage.store(templateObject);
      expect(await storage.search({subject: "Not existing one"})).toStrictEqual([]);
    })
  })

  describe('Reset method: ', ()=>{
    it('empty storage after reseting', async ()=>{
      await storage.store(templateObject);
      let all = await storage.all()
      expect(all.length).toBe(1);

      storage.reset();
      all = await storage.all()
      expect(all.length).toBe(0);
    });
  })
})
