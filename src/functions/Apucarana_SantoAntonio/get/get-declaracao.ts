import { DeclaracaoPrestacaoServico } from "../../../models/DeclaracaoPrestacaoServico"
import {Servico} from "../../../models/Servico";
import {Prestador, Tomador} from "../../../models/PrestadorTomador";
import { Rps } from "../../../models/Rps";

async function getDeclaracao(json_object: object, servico: Servico, prestador: Prestador, tomador: Tomador){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['nfse' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var data = base_path['nf' as jsonKeys2]['data_nfse' as jsonKeys2] as string;
    var competencia = data.substr(6) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2)

    var regime_especial_tributacao = 6;

    var optante_simples_nacional = true;

    var incentivo_fiscal = undefined;


    var declaracao_prestacao = new DeclaracaoPrestacaoServico(competencia, servico, prestador, tomador, regime_especial_tributacao, optante_simples_nacional, incentivo_fiscal);
    return declaracao_prestacao;


    return('ok')
}


export {getDeclaracao}
