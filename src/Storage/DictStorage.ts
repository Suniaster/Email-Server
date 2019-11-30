import StorageInterface, { StoredObject, SearchableObject } from "./StorageInterface";

export default class DictStorage extends StorageInterface{

  private objects;
  private counter:number;
  public setup(){
    this.counter = 0;
    this.objects = {};
  }

  public async store(toStore:StoredObject):Promise<number>{
    this.objects[this.counter] = toStore;
    this.counter+=1;
    return this.counter-1;
  }

  public async search(toSearch:SearchableObject):Promise<StoredObject[]>{
    let toRet:any = [];
    if(toSearch.id === undefined){
      for (var key in this.objects) {
        let obj = this.objects[key];
        if( (toSearch.subject == obj.subject || toSearch.subject == undefined) &&
            (toSearch.to == obj.to || toSearch.to == undefined) &&
            (toSearch.from == obj.from || toSearch.from == undefined)
        ){
          toRet.push(obj)
        }
      }
    }
    else{
      toRet = this.objects[toSearch.id] === undefined? []:[this.objects[toSearch.id]] 
    }
    return toRet;
  }

  public async reset():Promise<boolean>{
    this.objects = {};
    return true;
  }

  public async all():Promise<StoredObject[]>{
    let list = [];
    for (var key in this.objects) {
      let obj = this.objects[key];
      list.push(obj)  
    }

    return list;
  }
}