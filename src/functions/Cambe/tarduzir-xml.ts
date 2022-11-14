const fs = require('fs');
const { XMLBuilder } = require("fast-xml-parser");

import { mudarDataTypes } from "./mudar-dataTypes";

async function traduzirXMLCuritiba(xml_file_path: string){
    try {
        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;
    } catch (error) {
        
    }
}