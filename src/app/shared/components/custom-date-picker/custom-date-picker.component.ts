import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from "@angular/forms";
import { PrimeNGConfig } from "primeng/api";
import { LocaleSettings } from "primeng/calendar";
import { TranslationService } from "src/app/services";

@Component({
  selector: 'app-custom-date-picker',
  templateUrl: './custom-date-picker.component.html',
  styleUrls: ['./custom-date-picker.component.scss']
})
export class CustomDatePickerComponent {
  @ViewChild('idModel') inputModel!: NgModel;
  @Input() icon: string | null = '';
  @Input() label: string = "";
  @Input() data: any = {};
  @Input() id: string = "";
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() dynamicLabel: boolean = false;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() form!: NgForm;

  private _es: LocaleSettings;
  private _en: LocaleSettings;

  @Output() dateChangeEmmiter: EventEmitter<any> = new EventEmitter();

  constructor(private _translationService: TranslationService, private _primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this._initLangOptions();
    this._createLangChangeSubscription();
    this._primengConfig.setTranslation(this.getLocale());
  }

  private _initLangOptions() {
    this._es = {
      firstDayOfWeek: 1,
      dayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ],
      monthNamesShort: [ "Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic" ],
      today: 'Hoy',
      clear: 'Borrar'
    };

    this._en = {
      firstDayOfWeek: 0,
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
      monthNames: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      today: 'Today',
      clear: 'Clear'
    };
  }

  private _createLangChangeSubscription() {
    this._translationService.langChange.subscribe((lang: string) => {
        this._primengConfig.setTranslation(this.getLocale(lang));
      }
    );
  }

  getLocale(lang?: string): LocaleSettings {
    const currentLang = lang ? lang : this._translationService.getCurrentLang().LABEL;
    console.log(currentLang);
    return currentLang.includes('es') ? this._es : this._en;
  }

  isInvalidInput(): boolean {
    return this.form.submitted && this.inputModel && !this.inputModel.valid;
  }

  onDateChange(event: any) {
    this.dateChangeEmmiter.emit(event);
  }
}
