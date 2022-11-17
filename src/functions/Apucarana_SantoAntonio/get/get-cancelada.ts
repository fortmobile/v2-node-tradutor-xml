import { Cancelada } from "../../../models/Cancelada"

async function getCancelada(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['nfse' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;
    
    var numero = base_path['nf' as jsonKeys2]['numero_nfse' as jsonKeys2] as number;

    var cnpj = base_path['prestador' as jsonKeys2]['cpfcnpj' as jsonKeys2] as string;
    cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');

    var codigo_cancelamento = 2;
    
    var data = base_path['nf' as jsonKeys2]['data_nfse' as jsonKeys2] as string;
    var hora = base_path['nf' as jsonKeys2]['hora_nfse' as jsonKeys2] as string;
    var data_hora = data.substr(6) + '-' + data.substr(3, 2) + '-' + data.substr(0, 2) + 'T' + hora


    var cancelada = new Cancelada(numero, cnpj, undefined, undefined, codigo_cancelamento, data_hora);

    return cancelada;
    
}

export {getCancelada}