const fs = require('fs');
const { XMLBuilder } = require("fast-xml-parser");

import { Prestador } from "../../models/PrestadorTomador";
import { parseXml } from "../Gerais/parse-xml";
import { getPrestador } from "./get/get-prestador";
import { getTomador } from "./get/get-tomador";
import { getValoresNfse } from "./get/get-valores-nfse";
import { mudarDataTypes } from "./mudar-dataTypes";

async function traduzirXMLCambe(xml_file_path: string){
    try {
        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;

        var valores_nfse = await getValoresNfse(parsed_xml);
        
        var prestador = await getPrestador(parsed_xml);
        console.log(prestador)
        var tomador = await getTomador(parsed_xml)


    } catch (error) {
        console.log(error)
    }
}

traduzirXMLCambe('../../../xmls/cambe/cambe1.xml')