var fs = require('fs');

import { formatCep, formatCpfCnpj, formatCMC, replaceText } from "../Gerais/formatar"
import { getAllIndexes } from "../Gerais/get-all-indexes";
import { getValor } from "../Gerais/get-valor"

async function mudarDataTypes(xml_file: string){
    var xml_text = (await fs.readFileSync(xml_file).toString());
    var xml_text2 = xml_text

    var cnpjs_indexes = getAllIndexes(xml_text, '<cpfcnpj>');
    for (let i = 0; i < cnpjs_indexes.length; i++){
        let old_cnpj = (await getValor(xml_text, cnpjs_indexes[i])).toString()
        let new_cnpj = await formatCpfCnpj(old_cnpj) as string;
        xml_text2 = await replaceText(xml_text2, old_cnpj, new_cnpj);
    }


    var cep_indexes = getAllIndexes(xml_text, '<cep>');
    for (let i = 0; i < cep_indexes.length; i++){
        let old_cep = (await getValor(xml_text, cep_indexes[i])).toString();
        let new_cep = await formatCep(old_cep) as string;
        xml_text2 = await replaceText(xml_text2, old_cep, new_cep)
    }


    const file_name = ((new Date().getTime()).toString()) + '.xml'
    fs.writeFileSync(file_name, xml_text2);
    return file_name;
}

export { mudarDataTypes }