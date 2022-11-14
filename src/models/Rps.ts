class Rps{
    IdentificacaoRps: {
        Numero: number,
        Serie: number,
        Tipo: number
    }
    DataEmissaoRps: string
    Status: number 

    constructor(Numero: number, Serie: number, Tipo: number, DataEmissaoRps: string, Status: number){
        this.IdentificacaoRps = {
            Numero,
            Serie,
            Tipo
        }
        DataEmissaoRps
        Status

        this.IdentificacaoRps.Numero = Numero;
        this.IdentificacaoRps.Serie = Serie;
        this.IdentificacaoRps.Tipo = Tipo;
        this.DataEmissaoRps = DataEmissaoRps;
        this.Status = Status;
    }
}

export {Rps}