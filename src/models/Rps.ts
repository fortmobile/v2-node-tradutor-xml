class Rps{
    IdentificacaoRps: {
        Numero: number,
        Serie: number,
        Tipo: number
    }
    DataEmissao: string
    Status: number 

    constructor(Numero: number, Serie: number, Tipo: number, DataEmissao: string, Status: number){
        this.IdentificacaoRps = {
            Numero,
            Serie,
            Tipo
        }
        DataEmissao
        Status

        this.IdentificacaoRps.Numero = Numero;
        this.IdentificacaoRps.Serie = Serie;
        this.IdentificacaoRps.Tipo = Tipo;
        this.DataEmissao = DataEmissao;
        this.Status = Status;
    }
}

export {Rps}