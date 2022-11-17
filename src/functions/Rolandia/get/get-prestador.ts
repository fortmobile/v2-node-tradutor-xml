import { Prestador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco'


async function getPrestador(json_object: object){    
    try{
        type jsonKeys = keyof typeof json_object;
        var base_path = json_object['CompNfse' as jsonKeys]['Nfse'as jsonKeys]['InfNfse' as jsonKeys]['PrestadorServico' as jsonKeys] as object;
        type jsonKeys2 = keyof typeof base_path;


        var cnpj = base_path['IdentificacaoPrestador' as jsonKeys2]['Cnpj' as jsonKeys2] as string;
        cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
        
        var inscricao_municipal = (base_path['IdentificacaoPrestador' as jsonKeys2]['InscricaoMunicipal' as jsonKeys2] as string)

        if(base_path['IdentificacaoPrestador' as jsonKeys2]['InscricaoMunicipal' as jsonKeys2]){
            var inscricao_municipal = inscricao_municipal.replace('-', '')
        }

        var identificacao_prestador = new IdentificacaoPrestadorTomador(cnpj, inscricao_municipal);

        // Endereço Prestador
        var endereco = base_path['Endereco' as jsonKeys2]['Endereco' as jsonKeys2] as string;
        var numero =  base_path['Endereco' as jsonKeys2]['Numero' as jsonKeys2] as string;       
        
        
        var complemento = base_path['Endereco' as jsonKeys2]['Complemento' as jsonKeys2] as string;


        var bairro = base_path['Endereco' as jsonKeys2]['Bairro' as jsonKeys2] as string;
    
        var cod_municipio = base_path['Endereco' as jsonKeys2]['CodigoMunicipio' as jsonKeys2] as number;
        var uf =  base_path['Endereco' as jsonKeys2]['Uf' as jsonKeys2];


        var cep = (base_path['Endereco' as jsonKeys2]['Cep' as jsonKeys2] as string).replace('-', '');

        var endereco_prestador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep, complemento);


        // Outros Dados Prestador   
        var razao_social = base_path['RazaoSocial' as jsonKeys2] as string;

        // Montar Classe
        var prestador = new Prestador(identificacao_prestador, razao_social, endereco_prestador, undefined);
        
        
        return prestador as Prestador;

    }catch(error){
        console.error(error)
    }

}

export {getPrestador};