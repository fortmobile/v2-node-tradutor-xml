import { ValoresServico } from '../../../models/Valores';
import { Servico } from '../../../models/Servico';
import { formatarValor } from '../formatar-valor';

async function getServico(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['nfse' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var valor_servico = await formatarValor(base_path['nf'as jsonKeys]['valor_total' as jsonKeys2] as string);
    var valor_deducoes = await formatarValor(base_path['itens'as jsonKeys2]['lista' as jsonKeys2]['valor_deducao' as jsonKeys2] as string);
    var valor_pis = await formatarValor(base_path['nf'as jsonKeys]['valor_pis' as jsonKeys2] as string);
    var valor_cofins = await formatarValor(base_path['nf'as jsonKeys]['valor_cofins' as jsonKeys2] as string);
    var valor_inss = await formatarValor(base_path['nf'as jsonKeys]['valor_inss' as jsonKeys2] as string);
    var valor_ir = await formatarValor(base_path['nf'as jsonKeys]['valor_ir' as jsonKeys2] as string);
    var valor_csll = await formatarValor(base_path['nf'as jsonKeys]['valor_contribuicao_social' as jsonKeys2] as string);
    var outras_retencoes = 0;
    var valor_iss = await formatarValor(base_path['itens' as jsonKeys2]['lista' as jsonKeys]['valor_issrf' as jsonKeys2] as string);
    var aliquota = await formatarValor(base_path['itens' as jsonKeys2]['lista' as jsonKeys]['aliquota_item_lista_servico' as jsonKeys2] as string);
    
    var desc_inc = 0;
    var desc_cond = await formatarValor(base_path['nf'as jsonKeys2]['valor_desconto' as jsonKeys2] as string);

    var valores_servico = new ValoresServico(valor_servico, valor_deducoes, valor_pis, valor_cofins, valor_inss, valor_ir, valor_csll, outras_retencoes, valor_iss, aliquota, desc_inc, desc_cond)

    if (valor_iss != 0){
        var iss_retido = true;
    }
    else {
        var iss_retido = false;
    }

    var item_lista_servico = (base_path['itens' as jsonKeys2]['lista' as jsonKeys2]['codigo_item_lista_servico' as jsonKeys2] as string).toString();
    
    var discriminacao = base_path['itens' as jsonKeys2]['lista' as jsonKeys2]['descritivo' as jsonKeys2] as string;

    var cod_municipio = base_path['itens' as jsonKeys2]['lista' as jsonKeys2]['codigo_local_prestacao_servico' as jsonKeys2] as number;

    if (base_path['tomador' as jsonKeys2]['tipo' as jsonKeys2] as string == 'E'){
        var exigibilidade_iss = 4;
    }
    else{
        var exigibilidade_iss = 1;
    }


    if(base_path['itens' as jsonKeys2]['lista' as jsonKeys2]['tributa_municipio_prestador' as jsonKeys2] as string == 'S' || base_path['itens' as jsonKeys2]['lista' as jsonKeys2]['tributa_municipio_prestador' as jsonKeys2] as number == 1){
        var municipio_incidencia = base_path['prestador' as jsonKeys2]['cidade' as jsonKeys2] as number;
    }
    else {
        var municipio_incidencia = cod_municipio;
    }

    var servico = new Servico(valores_servico, iss_retido, item_lista_servico, discriminacao, cod_municipio, exigibilidade_iss, municipio_incidencia)

    return(servico) as Servico;


}


export { getServico }