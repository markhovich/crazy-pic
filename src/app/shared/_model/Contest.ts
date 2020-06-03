import { Picture } from 'src/app/shared/_model/Picture';

export class Contest{
    public id: string;
    public pictures?: Picture[];

    constructor(
        public title: string,
        public description: string,
        public author: string,
        public token: string,
        public deadline: Date
    ){}
}