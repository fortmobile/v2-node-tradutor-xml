import { Endereco } from '../../../models/Endereco'
var fs = require("fs")


async function getEnderecoTomador(json_object: object){    
    try{
        type jsonKeys = keyof typeof json_object;
        
        var base_path = json_object['EspelhoNfse' as jsonKeys]['Nfse'as jsonKeys]['DadosNfse' as jsonKeys] as object;

        type jsonKeys2 = keyof typeof base_path;


        var endereco = base_path['TomadorEndereco' as jsonKeys2] as string;
        var numero = base_path['TomadorNumero' as jsonKeys2] as string;    
        
        if (base_path['TomadorComplemento' as jsonKeys2]){
            var complemento = base_path['TomadorComplemento' as jsonKeys2] as string;
        }
        else {
            var complemento = '';
        }

        var bairro = base_path['TomadorBairro' as jsonKeys2] as string;
     

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

        console.log(endereco_tomador)


    }catch(error){
        console.error(error)
    }
}

export {getEnderecoTomador}
