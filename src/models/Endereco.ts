class Endereco{
    Endereco?: string;
    Numero?: string;
    Bairro?: string;
    CodigoMunicipio: number;
    Uf?: string;
    Cep?: string;
    Complemento?: string;

    constructor(endereco: string, numero: string, bairro: string, codigo_municipio: number, uf: string, cep: string, complemento?: string){
        if(endereco !== '' &&  endereco !== undefined){
            this.Endereco = endereco;
        }

        if(numero !== undefined){
            this.Numero = numero;
        }
        
        if (complemento){
            this.Complemento = complemento;
        }
        
        if (bairro != ''){
            this.Bairro = bairro;
        }
        
        this.CodigoMunicipio = codigo_municipio;
        this.Uf = uf;
        
        if(cep !== '' &&  cep !== undefined){
            this.Cep = cep;
        }
        
    }
}

export { Endereco }