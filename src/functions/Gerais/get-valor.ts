async function getValor(text: string, index: number){
    var i  = index;
    var valor = ''

    while(text[i] !== '>'){
        i++;
    }
    
    i++;

    while(text[i] !== '<'){
        valor += text[i]
        i++;
    }

    return valor as string;
}

export {getValor}