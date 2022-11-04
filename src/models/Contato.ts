class Contato{
    Telefone: number;
    Email?: string;

    constructor(telefone: number, email?: string){
        this.Telefone = telefone;

        if(email){
            this.Email = email;
        }
    }
}

export { Contato };