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