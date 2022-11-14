import { ValoresServico } from '../../../models/Valores';
import { Servico } from '../../../models/Servico';

async function getServico(json_object: object){
    try {
        type jsonKeys = keyof typeof json_object;
        var base_path = json_object['Nfse' as jsonKeys]['InfNfse' as jsonKeys]['Servico' as jsonKeys];
        type jsonKeys2 = keyof typeof base_path;

        var valor_servico = base_path['Valores' as jsonKeys2]['ValorServicos'] as number;
        var valor_deducoes = base_path['Valores' as jsonKeys2]['ValorDeducoes'] as number;
        var valor_pis = base_path['Valores' as jsonKeys2]['ValorPis'] as number;
        var valor_cofins = base_path['Valores' as jsonKeys2]['ValorCofins'] as number;
        var valor_inss = base_path['Valores' as jsonKeys2]['ValorInss'] as number;
        var valor_ir = base_path['Valores' as jsonKeys2]['ValorIr'] as number;
        var valor_csll = base_path['Valores' as jsonKeys2]['ValorCsll'] as number;
        var outras_retencoes = base_path['Valores' as jsonKeys2]['OutrasRetencoes'] as number;
        var valor_iss = base_path['Valores' as jsonKeys2]['ValorIssRetido'] as number;
        var aliquota = base_path['Valores' as jsonKeys2]['Aliquota'] as number;
        var desc_inc = base_path['Valores' as jsonKeys2]['DescontoIncondicionado'] as number;
        var desc_cond = base_path['Valores' as jsonKeys2]['DescontoCondicionado'] as number;

        var valores_servico = new ValoresServico(valor_servico, valor_deducoes, valor_pis, valor_cofins, valor_inss, valor_ir, valor_csll, outras_retencoes, valor_iss, aliquota, desc_inc, desc_cond)

        var iss_retido1 = base_path['Valores' as jsonKeys2]['IssRetido'] as number;
        if (iss_retido1 = 1){
            var iss_retido2 = true;
        }
        else {
            var iss_retido2 = false;
        }
        
        if (base_path['ItemListaServico']){
            var item_lista_servico = (base_path['ItemListaServico'] as string).toString();
        } else {
            var item_lista_servico = (base_path['CodigoCnae'] as string).toString()
        }


        var discriminacao = base_path['Discriminacao'] as string;

        var cod_municipio = base_path['CodigoMunicipio'] as number;

        var exi_iss = base_path['NaturezaOperacao' as jsonKeys2] as number;
        if (exi_iss = 1){
            var exigibilidade_iss = 1
        }
        else if (exi_iss = 2){
            var exigibilidade_iss = 4
        }
        else if (exi_iss = 3){
            var exigibilidade_iss = 3
        }
        else if (exi_iss = 4){
            var exigibilidade_iss = 5
        }
        else if (exi_iss = 5){
            var exigibilidade_iss = 6
        }
        else if (exi_iss = 6){
            var exigibilidade_iss = 7
        }
        else{
            var exigibilidade_iss = 0
        }

        // ver se é do exterior
        if (json_object['Nfse' as jsonKeys]['InfNfse' as jsonKeys]['NaturezaOperacao' as jsonKeys] == 2){
            var municipio_incidencia = json_object['Nfse' as jsonKeys]['InfNfse' as jsonKeys]['TomadorServico' as jsonKeys2]['Endereco' as jsonKeys2]['CodigoMunicipio' as jsonKeys2] as number;
            if (municipio_incidencia == 0){
                municipio_incidencia = 9999999;
                exigibilidade_iss = 4;
            }
        }
        else{
            var municipio_incidencia = json_object['Nfse' as jsonKeys]['InfNfse' as jsonKeys]['PrestadorServico' as jsonKeys2]['Endereco' as jsonKeys2]['CodigoMunicipio' as jsonKeys2] as number;

        }

        var servico = new Servico(valores_servico, iss_retido2, item_lista_servico, discriminacao, cod_municipio, exigibilidade_iss, municipio_incidencia)

        return servico;

    } catch (error) {
        
    }
}

export { getServico }