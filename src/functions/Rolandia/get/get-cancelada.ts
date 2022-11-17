import { Cancelada } from "../../../models/Cancelada"

async function getCancelada(json_object: object){
    type jsonKeys = keyof typeof json_object;        
    var base_path = json_object['CompNfse' as jsonKeys]['NfseCancelamento' as jsonKeys]['Confirmacao' as jsonKeys2] as object;
    type jsonKeys2 = keyof typeof base_path;

    var numero = base_path['Pedido' as jsonKeys2]['InfPedidoCancelamento' as jsonKeys2]['IdentificacaoNfse' as jsonKeys2]['Numero' as jsonKeys2] as number;
    var cnpj = base_path['Pedido' as jsonKeys2]['InfPedidoCancelamento' as jsonKeys2]['IdentificacaoNfse' as jsonKeys2]['Cnpj' as jsonKeys2] as string;
    cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
    
    var inscricao_municipal = (base_path['Pedido' as jsonKeys2]['InfPedidoCancelamento' as jsonKeys2]['IdentificacaoNfse' as jsonKeys2]['InscricaoMunicipal' as jsonKeys2] as string).replace('-', '');
    
    var cod_municipio = base_path['Pedido' as jsonKeys2]['InfPedidoCancelamento' as jsonKeys2]['IdentificacaoNfse' as jsonKeys2]['CodigoMunicipio' as jsonKeys2] as number;
    var codigo_cancelamento = 2;

    var data_hora = base_path['InfConfirmacaoCancelamento' as jsonKeys2]['DataHora' as jsonKeys2] as string;

    var cancelada = new Cancelada(numero, cnpj, inscricao_municipal, cod_municipio, codigo_cancelamento, data_hora);

    return cancelada;
}

export {getCancelada}