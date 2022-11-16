import { DeclaracaoPrestacaoServico } from "../../../models/DeclaracaoPrestacaoServico"
import {Servico} from "../../../models/Servico";
import {Prestador, Tomador} from "../../../models/PrestadorTomador"
import { Rps } from "../../../models/Rps";


async function getDeclaracao(json_object: object, servico: Servico, prestador: Prestador, tomador: Tomador) {
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['espelhoNFSe' as jsonKeys]['NFSe' as jsonKeys]['identificacaoNFSe' as jsonKeys];
    type jsonKeys2 = keyof typeof base_path;

    var competencia = base_path['dataEmissao' as jsonKeys2] as string;

    var regime_especial_tributacao = 6;

    var optante_simples_nacional = base_path['demaisDados' as jsonKeys2]['optanteSimplesNacional' as jsonKeys2] as boolean;

    var incentivo_fiscal = base_path['demaisDados' as jsonKeys2]['incentivoFiscal' as jsonKeys2] as boolean;

    var declaracao_prestacao = new DeclaracaoPrestacaoServico(competencia, servico, prestador, tomador, regime_especial_tributacao, optante_simples_nacional, incentivo_fiscal)

    return declaracao_prestacao;
}

export { getDeclaracao }