import { Tomador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco'
import { Contato } from '../../../models/Contato';

async function getTomador(json_object: object){    
    try{
        type jsonKeys = keyof typeof json_object;
        var base_path = json_object['CompNfse' as jsonKeys]['Nfse'as jsonKeys]['InfNfse' as jsonKeys]['TomadorServico' as jsonKeys] as object;
        type jsonKeys2 = keyof typeof base_path;


        if(base_path['IdentificacaoTomador' as jsonKeys2]['CpfCnpj' as jsonKeys2]['Cnpj' as jsonKeys2] as string){
            var cnpjcpf = base_path['IdentificacaoTomador' as jsonKeys2]['CpfCnpj' as jsonKeys2]['Cnpj' as jsonKeys2] as string;
            cnpjcpf = cnpjcpf.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
        }
        else if(base_path['IdentificacaoTomador' as jsonKeys2]['CpfCnpj' as jsonKeys2]['Cpf' as jsonKeys2] as string){
            var cnpjcpf = base_path['IdentificacaoTomador' as jsonKeys2]['CpfCnpj' as jsonKeys2]['Cpf' as jsonKeys2] as string;
            cnpjcpf = cnpjcpf.replace('.', '').replace('.', '').replace('-', '')
        }
        else{
            var cnpjcpf = ''
        }
    
        if(base_path['IdentificacaoTomador' as jsonKeys2]['InscricaoMunicipal' as jsonKeys2]){
            var inscricao_municipal = (base_path['IdentificacaoTomador' as jsonKeys2]['InscricaoMunicipal' as jsonKeys2] as string).replace('-', '');
            var identificacao_tomador = (new IdentificacaoPrestadorTomador(cnpjcpf, inscricao_municipal));

        }
        else{
            var identificacao_tomador = new IdentificacaoPrestadorTomador(cnpjcpf);
        }

        // Endereço Prestador
        var endereco = base_path['Endereco' as jsonKeys2]['Endereco' as jsonKeys2] as string;
        var numero =  base_path['Endereco' as jsonKeys2]['Numero' as jsonKeys2] as string;       
        
        var complemento = base_path['Endereco' as jsonKeys2]['Complemento' as jsonKeys2] as string;

        var bairro = base_path['Endereco' as jsonKeys2]['Bairro' as jsonKeys2] as string;
    
        var cod_municipio = base_path['Endereco' as jsonKeys2]['CodigoMunicipio' as jsonKeys2] as number;
        var uf =  base_path['Endereco' as jsonKeys2]['Uf' as jsonKeys2];


        var cep = (base_path['Endereco' as jsonKeys2]['Cep' as jsonKeys2] as string).replace('-', '');

        var endereco_tomador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep, complemento);


        // Outros Dados Prestador   
        var razao_social = base_path['RazaoSocial' as jsonKeys2] as string;

        if (base_path['Contato' as jsonKeys2]){
            var telefone = base_path['Contato' as jsonKeys2]['Telefone' as jsonKeys2] as string;
            var email = base_path['Contato' as jsonKeys2]['Email' as jsonKeys2] as string;

            var contato = new Contato(email, telefone);
            var tomador = new Tomador(identificacao_tomador, razao_social, endereco_tomador, undefined, contato);
        }
        else {
            var tomador = new Tomador(identificacao_tomador, razao_social, endereco_tomador, undefined);
        }

        
        return tomador;

    }catch(error){
        console.error(error)
    }

}

export {getTomador};