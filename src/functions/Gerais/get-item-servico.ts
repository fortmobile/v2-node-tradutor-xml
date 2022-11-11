import fs from 'fs'

function getItemServico(cnae: string){
    const cnae_tabela = JSON.parse((fs.readFileSync('../../cnae_tabela.json')).toString())

    for(let i = 0; i < cnae_tabela.length; i++){
        if (cnae_tabela[i].CNAE.includes(cnae)){
            return(cnae_tabela[i].CÓDIGO as string)
        }
    }

    return("error")
   
}

export { getItemServico }
