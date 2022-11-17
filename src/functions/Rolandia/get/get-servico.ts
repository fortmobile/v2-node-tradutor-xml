import { ValoresServico } from '../../../models/Valores';
import { Servico } from '../../../models/Servico';

async function getServico(json_object: object){
    try {
        type jsonKeys = keyof typeof json_object;
        var base_path = json_object['CompNfse' as jsonKeys]['Nfse'as jsonKeys]['InfNfse' as jsonKeys]['Servico' as jsonKeys] as object;
        type jsonKeys2 = keyof typeof base_path;

        
        var valor_servico =  base_path['Valores' as jsonKeys2]['ValorServicos' as jsonKeys2] as number;
        var valor_deducoes = base_path['Valores' as jsonKeys2]['ValorDeducoes' as jsonKeys2] as number;
        var valor_pis = base_path['Valores' as jsonKeys2]['ValorPis' as jsonKeys2] as number;
        var valor_cofins = base_path['Valores' as jsonKeys2]['ValorCofins' as jsonKeys2] as number;
        var valor_inss = base_path['Valores' as jsonKeys2]['ValorInss' as jsonKeys2] as number;
        var valor_ir = base_path['Valores' as jsonKeys2]['ValorIr' as jsonKeys2] as number;
        var valor_csll = base_path['Valores' as jsonKeys2]['ValorCsll' as jsonKeys2] as number;
        var outras_retencoes = base_path['Valores' as jsonKeys2]['OutrasRetencoes' as jsonKeys2] as number;

        var valor_iss = base_path['Valores' as jsonKeys2]['ValorIss' as jsonKeys2] as number;

        var aliquota = base_path['Valores' as jsonKeys2]['Aliquota' as jsonKeys2] as number;
        
        var desc_inc = base_path['Valores' as jsonKeys2]['DescontoIncondicionado' as jsonKeys2] as number;
        var desc_cond = base_path['Valores' as jsonKeys2]['DescontoCondicionado' as jsonKeys2] as number;

        var valores_servico = new ValoresServico(valor_servico, valor_deducoes, valor_pis, valor_cofins, valor_inss, valor_ir, valor_csll, outras_retencoes, valor_iss, aliquota, desc_inc, desc_cond)


        var iss_retido = base_path['Valores' as jsonKeys2]['IssRetido' as jsonKeys2] as number;
        if (iss_retido == 2){
            var iss_retido2 = false;
        }
        else {
            var iss_retido2 = true;
        }
        
        var item_lista_servico = (base_path['CodigoTributacaoMunicipio' as jsonKeys2] as string).toString();

        var discriminacao = base_path['Discriminacao' as jsonKeys2] as string;

        var cod_municipio = base_path['CodigoMunicipio' as jsonKeys2] as number;



        var municipio_incidencia = undefined;

        var servico = new Servico(valores_servico, iss_retido2, item_lista_servico, discriminacao, cod_municipio, undefined, municipio_incidencia)

        return(servico) as Servico;

        
    } catch (error) {
        return error;
    }
}

export { getServico }