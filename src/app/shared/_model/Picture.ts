export class Picture{
    id: number;
    note: number;
    
    constructor(
        public name: string,
        public photograph: string,
        public comment: string,
        public url?: string
    ){}
}