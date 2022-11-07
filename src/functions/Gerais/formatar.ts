async function formatCep(cep: string){
    try {
        var cep_final = cep[0] + cep[1] + cep[2] + cep[3] + cep[4] + '-' + cep[5] + cep[6] + cep[7]
        return cep_final;
    } catch (error) {
        return error;
    }
}

async function formatCpfCnpj(cpf_cnpj: string){
    try{
        if (cpf_cnpj.length == 14){
                var cpf_cnpj_final = cpf_cnpj[0] + cpf_cnpj[1] + '.' + cpf_cnpj[2] + cpf_cnpj[3] + cpf_cnpj[4] + '.' + cpf_cnpj[5] + 
            cpf_cnpj[6] + cpf_cnpj[7] + '/' + cpf_cnpj[8] + cpf_cnpj[9] + cpf_cnpj[10] + cpf_cnpj[11] + '-' + cpf_cnpj[12] + cpf_cnpj[13]
            
            return cpf_cnpj_final;
        }
        else if(cpf_cnpj.length == 11){
            var cpf_cnpj_final = cpf_cnpj[0] + cpf_cnpj[1] + cpf_cnpj[2] + '.' + cpf_cnpj[3] + cpf_cnpj[4] + cpf_cnpj[5] + '.' + cpf_cnpj[6] +
            cpf_cnpj[7] + cpf_cnpj[8] + '-' + cpf_cnpj[9] + cpf_cnpj[10];

            return cpf_cnpj_final;
        }
        else{
            return cpf_cnpj;
        }
    
    } catch(error){
        return error;
    }
}

async function formatCMC(cmc: string){
    try {
        var cmc_final = cmc[0] + cmc[1] + cmc[2] + cmc[3] + cmc[4] + cmc[5] + '-' + cmc[6];
        return cmc_final;;
    } catch (error) {
        return error;
    }
}

async function replaceText(text: string, old_string: string, new_string: string){
    var new_text = text.replace(old_string, new_string);
    
    return new_text;
}


export {formatCep, formatCpfCnpj, formatCMC, replaceText}