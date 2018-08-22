import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { contactModel } from "./contactModel";

@Injectable()
export class storeContacts{
constructor(private http: HttpClient){}
updateContacts(contacts: contactModel[]){
    return this.http.put("https://evolent-health-6b426.firebaseio.com/data.json", contacts);
}
getContacts(){
    return this.http.get("https://evolent-health-6b426.firebaseio.com/data.json");
}
}