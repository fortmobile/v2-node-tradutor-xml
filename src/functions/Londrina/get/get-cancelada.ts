import { Cancelada } from "../../../models/Cancelada"

async function getCancelada(json_object: object){
    type jsonKeys = keyof typeof json_object;
        
    var base_path2 = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['IdentificacaoNfse' as jsonKeys] as object;
    var base_path3 = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['DadosNfse' as jsonKeys] as object;

    type jsonKeys2 = keyof typeof base_path2;
    type jsonKeys3 = keyof typeof base_path3;

    var numero = base_path2['Numero' as jsonKeys2] as number;
    var cnpj = base_path3['PrestadorCnpj' as jsonKeys3] as string;
    cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
    var inscricao_municipal = (base_path3['PrestadorInscricaoMunicipal' as jsonKeys3] as string).replace('-', '');;
    var cod_municipio = base_path3['OrgaoGeradorMunicipio' as jsonKeys3] as number;
    var codigo_cancelamento = 2;
    var data_hora = base_path2["DataEmissao" as jsonKeys2] as string;

    var cancelada = new Cancelada(numero, cnpj, inscricao_municipal, cod_municipio, codigo_cancelamento, data_hora);

    return cancelada;
}

export {getCancelada}