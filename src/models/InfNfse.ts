import { DeclaracaoPrestacaoServico } from "./DeclaracaoPrestacaoServico";
import { OrgaoGerador } from "./OrgaoGerador";
import { Prestador } from "./PrestadorTomador";
import { ValoresNfse } from "./Valores";

class InfNfse {
    Numero: number;
    CodigoVerificacao: string;
    DataEmissao: string;
    ValoresNfse: ValoresNfse;
    ValorCredito: number;
    PrestadorServico: Prestador;
    OrgaoGerador?: OrgaoGerador;
    DeclaracaoPrestacaoServico: DeclaracaoPrestacaoServico;

    constructor(numero: number, codigo_verificacao: string, data_emissao: string, valores_Nfse: ValoresNfse, valor_credito: number, 
    prestador_servico: Prestador, orgao_gerador: OrgaoGerador | undefined, declaracao_prestacao_servico: DeclaracaoPrestacaoServico){
        this.Numero = numero;
        this.CodigoVerificacao = codigo_verificacao;
        this.DataEmissao = data_emissao;
        this.ValoresNfse = valores_Nfse;
        this.ValorCredito = valor_credito;
        this.PrestadorServico = prestador_servico;

        if (orgao_gerador == undefined){
            this.OrgaoGerador = orgao_gerador;            
        }

        this.DeclaracaoPrestacaoServico = declaracao_prestacao_servico;
    }    
}

export { InfNfse };