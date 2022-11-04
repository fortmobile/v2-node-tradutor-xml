import {Endereco} from "./Endereco";
import {Contato} from "./Contato"

class Prestador{
    IdentificacaoPrestador: IdentificacaoPrestadorTomador;
    RazaoSocial: string;
    Endereco: Endereco;
    NomeFantasia?: string;
    Contato?: Contato;

    constructor(IdentificacaoPrestador: IdentificacaoPrestadorTomador, razao_social: string, endereco: Endereco, nome_fantasia: string, contato?: Contato,){
        this.IdentificacaoPrestador = IdentificacaoPrestador;
        this.RazaoSocial = razao_social;

        if (nome_fantasia !== ''){
            this.NomeFantasia = nome_fantasia;
        }
        
        this.Endereco = endereco;

        if(contato){
            this.Contato = contato;            
        }

    }
}

class Tomador{
    IdentificacaoTomador: IdentificacaoPrestadorTomador;
    RazaoSocial: string
    Endereco?: Endereco;
    NomeFantasia?: string
    Contato?: object;

    constructor(IdentificacaoTomador: IdentificacaoPrestadorTomador, razao_social: string, endereco: Endereco, nome_fantasia: string, contato?: Contato ){
        this.IdentificacaoTomador = IdentificacaoTomador;
        this.RazaoSocial = razao_social;

        if (nome_fantasia !== ''){
            this.NomeFantasia = nome_fantasia;
        }
        
        this.Endereco = endereco;

        if(contato){
            this.Contato = contato;            
        }

    }
}

class IdentificacaoPrestadorTomador{
    CpfCnpj: {
        Cnpj: string
    };
    InscricaoMunicipal?: string

    constructor(Cnpj: string, InscricaoMunicipal?: string){
        this.CpfCnpj = {
            Cnpj
        }

        this.CpfCnpj.Cnpj = Cnpj;

        if(InscricaoMunicipal){
            this.InscricaoMunicipal = InscricaoMunicipal;
        }
    }
}

export { Prestador, Tomador, IdentificacaoPrestadorTomador };