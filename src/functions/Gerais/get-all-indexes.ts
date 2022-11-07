function getAllIndexes(text: any, val: string) {
    var indexes = [], i = -1;
    while ((i = text.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

export {getAllIndexes }