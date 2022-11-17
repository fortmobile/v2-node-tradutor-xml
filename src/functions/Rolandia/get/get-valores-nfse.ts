import { ValoresNfse } from "../../../models/Valores";

async function getValoresNfse(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['CompNfse' as jsonKeys]['Nfse'as jsonKeys]['InfNfse' as jsonKeys]['Servico' as jsonKeys]['Valores' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var base_calculo =  base_path['BaseCalculo' as jsonKeys2] as number;
    var aliquota =  base_path['Aliquota' as jsonKeys2] as number;

    var valor_iss = base_path['ValorIss' as jsonKeys2] as number;

    var valor_liquido =  base_path['ValorLiquidoNfse' as jsonKeys2] as number;

    var valores_nfse = new ValoresNfse(base_calculo, aliquota, valor_iss, valor_liquido);

    return valores_nfse;
}

export { getValoresNfse }