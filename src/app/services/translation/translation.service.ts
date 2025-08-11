import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { constants } from "src/app/utils/constants";
import { LangModel } from "src/app/models";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang: LangModel;
  appConstants: typeof constants = constants;
  langChange: Subject<string> = new Subject<string>();

  constructor(private _translate: TranslateService) {
    this._translate.addLangs(constants.LANG_OPTIONS.map((lang: LangModel) => lang.LANG));
    this.currentLang = constants.LANG_OPTIONS.filter((lang: LangModel) => lang.LANG === constants.DEFAULT_LANG)[0];
  }

  loadDefaultLang(): void {
    this._translate.setDefaultLang(constants.DEFAULT_LANG);
    this._translate.use(this._translate.getBrowserLang() || constants.DEFAULT_LANG);
  }

  changeLang(lang: string): void {
    this._translate.use(lang).subscribe(() => {
      this.setCurrentLang();
    });
  }

  setCurrentLang(): void {
    const currLang = this._translate.currentLang;
    this.langChange.next(currLang);
    this.currentLang = constants.LANG_OPTIONS.filter((lang: LangModel) => lang.LANG === currLang)[0];
  }

  getCurrentLang(): LangModel {
    if(!this.currentLang){
      this.setCurrentLang();
    }
    return this.currentLang;
  }

  getCurrentPrefix(): string {
    return this.currentLang?.PREFIX || constants.LANG_OPTIONS.filter((lang: LangModel) => lang.LANG === constants.DEFAULT_LANG)[0].PREFIX;
  }

  getTranslateService(): TranslateService {
    return this._translate;
  }
}
