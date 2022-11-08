class Contato{
    Email: string;
    Telefone?: string;

    constructor(email: string, telefone?: string){
        if (telefone){
            this.Telefone = telefone;
        }
        

        this.Email = email;
    }
}

export { Contato };