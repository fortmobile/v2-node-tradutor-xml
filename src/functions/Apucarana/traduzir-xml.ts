import fs from 'fs'
import { Prestador, Tomador } from '../../models/PrestadorTomador';

import { parseXml } from "../Gerais/parse-xml";
import { getPrestador } from './get/get-prestador';
import { getTomador } from './get/get-tomador';
import { getValoresNfse } from "./get/get-valores-nfse";
import { mudarDataTypes } from "./mudar-dataTypes";


async function traduzirXmlApucarana(xml_file_path: string) {
    try {
        var new_xml = await mudarDataTypes(xml_file_path);

        var parsed_xml = await parseXml(new_xml) as object;

        var valores_nfse = await getValoresNfse(parsed_xml);

        var prestador = await getPrestador(parsed_xml) as Prestador;
        var tomador = await getTomador(parsed_xml)as Tomador;

        console.log(tomador)


        fs.unlinkSync(new_xml);


    } catch (error) {
        console.log(error)
    }
}

traduzirXmlApucarana('../../../xmls/apucarana/apucarana1.xml')