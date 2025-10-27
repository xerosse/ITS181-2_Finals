export class Dog {
    id: number = 0;
    name: string = ' ';
    image_paths: string[] = [];

    age: number = 0;
    sex: 'M' | 'F' | '' = '';
    breed: string = '';
    size: 'Small' | 'Medium' | 'Large' | '' = '' ;
    weight: number = 0;
    status: 'Adopted' | 'Available'  = 'Available';

    arrived_date: Date = new Date();
    adopted_date?: Date;

    description: string = '';
}
