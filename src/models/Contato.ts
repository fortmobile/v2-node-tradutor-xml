class Contato{
    Email?: string;
    Telefone?: string;

    constructor(email?: string | undefined, telefone?: string | undefined){
        if (telefone || telefone !== undefined){
            this.Telefone = telefone;
        }
        
        if (email || telefone !== undefined){
            this.Email = email;
        }
    }
}

export { Contato };