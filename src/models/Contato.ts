class Contato{
    Email?: string;
    Telefone?: string;

    constructor(email?: string, telefone?: string){
        if (telefone){
            this.Telefone = telefone;
        }
        
        if (email){
            this.Email = email;
        }
    }
}

export { Contato };