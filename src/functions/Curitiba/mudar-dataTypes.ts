var fs = require('fs');

import { formatCep, formatCpfCnpj, formatCMC, replaceText } from "../Gerais/formatar"
import { getAllIndexes } from "../Gerais/get-all-indexes";
import { getValor } from "../Gerais/get-valor"

async function mudarDataTypes(xml_file: string){
    var xml_text = (fs.readFileSync(xml_file).toString());

    var cnpjs_indexes = getAllIndexes(xml_text, '<Cnpj>');
    for (let i = 0; i < cnpjs_indexes.length; i++){
        let old_cnpj = (await getValor(xml_text, cnpjs_indexes[i])).toString()
        let new_cnpj = await formatCpfCnpj(old_cnpj) as string;
        xml_text = await replaceText(xml_text, old_cnpj, new_cnpj);
    }

    var cep_indexes = getAllIndexes(xml_text, '<Cep>');
    for (let i = 0; i < cep_indexes.length; i++){
        let old_cep = (await getValor(xml_text, cep_indexes[i])).toString();
        let new_cep = await formatCep(old_cep) as string;
        xml_text = await replaceText(xml_text, old_cep, new_cep)
    }

    var cmc_indexes = getAllIndexes(xml_text, '<InscricaoMunicipal>');
    for(let i = 0; i < cmc_indexes.length; i++){
        let old_cmc = (await getValor(xml_text, cmc_indexes[i])).toString();
        let new_cmc = await formatCMC(old_cmc) as string;
        xml_text = await replaceText(xml_text, old_cmc, new_cmc)
    }

    const file_name = ((new Date().getTime()).toString()) + '.xml'
    fs.writeFileSync(file_name, xml_text);
    return file_name;
}

export { mudarDataTypes }