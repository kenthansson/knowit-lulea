import { Category } from "./category.model";

export class Poi {

    constructor(
        public id: number | undefined,
        public lat: number,
        public lng: number,
        public name: string,
        public description: string,
        public category: Category,
        public created: Date,
        public updated: Date | undefined
    ) {
    }
}
