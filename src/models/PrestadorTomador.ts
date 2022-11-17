import {Endereco} from "./Endereco";
import {Contato} from "./Contato"

class Prestador{
    IdentificacaoPrestador: IdentificacaoPrestadorTomador;
    RazaoSocial?: string;
    Endereco: Endereco;
    NomeFantasia?: string;
    Contato?: Contato;

    constructor(IdentificacaoPrestador: IdentificacaoPrestadorTomador, razao_social: string, endereco: Endereco, nome_fantasia: string | undefined, contato?: Contato,){
        this.IdentificacaoPrestador = IdentificacaoPrestador;
        
        if (razao_social !== ''){
            this.RazaoSocial = razao_social;
        }

        if (nome_fantasia !== '' && nome_fantasia !== undefined){
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
        Cnpj?: string
        Cpf?: string
    };
    InscricaoMunicipal?: string

    constructor(CnpjCpf: string, InscricaoMunicipal?: string){
        this.CpfCnpj = {
        }

        if (CnpjCpf.length == 14){
            this.CpfCnpj.Cnpj = CnpjCpf;
        }
        else if (CnpjCpf.length == 11){
            this.CpfCnpj.Cpf = CnpjCpf;
        }
        

        if(InscricaoMunicipal){
            this.InscricaoMunicipal = InscricaoMunicipal;
        }
    }
}

export { Prestador, Tomador, IdentificacaoPrestadorTomador };