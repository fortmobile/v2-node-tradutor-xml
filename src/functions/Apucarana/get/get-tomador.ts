import { Tomador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco'
import { Contato } from '../../../models/Contato'

async function getTomador(json_object: object){
    type jsonKeys = keyof typeof json_object;
    var base_path = json_object['nfse' as jsonKeys]['tomador' as jsonKeys] as object;
    type jsonKeys2 = keyof typeof base_path;

    var cpfcnpj = base_path['cpfcnpj' as jsonKeys2] as string;
    if(cpfcnpj.length == 18){
        cpfcnpj = cpfcnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
    }
    else{
        cpfcnpj = cpfcnpj.replace('.', '').replace('.', '').replace('-', '')
    }

    var identificacao_tomador = new IdentificacaoPrestadorTomador(cpfcnpj);

    var endereco = base_path['logradouro' as jsonKeys2] as string;
    var numero = base_path['numero_residencia' as jsonKeys2] as string;  

    if (base_path['complemento' as jsonKeys2] as number !== 0){
        var complemento = base_path['complemento' as jsonKeys2] as string;
    }
    else {
        var complemento = '';
    }

    var bairro = base_path['bairro' as jsonKeys2] as string;

    if (base_path['tipo' as jsonKeys2] as string == 'E'){
        var cod_municipio = 9999999
    }
    else {
        var cod_municipio = base_path['cidade' as jsonKeys2] as number;
    }

    var uf = base_path['estado' as jsonKeys2] as string;

    var cep = (base_path['cep' as jsonKeys2] as string).replace('-', '')

    var endereco_tomador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep, complemento);


    var razao_social = base_path['nome_razao_social' as jsonKeys2] as string;
    
    var nome_fantasia = base_path['sobrenome_nome_fantasia' as jsonKeys2] as string;


    var email = base_path['email' as jsonKeys2] as string;
    if (email == '0'){
        var tomador = new Tomador(identificacao_tomador, razao_social, endereco_tomador, nome_fantasia);
    } 
    else {
        var contato = new Contato(email);
        var tomador = new Tomador(identificacao_tomador, razao_social, endereco_tomador, nome_fantasia, contato);

    }
    


    
        
    return tomador;

}


export { getTomador }