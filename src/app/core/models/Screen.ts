/**
 * This class represents the states of the screen size and orientation.
 * It is used in the different pages components to use the correct scss class depending on the screen attributes.
 */

export class Screen {
    isSmall:boolean;
    isMedium:boolean;
    isLarge:boolean;
    isPortrait:boolean;

    constructor(size:string, isPortrait:boolean) {
        this.isPortrait = isPortrait;
        switch(size) {
            case 'XSmall':
            case 'Small':
                this.isSmall = true;
                this.isMedium = false;
                this.isLarge = false;
              break;
            case 'Medium':    
                this.isSmall = false;
                this.isMedium = true;
                this.isLarge = false;
              break;
            case 'Large':
            case 'XLarge':
            default:
                this.isSmall = false;
                this.isMedium = false;
                this.isLarge = true;
        }
    }
}