import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http'
import { ContactModel } from "./ContactModel";

@Injectable()
export class StoreContacts{
constructor(private http: HttpClient){}
updateContacts(contacts: ContactModel[]){
    return this.http.put("https://evolent-health-6b426.firebaseio.com/data.json", contacts);
}
getContacts(){
    return this.http.get("https://evolent-health-6b426.firebaseio.com/data.json");
}
}