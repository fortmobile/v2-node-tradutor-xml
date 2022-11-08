import { Tomador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco'

async function getTomador(json_object: object){    
    try{
        type jsonKeys = keyof typeof json_object;
        
        var base_path = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['DadosNfse' as jsonKeys] as object;

        type jsonKeys2 = keyof typeof base_path;

        // Identificação Tomador
        var cnpj = base_path['TomadorCpfCnpj' as jsonKeys2] as string;
        cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');

        if(base_path['TomadorInscricaoMunicipal' as jsonKeys2]){
            var inscricao_municipal = (base_path['TomadorInscricaoMunicipal' as jsonKeys2] as string).replace('-', '');
            var identificacao_tomador = (new IdentificacaoPrestadorTomador(cnpj, inscricao_municipal));

        }
        else{
            var identificacao_tomador = new IdentificacaoPrestadorTomador(cnpj);
        }

        // Endereço Tomador
        var endereco = base_path['TomadorEndereco' as jsonKeys2] as string;
        var numero = base_path['TomadorNumero' as jsonKeys2] as string;       
        if (base_path['TomadorComplemento' as jsonKeys2]){
            var complemento = base_path['TomadorComplemento' as jsonKeys2] as string;
        }
        else {
            var complemento = '';
        }
        if(base_path['TomadorBairro' as jsonKeys2]){
            var bairro = base_path['TomadorBairro' as jsonKeys2] as string;
        }
        else {
            var bairro = ''
        }
        var cod_municipio = base_path['TomadorCodigoMunicipio' as jsonKeys2];
        var uf = base_path['TomadorUf' as jsonKeys2];
        try{
            var cep = (base_path['TomadorCep' as jsonKeys2] as string).replace('-', '');
        }
        catch (TypeError){
            var cep = '';
        }
        if (complemento !== ''){
            var endereco_tomador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep, complemento);
        }
        else {
            var endereco_tomador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep)
        }

        // Outros Dados Prestador   
        var razao_social = base_path['TomadorRazaoSocial' as jsonKeys2] as string;

        if (base_path['TomadorNomeFantasia' as jsonKeys2]){
            var nome_fantasia = base_path['TomadorNomeFantasia' as jsonKeys2] as string ;
        }
        else {
            var nome_fantasia = '';
        }

        // Montar Classe
        var tomador = new Tomador(identificacao_tomador, razao_social, endereco_tomador, nome_fantasia);
        
        return tomador;

    }catch(error){
        console.error(error)
    }

}

export {getTomador};