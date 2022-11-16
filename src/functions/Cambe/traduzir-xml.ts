const fs = require('fs');
const { XMLBuilder } = require("fast-xml-parser");

import { Prestador, Tomador } from "../../models/PrestadorTomador";
import { Servico } from "../../models/Servico";
import { parseXml } from "../Gerais/parse-xml";
import { getDeclaracao } from "./get/get-declaracao";
import { getInfNfse } from "./get/get-infnse";
import { getOrgaoGerador } from "./get/get-orgao-gerador";
import { getPrestador } from "./get/get-prestador";
import { getServico } from "./get/get-servico";
import { getTomador } from "./get/get-tomador";
import { getValoresNfse } from "./get/get-valores-nfse";
import { mudarDataTypes } from "./mudar-dataTypes";

async function traduzirXMLCambe(xml_file_path: string){
    try {
        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;

        var valores_nfse = await getValoresNfse(parsed_xml);
        
        var prestador = await getPrestador(parsed_xml) as Prestador;
        var tomador = await getTomador(parsed_xml) as Tomador;

        var servico = await getServico(parsed_xml) as Servico;

        var declaracao = await getDeclaracao(parsed_xml, servico, prestador, tomador);

        var orgao_gerador = await getOrgaoGerador(parsed_xml);

        var infnfse = await getInfNfse(parsed_xml, valores_nfse, prestador, orgao_gerador, declaracao_prestacao);


        fs.unlinkSync(new_xml);


    } catch (error) {
        console.log(error)
    }
}

traduzirXMLCambe('../../../xmls/cambe/cambe1.xml')