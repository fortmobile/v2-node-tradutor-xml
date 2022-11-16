import { Cancelada } from "../../../models/Cancelada"

async function getCancelada(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['espelhoNFSe' as jsonKeys]['NFSe'as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var numero = base_path['identificacaoNFSe' as jsonKeys]['numero' as jsonKeys2] as number;
    var cnpj = base_path['dadosNFSe' as jsonKeys2]['dadosPrestador' as jsonKeys2]['prestadorCNPJ'] as string;
    cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
    
    var inscricao_municipal = (base_path['dadosNFSe' as jsonKeys2]['dadosPrestador' as jsonKeys2]['prestadorCMC']as string).replace('-', '');;
    var cod_municipio = base_path['demaisDados' as jsonKeys2]['municipioOrgaoGerador'] as number;
    var codigo_cancelamento = 2;
    
    var data_hora = (base_path['identificacaoNFSe' as jsonKeys2]["dataEmissao" as jsonKeys2] as string) + 'T00:00:00';

    var cancelada = new Cancelada(numero, cnpj, inscricao_municipal, cod_municipio, codigo_cancelamento, data_hora);

    return cancelada;
}

export {getCancelada}