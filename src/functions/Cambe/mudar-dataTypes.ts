var fs = require('fs');

import { formatCep, formatCpfCnpj, formatCMC, replaceText } from "../Gerais/formatar";
import { getValor } from "../Gerais/get-valor";

async function mudarDataTypes(xml_file: string){
    var xml_text = (fs.readFileSync(xml_file).toString());

    var old_cnpj_prest = await getValor(xml_text, await xml_text.indexOf("prestadorCNPJ"));
    var new_cnpj_prest =  await formatCpfCnpj(old_cnpj_prest) as string;
    xml_text = await replaceText(xml_text, old_cnpj_prest, new_cnpj_prest);

    var old_cnpj_toma = await getValor(xml_text, await xml_text.indexOf("tomadorCPFCNPJ"));
    var new_cnpj_prest = await formatCpfCnpj(old_cnpj_toma) as string;
    xml_text = await replaceText(xml_text, old_cnpj_toma, new_cnpj_prest);


    var old_cep_prest = await getValor(xml_text, await xml_text.indexOf("prestadorCEP"));
    var new_cep_prest = await formatCep(old_cep_prest) as string;
    xml_text = await replaceText(xml_text, old_cep_prest, new_cep_prest);

    var old_cep_toma = await getValor(xml_text, await xml_text.indexOf("tomadorCEP"));
    var new_cep_toma = await formatCep(old_cep_toma) as string;
    xml_text = await replaceText(xml_text, old_cep_toma, new_cep_toma);

    var old_cmc_prest = await getValor(xml_text, await xml_text.indexOf("prestadorCMC"));
    var new_cmc_prest = await formatCMC(old_cmc_prest) as string;
    xml_text = await replaceText(xml_text, old_cmc_prest, new_cmc_prest);

    const file_name = ((new Date().getTime()).toString()) + '.xml'
    fs.writeFileSync(file_name, xml_text);
    return file_name;
}

export {mudarDataTypes}