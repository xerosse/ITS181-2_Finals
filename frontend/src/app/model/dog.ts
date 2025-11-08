export class Dog {
    id: number = 0;
    name: string = ' ';
    image_paths: string[] = [];

    age: number = 0;
    sex: 'M' | 'F' | '' = '';
    breed: string = '';
    size: 'SMALL' | 'MEDIUM' | 'LARGE' | '' = '' ;
    weight: number = 0;
    status: 'ADOPTED' | 'AVAILABLE'  = 'AVAILABLE';

    arrived_date: Date = new Date();
    adopted_date?: Date;

    description: string = '';
}
