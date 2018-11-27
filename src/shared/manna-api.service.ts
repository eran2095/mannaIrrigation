import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs";
import { Observable } from "rxjs/Observable";
@Injectable()
export class MannaApi {
  private baseUrl = "https://qa.manna-irrigation.com:8443/omer/api/v2";
  isDevMode: Boolean = false;
  public objUserLogin: any;
  headers = new Headers();
  options: RequestOptions;
  appVersion: string = "0.0.1";

  constructor(private http: Http) {
    this.headers.set("Access-Control-Allow-Origin", "*");
    this.options = new RequestOptions({ headers: this.headers });
  }

  doLogin(prmEmail: string, prmPassword: string): Observable<any> {
    let objRequest = { email: prmEmail, password: prmPassword };
    let url = this.http.post(this.baseUrl + "/users/login", objRequest);
    if (this.isDevMode) {
      url = this.http.get("../assets/mocks/DoLogin.json");
    }
    return url.map((response: Response) => {
      this.objUserLogin = response.json();
      this.headers.set("X-User-Api-Token", this.objUserLogin.user_api_token);
      this.options = new RequestOptions({ headers: this.headers });
      return this.objUserLogin;
    });
  }

  getFarms(): Observable<any> {
    let url = this.http.get(this.baseUrl + "/farms", this.options);
    if (this.isDevMode) {
      url = this.http.get("../assets/mocks/Farms.json");
    }
    return url.map((response: Response) => {
      return response.json();
    });
  }

  getFieldsByFarmId(prmFarmId:number): Observable<any> {
    let url = this.http.get(this.baseUrl + "/fields?farm_id="+prmFarmId, this.options);
    if (this.isDevMode) {
      url = this.http.get("../assets/mocks/FarmsById.json");
    }
    return url.map((response: Response) => {
      return response.json();
    });
  }

}
