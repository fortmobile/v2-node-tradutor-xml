import { ValoresNfse } from "../../../models/Valores";

async function getValoresNfse(json_object: object){
    type jsonKeys = keyof typeof json_object;
        
    var base_path = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['DadosNfse' as jsonKeys] as object;

    type jsonKeys2 = keyof typeof base_path;

    var base_calculo =  base_path['BaseCalculo' as jsonKeys2] as number;
    var aliquota =  base_path['Aliquota' as jsonKeys2] as string;
    
    if (aliquota == ''){
        var aliquota2 = 0;
    }
    else {
        var aliquota2 = base_path['Aliquota' as jsonKeys2] as number;
    }

    if(base_path['ValorIss' as jsonKeys2]){
        var valor_iss = base_path['ValorIss' as jsonKeys2] as number;
    }else{
        var valor_iss = 0;
    }

    var valor_liquido =  base_path['ValorLiquidoNfse' as jsonKeys2] as number;

    var valores_nfse = new ValoresNfse(base_calculo, aliquota2, valor_iss, valor_liquido);

    return valores_nfse;
}

export { getValoresNfse }