const { XMLParser } = require("fast-xml-parser");
const fs = require("fs")

async function parseXml(xml_file: string): Promise<object>{
    // Converter XML para Json
    const XMLdata = fs.readFileSync(xml_file);

    const parser = new XMLParser();
    let json_object = parser.parse(XMLdata);

    return json_object;
}
export {parseXml};

parseXml('../../xmls/curitiba/curitiba1.xml')