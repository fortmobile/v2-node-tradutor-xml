import { DeclaracaoPrestacaoServico } from "../../../models/DeclaracaoPrestacaoServico"
import {Servico} from "../../../models/Servico";
import {Prestador, Tomador} from "../../../models/PrestadorTomador"
import { Rps } from "../../../models/Rps";

async function getDeclaracao(json_object: object, servico: Servico, prestador: Prestador, tomador: Tomador){
    type jsonKeys = keyof typeof json_object;
    
    var base_path2 = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['DadosNfse' as jsonKeys] as object;    
    var base_path3 = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys] as object;
    var base_path4 = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['IdentificacaoNfse' as jsonKeys] as object;
      
    type jsonKeys2 = keyof typeof base_path2;
    type jsonKeys3 = keyof typeof base_path3;  
    type jsonKeys4 = keyof typeof base_path4;

    var competencia = base_path4['Competencia' as jsonKeys3] as string;
    
    if (base_path2['RegimeEspecialTributacao' as jsonKeys2]){
        var regime_especial_tributacao = base_path2['RegimeEspecialTributacao' as jsonKeys2] as number;
    }
    else{
        var regime_especial_tributacao = 6;
    }

    var optante_simples_nacional = base_path2['OptanteSimplesNacional' as jsonKeys2] as boolean;

    var incentivo_fiscal = base_path2['IncentivoFiscal' as jsonKeys2] as boolean;

    // RPS
    if (base_path2["RpsNumero" as jsonKeys2]){
        var rps_numero = base_path2["RpsNumero" as jsonKeys2] as number;
        var rps_serie = base_path2["RpsSerie" as jsonKeys2] as number;
        var rps_tipo = base_path2["RpsTipo" as jsonKeys2] as number;

        var rps_mes = (base_path2["RpsMes" as jsonKeys2]as string).toString();
        if (rps_mes.length == 1){
            rps_mes = '0' + rps_mes
        }

        var rps_dia = (base_path2["RpsDia" as jsonKeys2]as string).toString();
        if (rps_dia.length == 1){
            rps_dia = '0' + rps_dia
        }

        var rps_data = `${(base_path2["RpsAno" as jsonKeys2] as string).toString()}${rps_mes}${rps_dia}`
        var rps_status = base_path4["StatusNfse" as jsonKeys4] as number;

        var rps = new Rps(rps_numero, rps_serie, rps_tipo, rps_data, rps_status);

        var declaracao_prestacao = new DeclaracaoPrestacaoServico(competencia, servico, prestador, tomador, regime_especial_tributacao, optante_simples_nacional, incentivo_fiscal, rps);
    }
    else{
        var declaracao_prestacao = new DeclaracaoPrestacaoServico(competencia, servico, prestador, tomador, regime_especial_tributacao, optante_simples_nacional, incentivo_fiscal)
    }
    
    
    return(declaracao_prestacao);
}

export {getDeclaracao}