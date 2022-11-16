import { DeclaracaoPrestacaoServico } from "../../../models/DeclaracaoPrestacaoServico";
import { InfNfse } from "../../../models/InfNfse";
import { OrgaoGerador } from "../../../models/OrgaoGerador";
import { Prestador } from "../../../models/PrestadorTomador";
import { ValoresNfse } from "../../../models/Valores";

async function getInfNfse(json_object: object, valores_nfse: ValoresNfse, prestador: Prestador, orgao_gerador: OrgaoGerador | undefined, declaracao_prestacao_servico: DeclaracaoPrestacaoServico){    
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['nfse' as jsonKeys]['nf'as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var numero = base_path['numero_nfse' as jsonKeys2] as number;
    var codigo_verificacao = base_path['cod_verificador_autenticidade' as jsonKeys2] as string;

    var data = base_path['data_nfse' as jsonKeys2] as string;
    var data_emissao = data.substr(6) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2)


    var valor_credito = 0
    
    var infnfse = new InfNfse(numero, codigo_verificacao, data_emissao, valores_nfse, valor_credito, prestador, orgao_gerador, declaracao_prestacao_servico);

    return infnfse;
}

export {getInfNfse}