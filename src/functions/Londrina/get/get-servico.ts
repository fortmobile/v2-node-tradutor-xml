import { ValoresServico } from '../../../models/Valores';
import { Servico } from '../../../models/Servico';

async function getServico(json_object: object){
    try {
        type jsonKeys = keyof typeof json_object;
        
        var base_path = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['DadosNfse' as jsonKeys] as object;

        type jsonKeys2 = keyof typeof base_path;
        
        var valor_servico =  base_path['ValorServicos' as jsonKeys2] as number;
        var valor_deducoes = 0;
        var valor_pis = base_path['ValorPis' as jsonKeys2] as number;
        var valor_cofins = base_path['ValorCofins' as jsonKeys2] as number;
        var valor_inss = base_path['ValorInss' as jsonKeys2] as number;
        var valor_ir = base_path['ValorIr' as jsonKeys2] as number;
        var valor_csll = base_path['ValorCsll' as jsonKeys2] as number;
        var outras_retencoes = 0;
        if(base_path['ValorIss' as jsonKeys2]){
            var valor_iss = base_path['ValorIss' as jsonKeys2] as number;
        }else{
            var valor_iss = 0;
        }
        var aliquota = base_path['Aliquota' as jsonKeys2] as string;
        if (aliquota == ''){
            var aliquota2 = 0;
        }
        else {
            var aliquota2 = base_path['Aliquota' as jsonKeys2] as number;
        }
        var desc_inc = 0;
        var desc_cond = 0;
        var valores_servico = new ValoresServico(valor_servico, valor_deducoes, valor_pis, valor_cofins, valor_inss, valor_ir, valor_csll, outras_retencoes, valor_iss, aliquota2, desc_inc, desc_cond)

        var iss_retido = base_path['IssRetido' as jsonKeys2] as boolean;
        
        var item_lista_servico = (base_path['CodigoTributacaoMunicipio' as jsonKeys2] as string).toString();

        var discriminacao = base_path['Discriminacao' as jsonKeys2] as string;

        var cod_municipio = base_path['CodigoMunicipio' as jsonKeys2] as number;

        if (base_path['TomadorTipo' as jsonKeys2] as number == 5){
            var exigibilidade_iss = 4
        }
        else{
            var exigibilidade_iss = base_path['ExigibilidadeISS' as jsonKeys2] as number; 
        }

        var municipio_incidencia = base_path['MunicipioIncidencia' as jsonKeys2] as number;

        var servico = new Servico(valores_servico, iss_retido, item_lista_servico, discriminacao, cod_municipio, exigibilidade_iss, municipio_incidencia)

        return(servico) as Servico;
    } catch (error) {
        return error;
    }
}

export { getServico }