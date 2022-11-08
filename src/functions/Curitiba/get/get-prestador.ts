import { Prestador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco'

async function getPrestador(json_object: object){
    try {
        type jsonKeys = keyof typeof json_object;
        var base_path = json_object['Nfse' as jsonKeys]['InfNfse' as jsonKeys]['PrestadorServico' as jsonKeys];
        type jsonKeys2 = keyof typeof base_path;

        var cnpj = base_path['IdentificacaoPrestador' as jsonKeys2]['Cnpj' as jsonKeys2] as string;
        cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
        var inscricao_municipal = (base_path['IdentificacaoPrestador' as jsonKeys2]['InscricaoMunicipal' as jsonKeys2] as string).replace('-', '');
        
        var identificacao_prestador = new IdentificacaoPrestadorTomador(cnpj, inscricao_municipal);

        var endereco = base_path['Endereco' as jsonKeys2]['Endereco' as jsonKeys2] as string;
        var numero = base_path['Endereco' as jsonKeys2]['Numero' as jsonKeys2] as string;

        if (base_path['Endereco' as jsonKeys2]['Complemento' as jsonKeys2]){
            var complemento = base_path['Endereco' as jsonKeys2]['Complemento' as jsonKeys2] as string;
        }
        else {
            var complemento = '';
        }

        var bairro = base_path['Endereco' as jsonKeys2]['Bairro' as jsonKeys2];
        var cod_municipio = base_path['Endereco' as jsonKeys2]['CodigoMunicipio' as jsonKeys2] as number;
        var uf = base_path['Endereco' as jsonKeys2]['Uf' as jsonKeys2] as string;
        var cep = (base_path['Endereco' as jsonKeys2]['Cep' as jsonKeys2] as string).replace('-', '');

        if (complemento !== ''){
            var endereco_prestador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep, complemento);
        }
        else {
            var endereco_prestador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep)
        }
        
        if (base_path['RazaoSocial' as jsonKeys2]){
            var razao_social = base_path['RazaoSocial' as jsonKeys2] as string ;
        }
        else {
            var razao_social = '';
        }

        if (base_path['NomeFantasia' as jsonKeys2]){
            var nome_fantasia = base_path['NomeFantasia' as jsonKeys2] as string ;
        }
        else {
            var nome_fantasia = '';
        }

        // Montar Classe
        var prestador = new Prestador(identificacao_prestador, razao_social, endereco_prestador, nome_fantasia);


        return prestador as Prestador;

        

    } catch (error) {
        return error;
    }      
}

export {getPrestador}