import { ValoresServico } from "../../../models/Valores";

async function getServico(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['espelhoNFSe' as jsonKeys]['NFSe' as jsonKeys]['demaisDados' as jsonKeys]
    type jsonKeys2 = keyof typeof base_path;

    var valor_servico = base_path['servicoValor' as jsonKeys2] as number;
    var valor_deducoes = base_path['valorDeducao' as jsonKeys2] as number;
    var valor_pis = base_path['valorPIS' as jsonKeys2] as number;
    var valor_cofins = base_path['valorCOFINS' as jsonKeys2] as number;
    var valor_inss = base_path['valorINSS' as jsonKeys2] as number;
    var valor_ir = base_path['valorIR' as jsonKeys2] as number;
    var valor_csll = base_path['valorCSLL' as jsonKeys2] as number;
    var outras_retencoes = 0;
    
    if (base_path['ISSRetido'] == true){
        var valor_iss = base_path['valorISSRetido' as jsonKeys2] as number; // CONFERIR BRUNO
        var iss_retido = true;
    }
    else {
        var valor_iss = 0;
        var iss_retido = false;
    }

    var aliquota = base_path['aliquota' as jsonKeys2] as number;
    var desc_inc = 0;
    var desc_cond = 0;

    var valores_servico = new ValoresServico(valor_servico, valor_deducoes, valor_pis, valor_cofins, valor_inss, valor_ir, valor_csll, outras_retencoes, valor_iss, aliquota, desc_inc, desc_cond)

    var item_lista_servico = (base_path['servicoISS' as jsonKeys2] as string).toString();

    var discriminacao = base_path['servicoDiscriminacao'] as string;

    var cod_municipio = base_path['municipioPrestacao'] as number;

    // VER SE TIPO DEDUÇÃO TEM RELAÇAO COM EXIGI ISS

    return servico;

}

export { getServico }