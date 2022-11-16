import { ValoresServico } from '../../../models/Valores';
import { Servico } from '../../../models/Servico';

async function getServico(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['nfse' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var valor_servico = Number((base_path['nf'as jsonKeys]['valor_total' as jsonKeys2] as string).replace(',', '.'));
    var valor_deducoes = Number((base_path['itens'as jsonKeys2]['lista' as jsonKeys2]['valor_deducao' as jsonKeys2] as string).replace(',', '.'));
    var valor_pis = Number((base_path['nf'as jsonKeys]['valor_pis' as jsonKeys2] as string).replace(',', '.'));
    var valor_cofins = Number((base_path['nf'as jsonKeys]['valor_cofins' as jsonKeys2] as string).replace(',', '.'));
    var valor_inss = Number((base_path['nf'as jsonKeys]['valor_inss' as jsonKeys2] as string).replace(',', '.'));
    var valor_ir = Number((base_path['nf'as jsonKeys]['valor_ir' as jsonKeys2] as string).replace(',', '.'));
    var valor_csll = Number((base_path['nf'as jsonKeys]['valor_contribuicao_social' as jsonKeys2] as string).replace(',', '.'));
    var outras_retencoes = 0;
    var valor_iss = Number((base_path['itens' as jsonKeys2]['lista' as jsonKeys]['valor_issrf' as jsonKeys2] as string).replace(',', '.'));
    var aliquota = Number((base_path['itens' as jsonKeys2]['lista' as jsonKeys]['aliquota_item_lista_servico' as jsonKeys2] as string).replace(',', '.'));
    
    var desc_inc = 0;
    var desc_cond = Number((base_path['nf'as jsonKeys2]['valor_desconto' as jsonKeys2] as string).replace(',', '.'));

    var valores_servico = new ValoresServico(valor_servico, valor_deducoes, valor_pis, valor_cofins, valor_inss, valor_ir, valor_csll, outras_retencoes, valor_iss, aliquota, desc_inc, desc_cond)

    console.log(valores_servico)
    return(valores_servico)



}


export { getServico }