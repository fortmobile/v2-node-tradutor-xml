import { OrgaoGerador } from "../../../models/OrgaoGerador";

async function getOrgaoGerador(json_object: object){
    type jsonKeys = keyof typeof json_object;
        
    var base_path = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['DadosNfse' as jsonKeys] as object;

    type jsonKeys2 = keyof typeof base_path;

    var municipio =  base_path['OrgaoGeradorMunicipio' as jsonKeys2] as number;
    var uf =  base_path['OrgaoGeradorUf' as jsonKeys2] as string;

    var orgao_gerador = new OrgaoGerador(municipio, uf);

    return orgao_gerador;
}

export { getOrgaoGerador}