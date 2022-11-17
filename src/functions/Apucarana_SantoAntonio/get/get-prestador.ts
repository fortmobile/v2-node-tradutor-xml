import { Prestador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco'


async function getPrestador(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['nfse' as jsonKeys]['prestador' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;


    var cnpj = base_path['cpfcnpj' as jsonKeys2] as string;
    cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');

    var identificacao_prestador = new IdentificacaoPrestadorTomador(cnpj);

    var codigo_municipio = base_path['cidade' as jsonKeys2] as number;

    var endereco_prestador = new Endereco(undefined, undefined, undefined, codigo_municipio, undefined, undefined, undefined);


    var prestador = new Prestador(identificacao_prestador, '', endereco_prestador, '');
        
        
    return prestador as Prestador;
}       

export { getPrestador }