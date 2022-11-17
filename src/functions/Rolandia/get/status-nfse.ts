async function statusNfse(json_object: object){
    try{
        type jsonKeys = keyof typeof json_object;    
        var base_path = json_object['CompNfse' as jsonKeys]['NfseCancelamento' as jsonKeys] as object;
        if(base_path){
            return true;
        }

        return false;

    }catch(error){
        console.error(error)
    }
}

export { statusNfse }