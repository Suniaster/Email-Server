import ServerController from "./Server/ServerController";
import DictStorage from "./Storage/DictStorage";


let storage = new DictStorage();
const controller = new ServerController({}, storage);

controller.init()