var fs = require('fs')
const { XMLBuilder } = require("fast-xml-parser");

import {parseXml} from './parse-xml';
import { mudarDataTypes } from "./mudar-dataTypes";

async function traduzirXmlCuritiba(xml_file_path: string, xml_file_name: string, folder_name: string){
    try {
        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;

        fs.writeFileSync('curitiba1.json', JSON.stringify(parsed_xml))

    } catch (error) {
        return({message: 'erro ao converter xml'})
    }
}


traduzirXmlCuritiba('../../../xmls/curitiba/curitiba1.xml', 'aaa', 'aaa')