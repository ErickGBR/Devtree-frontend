export type IUser = {
    handle: string;
    name: string;
    email: string;
    password: string;
}

export type Registerform = Pick <IUser, 'handle' | 'name' | 'email' > & {
    password: string;
    password_confirmation: string;
}