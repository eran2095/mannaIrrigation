import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from "ionic-angular";
import { MannaApi } from "../../shared/shared";
import { LoginPage } from "../login/login";
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  arrFarms: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mannaApi: MannaApi,
    public loadingController: LoadingController,
    public alertCtrl: AlertController
  ) {
    this.arrFarms = this.navParams.data;
    console.log("mannaApi", mannaApi);
  }

  doLogOut() {
    this.navCtrl.setRoot(LoginPage);
  }

  showAlert(strMsg) {
    let alert = this.alertCtrl.create({
      title: "Note !",
      subTitle: strMsg,
      buttons: ["Ok"]
    });
    alert.present();
  }

  getFieldsByFarmId(prmFarmId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let loader = this.loadingController.create({
        content: "Loading Data..."
      });
      loader.present().then(() => {
        this.mannaApi.getFieldsByFarmId(prmFarmId).subscribe(
          data => {
            resolve(data);
            loader.dismiss();
          },
          err => {
            loader.dismiss();
            resolve(false);
            this.showAlert(err.json().message);
          }
        );
      });
    });
  }

  toggleSection(ind01: number) {
    this.arrFarms[ind01].open = !this.arrFarms[ind01].open;
    setTimeout(() => {
      //<<<---    using ()=> syntax
      if (this.arrFarms[ind01].open && !this.arrFarms[ind01].children) {
        console.log("open", this.arrFarms[ind01]);
        this.getFieldsByFarmId(this.arrFarms[ind01].id).then(result => {
          console.log(result);
          this.arrFarms[ind01].children = result;
        });
      }
    }, 100);
  }
}
