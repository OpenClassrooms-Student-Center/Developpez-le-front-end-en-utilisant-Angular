import { Injectable } from "@angular/core";

@Injectable({
    providedIn : 'root',
})
export class ColorService {

    getNbColorRandom(numColor: number): string[]{

        let letters = '0123456789ABCDEF';
        let tabColor: string[] = [];
        while (numColor > 0){
            let color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            tabColor.push(color);
            numColor--;
        }
        return tabColor;
    }
}
