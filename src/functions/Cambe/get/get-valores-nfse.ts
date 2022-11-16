import { ValoresNfse } from "../../../models/Valores";

async function getValoresNfse(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['espelhoNFSe' as jsonKeys]['NFSe' as jsonKeys]['demaisDados' as jsonKeys]
    type jsonKeys2 = keyof typeof base_path;

    var base_calculo = base_path['valorBaseCalculo' as jsonKeys2];

    var aliquota = base_path['aliquota' as jsonKeys2];

    var valor_iss = base_path['valorISS' as jsonKeys2] as number;
    
    var valor_liquido =  base_path['valorLiquidoNFSe' as jsonKeys2] as number;

    var valores_nfse = new ValoresNfse(base_calculo, aliquota, valor_iss, valor_liquido);

    return valores_nfse;

}

export { getValoresNfse }