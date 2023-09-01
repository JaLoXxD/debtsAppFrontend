import { Component } from '@angular/core';
import { constants } from "src/app/utils/constants";
import { LangModel } from "src/app/models";
import { TranslationService } from "src/app/services";

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss']
})
export class LangSelectorComponent {
  appConstants: typeof constants = constants;
  showOptions: Boolean = false


  constructor(private _translationService: TranslationService) { }

  ngOnInit(): void {
    this._translationService.setCurrentLang();
  }

  toogleOptions() {
    this.showOptions = !this.showOptions;
  }

  setLang(lang: string) {
    this._translationService.changeLang(lang);
  }

  getCurrentLang(): LangModel {
    return this._translationService.getCurrentLang();
  }
}
