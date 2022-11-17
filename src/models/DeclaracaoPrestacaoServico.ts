import { Servico } from "./Servico";
import { Prestador, Tomador } from "./PrestadorTomador"
import {Rps} from "./Rps"

class DeclaracaoPrestacaoServico{
    InfDeclaracaoPrestacaoServico: {
        Rps?: Rps
        Competencia: string;
        Servico: Servico;
        Prestador: Prestador;
        Tomador: Tomador;
        RegimeEspecialTributacao?: number;
        OptanteSimplesNacional: number; 
        IncentivoFiscal?: number
    }

    constructor(Competencia: string, Servico: Servico, Prestador: Prestador, Tomador: Tomador, RegimeEspecialTributacao: number | undefined, optante_simples_nacional: boolean, incentivo_fiscal: boolean | undefined, Rps?: Rps){
        this.InfDeclaracaoPrestacaoServico = {
            Competencia,
            Servico,
            Prestador,
            Tomador,
            OptanteSimplesNacional: 0
        }

        if(Rps){
            this.InfDeclaracaoPrestacaoServico.Rps = Rps;
        }

        this.InfDeclaracaoPrestacaoServico.Competencia = Competencia;
        this.InfDeclaracaoPrestacaoServico.Servico = Servico;
        this.InfDeclaracaoPrestacaoServico.Prestador = Prestador;
        this.InfDeclaracaoPrestacaoServico.Tomador = Tomador;
        
        if (RegimeEspecialTributacao !== undefined){
            this.InfDeclaracaoPrestacaoServico.RegimeEspecialTributacao = RegimeEspecialTributacao;
        }

        if (optante_simples_nacional == true){
            this.InfDeclaracaoPrestacaoServico.OptanteSimplesNacional = 1;
        }
        else{
            this.InfDeclaracaoPrestacaoServico.OptanteSimplesNacional = 2;
        }

        if (incentivo_fiscal == true){
            this.InfDeclaracaoPrestacaoServico.IncentivoFiscal = 1;
        }
        else if (incentivo_fiscal == false){
            this.InfDeclaracaoPrestacaoServico.IncentivoFiscal = 2;
        }

    }
}

export { DeclaracaoPrestacaoServico }