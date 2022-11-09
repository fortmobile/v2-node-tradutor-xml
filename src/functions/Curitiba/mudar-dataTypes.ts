var fs = require('fs');

import { Console } from "console";
import { formatCep, formatCpfCnpj, formatCMC, replaceText } from "../Gerais/formatar"
import { getAllIndexes } from "../Gerais/get-all-indexes";
import { getValor } from "../Gerais/get-valor"

async function mudarDataTypes(xml_file: string){
    var xml_text = (await fs.readFileSync(xml_file).toString());
    var xml_text2 = xml_text

    var cnpjs_indexes = getAllIndexes(xml_text, '<Cnpj>');
    for (let i = 0; i < cnpjs_indexes.length; i++){
        let old_cnpj = (await getValor(xml_text, cnpjs_indexes[i])).toString()
        let new_cnpj = await formatCpfCnpj(old_cnpj) as string;
        xml_text2 = await replaceText(xml_text2, old_cnpj, new_cnpj);
    }

    var cpfs_indexes = getAllIndexes(xml_text, '<Cpf>');
    for (let i = 0; i < cpfs_indexes.length; i++){
        let old_cpf = (await getValor(xml_text, cpfs_indexes[i])).toString()
        let new_cpf = await formatCpfCnpj(old_cpf) as string;
        xml_text2 = await replaceText(xml_text2, old_cpf, new_cpf);
    }

    var cep_indexes = getAllIndexes(xml_text, '<Cep>');
    for (let i = 0; i < cep_indexes.length; i++){
        let old_cep = (await getValor(xml_text, cep_indexes[i])).toString();
        let new_cep = await formatCep(old_cep) as string;
        xml_text2 = await replaceText(xml_text2, old_cep, new_cep)
    }

    var cmc_indexes = getAllIndexes(xml_text, '<InscricaoMunicipal>');
    for(let i = 0; i < cmc_indexes.length; i++){
        let old_cmc = (await getValor(xml_text, cmc_indexes[i])).toString();
        let new_cmc = await formatCMC(old_cmc) as string;
        xml_text2 = await replaceText(xml_text2, old_cmc, new_cmc)
    }

    const file_name = ((new Date().getTime()).toString()) + '.xml'
    fs.writeFileSync(file_name, xml_text2);
    return file_name;
}

export { mudarDataTypes }