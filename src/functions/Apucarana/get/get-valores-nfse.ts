import { ValoresNfse } from "../../../models/Valores";

async function getValoresNfse(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['nfse' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var base_calculo =  Number((base_path['nf' as jsonKeys]['valor_total' as jsonKeys2] as string).replace(',', '.'));

    var aliquota =  Number((base_path['itens' as jsonKeys2]['lista' as jsonKeys]['aliquota_item_lista_servico'] as string).replace(',', '.'));
    var valor_iss =  Number((base_path['itens' as jsonKeys2]['lista' as jsonKeys]['valor_issrf'] as string).replace(',', '.'));

    var desconto = Number((base_path['nf' as jsonKeys]['valor_desconto' as jsonKeys2] as string).replace(',', '.'));

    var valor_liquido = base_calculo - desconto

    var valores_nfse = new ValoresNfse(base_calculo, aliquota, valor_iss, valor_liquido);

    return valores_nfse;

}

export { getValoresNfse }