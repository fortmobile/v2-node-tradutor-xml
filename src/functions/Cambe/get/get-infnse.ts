import { DeclaracaoPrestacaoServico } from "../../../models/DeclaracaoPrestacaoServico";
import { InfNfse } from "../../../models/InfNfse";
import { OrgaoGerador } from "../../../models/OrgaoGerador";
import { Prestador } from "../../../models/PrestadorTomador";
import { ValoresNfse } from "../../../models/Valores";


async function getInfNfse(json_object: object, valores_nfse: ValoresNfse, prestador: Prestador, orgao_gerador: OrgaoGerador, declaracao_prestacao_servico: DeclaracaoPrestacaoServico){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['espelhoNFSe' as jsonKeys]['NFSe' as jsonKeys]['identificacaoNFSe' as jsonKeys];
    type jsonKeys2 = keyof typeof base_path;

    var numero = base_path['numero' as jsonKeys2] as number;    
    var codigo_verificacao = base_path['codigoVerificacao' as jsonKeys2] as string;
    var data_emissao = base_path['dataEmissao' as jsonKeys2] as string;
    var valor_credito = 0;
    
    var infnfse = new InfNfse(numero, codigo_verificacao, data_emissao, valores_nfse, valor_credito, prestador, orgao_gerador, declaracao_prestacao_servico);

    return infnfse;
}

export {getInfNfse}