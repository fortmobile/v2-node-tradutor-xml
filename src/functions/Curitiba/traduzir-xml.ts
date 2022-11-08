var fs = require('fs');
const path = require('path')
const { XMLBuilder } = require("fast-xml-parser");

import {parseXml} from './parse-xml';
import { mudarDataTypes } from "./mudar-dataTypes";
import { dividirXML } from './dividir-xml';
import { getValoresNfse } from './get/get-valores-nfse';
import { getPrestador } from './get/get-prestador';
import { getTomador } from './get/get-tomador';
import { getServico } from './get/get-servico';
import { getDeclaracao } from './get/get-declaracao';
import { Servico } from '../../models/Servico';
import { Prestador, Tomador } from '../../models/PrestadorTomador';
import { getOrgaoGerador } from './get/get-orgao-gerador';
import { getInfNfse } from './get/get-infnse';
import { ValoresNfse } from '../../models/Valores';
import { Xml_Nfse } from '../../models/Xml-Nfse';

async function traduzirXmlCuritiba(xml_file_path: string, xml_file_name: string, folder_name: string){
    try {
        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;
        var array_xmls = await dividirXML(parsed_xml);


        for(let i = 0; i < array_xmls.length; i++){
            var valores_nfse = await getValoresNfse(array_xmls[i]) as ValoresNfse;

            var prestador = await getPrestador(array_xmls[i]) as Prestador;
            console.log(prestador)
            var tomador = await getTomador(array_xmls[i]) as Tomador;

            var servico = await getServico(array_xmls[i]) as Servico;
            
            var declaracao_prestacao = await getDeclaracao(array_xmls[i], servico, prestador, tomador);

            var orgao_gerador = await getOrgaoGerador(array_xmls[i]);

            var infnfse = await getInfNfse(array_xmls[i], valores_nfse, prestador, orgao_gerador, declaracao_prestacao);
            
            var xml_nfse = new Xml_Nfse(infnfse);

            const builder = new XMLBuilder();
            var xmlContent = builder.build(xml_nfse).toString()
    
            xmlContent = await xmlContent.replace('<Nfse>', '<Nfse versao="2.01">')
            xmlContent = await xmlContent.replace('<ConsultarNfseServicoPrestadoResposta>', '<ConsultarNfseServicoPrestadoResposta xmlns="http://www.abrasf.org.br/nfse.xsd">')
            xmlContent = await xmlContent.replace('<NfseCancelamento>', '<NfseCancelamento versao="2.01">')
            
            fs.writeFileSync(`${folder_name}/${prestador.IdentificacaoPrestador.CpfCnpj.Cnpj}-${infnfse.Numero}.xml`, xmlContent);
        }

        await fs.unlinkSync(path.join(__dirname, new_xml));
        return({message: 'xml convertido com sucesso'});




    } catch (error) {
        console.log({message: 'erro ao converter xml'})
    }
}


traduzirXmlCuritiba('../../../xmls/curitiba/curitiba-canc.xml', 'aaa', 'result')