import { DeclaracaoPrestacaoServico } from "../../../models/DeclaracaoPrestacaoServico"
import {Servico} from "../../../models/Servico";
import {Prestador, Tomador} from "../../../models/PrestadorTomador"
import { Rps } from "../../../models/Rps";

async function getDeclaracao(json_object: object, servico: Servico, prestador: Prestador, tomador: Tomador){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['CompNfse' as jsonKeys]['Nfse'as jsonKeys]['InfNfse' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var competencia = base_path['Competencia' as jsonKeys2];

    var optante_simples_nacional = base_path['OptanteSimplesNacional' as jsonKeys2] as number;
    if (optante_simples_nacional == 1){
        var optante_simples_nacional2 = true;
    }
    else {
        var optante_simples_nacional2 = false;
    }

    var incentivo_fiscal = base_path['IncentivadorCultural' as jsonKeys2] as number;
    if (incentivo_fiscal == 1){
        var incentivo_fiscal2 = true;
    }
    else {
        var incentivo_fiscal2 = false;
    }

    var declaracao_prestacao = new DeclaracaoPrestacaoServico(competencia, servico, prestador, tomador, undefined, optante_simples_nacional2, incentivo_fiscal2);

    return declaracao_prestacao;
}

export {getDeclaracao}