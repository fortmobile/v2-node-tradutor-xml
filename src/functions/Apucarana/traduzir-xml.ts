import fs from 'fs'

import { parseXml } from "../Gerais/parse-xml";
import { getValoresNfse } from "./get/get-valores-nfse";
import { mudarDataTypes } from "./mudar-dataTypes";


async function traduzirXmlApucarana(xml_file_path: string) {
    try {
        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;

        var valores_nfse = await getValoresNfse(parsed_xml);


        fs.unlinkSync(new_xml);


    } catch (error) {
        console.log(error)
    }
}

traduzirXmlApucarana('../../../xmls/apucarana/apucarana1.xml')