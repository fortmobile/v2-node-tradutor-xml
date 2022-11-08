import { Prestador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco'


async function getPrestador(json_object: object){    
    try{
        type jsonKeys = keyof typeof json_object;
        
        var base_path = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['DadosNfse' as jsonKeys] as object;

        type jsonKeys2 = keyof typeof base_path;

        // Identificação Prestador
        var cnpj = base_path['PrestadorCnpj' as jsonKeys2] as string;
        cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
        var inscricao_municipal = (base_path['PrestadorInscricaoMunicipal' as jsonKeys2] as string).replace('-', '');

        var identificacao_prestador = new IdentificacaoPrestadorTomador(cnpj, inscricao_municipal);

        // Endereço Prestador
        var endereco = base_path['PrestadorEndereco' as jsonKeys2] as string;
        var numero = base_path['PrestadorNumero' as jsonKeys2] as string;       
        if (base_path['PrestasdorComplemento' as jsonKeys2]){
            var complemento = base_path['PrestasdorComplemento' as jsonKeys2] as string;
        }
        else {
            var complemento = '';
        }

        var bairro = base_path['PrestadorBairro' as jsonKeys2] as string;
    
        var cod_municipio = base_path['PrestadorCodigoMunicipio' as jsonKeys2];
        var uf = base_path['PrestadorUf' as jsonKeys2];
        try{
            var cep = (base_path['PrestadorCep' as jsonKeys2] as string).replace('-', '');
        }
        catch (TypeError){
            var cep = '';
        }
        if (complemento !== ''){
            var endereco_prestador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep, complemento);
        }
        else {
            var endereco_prestador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep)
        }

        // Outros Dados Prestador   
        var razao_social = base_path['PrestadorRazaoSocial' as jsonKeys2] as string;

        if (base_path['PrestadorNomeFantasia' as jsonKeys2]){
            var nome_fantasia = base_path['PrestadorNomeFantasia' as jsonKeys2] as string ;
        }
        else {
            var nome_fantasia = '';
        }

        // Montar Classe
        var prestador = new Prestador(identificacao_prestador, razao_social, endereco_prestador, nome_fantasia);
        
        
        return prestador as Prestador;

    }catch(error){
        console.error(error)
    }

}

export {getPrestador};