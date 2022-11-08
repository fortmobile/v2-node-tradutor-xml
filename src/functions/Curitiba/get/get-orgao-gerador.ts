import { OrgaoGerador } from "../../../models/OrgaoGerador";

async function getOrgaoGerador(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['Nfse' as jsonKeys]['InfNfse' as jsonKeys]['PrestadorServico' as jsonKeys]['Endereco' as jsonKeys];
    type jsonKeys2 = keyof typeof base_path;

    var municipio = base_path['CodigoMunicipio'] as number;
    var uf = base_path['Uf'] as string;

    var orgao_gerador = new OrgaoGerador(municipio, uf);
    return orgao_gerador;

}