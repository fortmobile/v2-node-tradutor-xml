class OrgaoGerador{
    CodigoMunicipio: number;
    Uf: string

    constructor(codigo_municipio: number, uf: string){
        this.CodigoMunicipio = codigo_municipio;
        this.Uf = uf;
    }
}

export { OrgaoGerador }