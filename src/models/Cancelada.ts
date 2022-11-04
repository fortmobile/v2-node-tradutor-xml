class Cancelada{
    Confirmacao: {
        Pedido: {
            InfPedidoCancelamento: {
                IdentificacaoNfse: {
                    Numero: number;
                    CpfCnpj: {
                        Cnpj: string;
                    }
                    InscricaoMunicipal: string;
                    CodigoMunicipio: number;
                }
                CodigoCancelamento: number;
            }
        },
        DataHora: string
    }
    
    constructor(Numero: number, Cnpj: string, InscricaoMunicipal: string, CodigoMunicipio: number, CodigoCancelamento: number, DataHora: string){
        this.Confirmacao = {
                Pedido: {
                    InfPedidoCancelamento: {
                        IdentificacaoNfse: {
                            Numero,
                            CpfCnpj: {
                                Cnpj
                            },
                            InscricaoMunicipal,
                            CodigoMunicipio
                        },
                        CodigoCancelamento,
                    }
                },
                DataHora
        }

        this.Confirmacao.Pedido.InfPedidoCancelamento.IdentificacaoNfse.Numero = Numero;
        this.Confirmacao.Pedido.InfPedidoCancelamento.IdentificacaoNfse.CpfCnpj.Cnpj = Cnpj;
        this.Confirmacao.Pedido.InfPedidoCancelamento.IdentificacaoNfse.InscricaoMunicipal = InscricaoMunicipal;
        this.Confirmacao.Pedido.InfPedidoCancelamento.IdentificacaoNfse.CodigoMunicipio = CodigoMunicipio;
        this.Confirmacao.Pedido.InfPedidoCancelamento.CodigoCancelamento = CodigoCancelamento;
        this.Confirmacao.DataHora = DataHora;
    }
}

export { Cancelada }