async function statusNfse(json_object: object){
    try{
        type jsonKeys = keyof typeof json_object;
        var base_path = json_object['espelhoNFSe' as jsonKeys]['NFSe' as jsonKeys]['identificacaoNFSe' as jsonKeys];
        type jsonKeys2 = keyof typeof base_path;

        var status_cancelada = base_path['statusNFSe' as jsonKeys] as string;

        if (status_cancelada == 'CANCELADA'){
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