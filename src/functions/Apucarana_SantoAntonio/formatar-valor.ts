async function formatarValor(valor_inicial: string){
    if (valor_inicial.includes('.')){
        valor_inicial = valor_inicial.replace('.', '')
    }

    return(Number((valor_inicial).replace(',', '.')));

}

export { formatarValor }