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

async function traduzirXmlCuritiba(xml_file_path: string, folder_name: string){
    try {
        var feedback: string[] = []


        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;
        var array_xmls = await dividirXML(parsed_xml);

        if (array_xmls.length == undefined){

            var valores_nfse = await getValoresNfse(array_xmls) as ValoresNfse;

            var prestador = await getPrestador(array_xmls) as Prestador;

            var tomador = await getTomador(array_xmls) as Tomador;

            var servico = await getServico(array_xmls) as Servico;
            
            var declaracao_prestacao = await getDeclaracao(array_xmls, servico, prestador, tomador);

            var orgao_gerador = await getOrgaoGerador(array_xmls);

            var infnfse = await getInfNfse(array_xmls, valores_nfse, prestador, orgao_gerador, declaracao_prestacao);
            
            var xml_nfse = new Xml_Nfse(infnfse);

            const builder = new XMLBuilder();
            var xmlContent = builder.build(xml_nfse).toString()
    
            xmlContent = await xmlContent.replace('<Nfse>', '<Nfse versao="2.01">')
            xmlContent = await xmlContent.replace('<ConsultarNfseServicoPrestadoResposta>', '<ConsultarNfseServicoPrestadoResposta xmlns="http://www.abrasf.org.br/nfse.xsd">')
            xmlContent = await xmlContent.replace('<NfseCancelamento>', '<NfseCancelamento versao="2.01">')
            
            fs.writeFileSync(`${folder_name}/${prestador.IdentificacaoPrestador.CpfCnpj.Cnpj}-${infnfse.Numero}.xml`, xmlContent);

            feedback.push(`${prestador.IdentificacaoPrestador.CpfCnpj.Cnpj}-${infnfse.Numero}.xml convertido com sucesso`)
        }
        else {

            for(let i = 0; i < array_xmls.length; i++){
                try{
                    var valores_nfse = await getValoresNfse(array_xmls[i]) as ValoresNfse;

                    var prestador = await getPrestador(array_xmls[i]) as Prestador;

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

                    feedback.push(`${prestador.IdentificacaoPrestador.CpfCnpj.Cnpj}-${infnfse.Numero}.xml convertido com sucesso`)

                } 

                catch(error){
                    var json_object = array_xmls[i]

                    type jsonKeys = keyof typeof json_object;
                    var base_path = json_object['Nfse' as jsonKeys]['InfNfse' as jsonKeys];
                    type jsonKeys2 = keyof typeof base_path;

                    var cnpj = base_path['PrestadorServico' as jsonKeys]['IdentificacaoPrestador' as jsonKeys2]['Cnpj' as jsonKeys2] as string;
                    cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');

                    var numero = base_path['Numero' as jsonKeys2];

                    feedback.push(`${cnpj}-${numero} erro ao converter xml`)
                }
            }
        }

        fs.unlinkSync(new_xml);
        
        return({message: feedback});

    } catch (error) {

        return({message: `erro ao converter xml`})
    }
}

export {traduzirXmlCuritiba}