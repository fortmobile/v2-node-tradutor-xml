class ValoresNfse{
    BaseCalculo: number;
    Aliquota: number;
    ValorIss: number;
    ValorLiquidoNfse: number;

    constructor(base_calculo: number, aliquota: number, valor_iss: number, valor_liquido_Nfse: number){
        this.BaseCalculo = base_calculo;
        this.Aliquota = aliquota;
        this.ValorIss = valor_iss;
        this.ValorLiquidoNfse = valor_liquido_Nfse;
    }
}

class ValoresServico{
    ValorServicos: number;
    ValorDeducoes: number;
    ValorPis: number;
    ValorCofins: number;
    ValorInss: number;
    ValorIr: number;
    ValorCsll: number;
    OutrasRetencoes: number;
    ValorIss: number;
    Aliquota: number;
    DescontoIncondicionado: number;
    DescontoCondicionado: number;

    constructor(servicos: number, deducoes: number, pis: number, cofins: number, inss: number, ir: number, csll: number, outras_retencoes: number, iss: number, aliquota: number,
        desc_incondicionado: number, desc_condicionado: number){
        this.ValorServicos = servicos;
        this.ValorDeducoes = deducoes;
        this.ValorPis = pis;
        this.ValorCofins = cofins;
        this.ValorInss = inss;
        this.ValorIr = ir;
        this.ValorCsll = csll;
        this.OutrasRetencoes = outras_retencoes;
        this.ValorIss = iss;
        this.Aliquota = aliquota;
        this.DescontoIncondicionado = desc_incondicionado;
        this.DescontoCondicionado = desc_condicionado;
        
    }
}

export { ValoresNfse, ValoresServico };