import { Dog } from './dog';
import { Account } from './account';

export class Application {
    id: number = 0;
    dog: Dog = new Dog();
    user: Account = new Account();
    status: 'ONGOING' | 'COMPLETE' | 'CANCELLED' = 'ONGOING';
    application_date: Date = new Date();
}
