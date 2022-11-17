class Endereco{
    Endereco?: string;
    Numero?: string;
    Bairro?: string;
    CodigoMunicipio: number;
    Uf?: string;
    Cep?: string;
    Complemento?: string;

    constructor(endereco: string | undefined, numero: string | undefined, bairro: string | undefined, codigo_municipio: number, uf: string | undefined, cep: string | undefined, complemento?: string | undefined){
        if(endereco !== '' &&  endereco !== undefined){
            this.Endereco = endereco;
        }

        if(numero !== undefined){
            this.Numero = numero;
        }
        
        if (complemento || complemento !== undefined){
            this.Complemento = complemento;
        }
        
        if (bairro != '' && bairro != undefined){
            this.Bairro = bairro;
        }
        
        this.CodigoMunicipio = codigo_municipio;
        
        if (uf == undefined){

        }else {
            this.Uf = uf
        }
        
        if(cep !== '' &&  cep !== undefined){
            this.Cep = cep;
        }
        
    }
}

export { Endereco }