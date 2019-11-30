import EmailServerController from "./Server/EmailServerController";
import DictStorage from "./Storage/DictStorage";


let storage = new DictStorage();
const controller = new EmailServerController({}, storage);

controller.init()