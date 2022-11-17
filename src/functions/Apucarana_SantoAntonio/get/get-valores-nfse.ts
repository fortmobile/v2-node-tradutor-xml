import { ValoresNfse } from "../../../models/Valores";
import { formatarValor } from "../formatar-valor";

async function getValoresNfse(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['nfse' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var base_calculo =  await formatarValor(base_path['nf' as jsonKeys]['valor_total' as jsonKeys2] as string);

    var aliquota =  await formatarValor(base_path['itens' as jsonKeys2]['lista' as jsonKeys]['aliquota_item_lista_servico'] as string);
    var valor_iss = await formatarValor(base_path['itens' as jsonKeys2]['lista' as jsonKeys]['valor_issrf'] as string);

    var desconto = await formatarValor(base_path['nf' as jsonKeys]['valor_desconto' as jsonKeys2] as string);

    var valor_liquido = base_calculo - desconto

    var valores_nfse = new ValoresNfse(base_calculo, aliquota, valor_iss, valor_liquido);

    return valores_nfse;

}

export { getValoresNfse }