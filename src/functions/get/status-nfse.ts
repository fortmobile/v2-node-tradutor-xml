async function statusNfse(json_object: object){
    try{
        type jsonKeys = keyof typeof json_object;
            
        var base_path = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['IdentificacaoNfse' as jsonKeys] as object;

        type jsonKeys2 = keyof typeof base_path;

        var status_cancelada = base_path['StatusNfse' as jsonKeys] as number;

        if (status_cancelada == 2){
            return true;
        }
        else {
            return false;
        }
    }catch(error){
        console.error(error)
    }
}

export { statusNfse }