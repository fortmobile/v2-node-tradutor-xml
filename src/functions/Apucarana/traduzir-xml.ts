import fs from 'fs'
const { XMLBuilder } = require("fast-xml-parser");

import { DeclaracaoPrestacaoServico } from '../../models/DeclaracaoPrestacaoServico';
import { Prestador, Tomador } from '../../models/PrestadorTomador';
import { Xml_Nfse } from '../../models/Xml-Nfse';
import { parseXml } from "../Gerais/parse-xml";
import { statusNfse } from './get/status-nfse';
import { getCancelada } from './get/get-cancelada';
import { getDeclaracao } from './get/get-declaracao';
import { getInfNfse } from './get/get-infnfse';
import { getPrestador } from './get/get-prestador';
import { getServico } from './get/get-servico';
import { getTomador } from './get/get-tomador';
import { getValoresNfse } from "./get/get-valores-nfse";
import { mudarDataTypes } from "./mudar-dataTypes";


async function traduzirXmlApucarana(xml_file_path: string, xml_file_name: string, folder_name: string) {
    try {
        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;

        var valores_nfse = await getValoresNfse(parsed_xml);

        var prestador = await getPrestador(parsed_xml) as Prestador;
        var tomador = await getTomador(parsed_xml)as Tomador;
        
        var servico = await getServico(parsed_xml);

        var declaracao_prestacao = await getDeclaracao(parsed_xml, servico, prestador, tomador) as DeclaracaoPrestacaoServico;

        var orgao_gerador = undefined;

        var infnfse = await getInfNfse(parsed_xml, valores_nfse, prestador, orgao_gerador, declaracao_prestacao);
        
        var cancelada = await statusNfse(parsed_xml) as boolean;
        
        if (cancelada == true){
            var dados_cancelamento = await getCancelada(parsed_xml)
            var xml_nfse = new Xml_Nfse(infnfse, dados_cancelamento);
        }
        else{
            var xml_nfse = new Xml_Nfse(infnfse)
        }


        const builder = new XMLBuilder();
        var xmlContent = builder.build(xml_nfse).toString()

        xmlContent = await xmlContent.replace('<Nfse>', '<Nfse versao="2.01">')
        xmlContent = await xmlContent.replace('<ConsultarNfseServicoPrestadoResposta>', '<ConsultarNfseServicoPrestadoResposta xmlns="http://www.abrasf.org.br/nfse.xsd">')
        xmlContent = await xmlContent.replace('<NfseCancelamento>', '<NfseCancelamento versao="2.01">')
        
        fs.writeFileSync(`${folder_name}/${xml_file_name}`, xmlContent);
        
        fs.unlinkSync(new_xml);
        
        return({message: 'xml convertido com sucesso'});

    } catch(error){

        return({message: 'erro ao converter xml'})
    
    }
}

export { traduzirXmlApucarana }