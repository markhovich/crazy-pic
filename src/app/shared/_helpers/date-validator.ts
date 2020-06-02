import { AbstractControl } from "@angular/forms";

export function dateValidator(control: AbstractControl){

    const dateNow = new Date().getTime();

    console.log(control.value);
    if(control.value !== undefined && control.value < dateNow){
        return { 'datePast': true };
    }
    return null;
}