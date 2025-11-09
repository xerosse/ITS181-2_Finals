export class Account {
    id: number = 0;
    name: string = '';
    email: string = '';
    role: 'USER' | 'ADMIN' = 'USER';
    password: string = '';
}
