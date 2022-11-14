const fs = require('fs');
const { XMLBuilder } = require("fast-xml-parser");

import { parseXml } from "../Gerais/parse-xml";
import { getValoresNfse } from "./get/get-valores-nfse";
import { mudarDataTypes } from "./mudar-dataTypes";

async function traduzirXMLCambe(xml_file_path: string){
    try {
        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;

        var valores_nfse = await getValoresNfse(parsed_xml);
        console.log(valores_nfse);
    } catch (error) {
        console.log(error)
    }
}

traduzirXMLCambe('../../../xmls/cambe/cambe1.xml')