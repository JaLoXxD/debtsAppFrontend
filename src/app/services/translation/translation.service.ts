import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { constants } from "src/app/constants";
import { LangModel } from "src/app/models";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private _currentLang: LangModel;
  appConstants: typeof constants = constants;

  constructor(private _translate: TranslateService) {
    this._currentLang = constants.LANG_OPTIONS.filter((lang: LangModel) => lang.LANG === this._translate.currentLang)[0];
  }

  loadDefaultLang(): void {
    this._translate.setDefaultLang(constants.DEFAULT_LANG);
    this._translate.use(this._translate.getBrowserLang() || constants.DEFAULT_LANG);
  }

  changeLang(lang: string): void {
    this._translate.use(lang);
    this.setCurrentLang();
  }

  setCurrentLang(): void {
    const currLang = this._translate.currentLang;
    this._currentLang = constants.LANG_OPTIONS.filter((lang: LangModel) => lang.LANG === currLang)[0];
  }

  getCurrentLang(): LangModel {
    return this._currentLang;
  }
}
