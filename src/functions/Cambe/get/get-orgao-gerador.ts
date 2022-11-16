import { OrgaoGerador } from "../../../models/OrgaoGerador";

async function getOrgaoGerador(json_object: object) {
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['espelhoNFSe' as jsonKeys]['NFSe' as jsonKeys]['demaisDados' as jsonKeys]
    type jsonKeys2 = keyof typeof base_path;

    var municipio =  base_path['municipioOrgaoGerador' as jsonKeys2] as number;
    var uf =  base_path['UFOrgaoGerador' as jsonKeys2] as string;

    var orgao_gerador = new OrgaoGerador(municipio, uf);

    return orgao_gerador;
}

export { getOrgaoGerador }