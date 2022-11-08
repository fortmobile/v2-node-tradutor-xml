import { Tomador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco'
import { Contato } from '../../../models/Contato';

async function getTomador(json_object: object){
    try {
        type jsonKeys = keyof typeof json_object;
        var base_path = json_object['Nfse' as jsonKeys]['InfNfse' as jsonKeys]['TomadorServico' as jsonKeys];
        type jsonKeys2 = keyof typeof base_path;

        
        if(base_path['IdentificacaoTomador' as jsonKeys2]['CpfCnpj' as jsonKeys2]['Cnpj' as jsonKeys2] as string){
            var cnpj = base_path['IdentificacaoTomador' as jsonKeys2]['CpfCnpj' as jsonKeys2]['Cnpj' as jsonKeys2] as string;
            cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
        }else{
            var cnpj = ''
        }

        

        if(base_path['IdentificacaoTomador' as jsonKeys2]['InscricaoMunicipal' as jsonKeys2]){
            var inscricao_municipal = (base_path['IdentificacaoTomador' as jsonKeys2]['InscricaoMunicipal' as jsonKeys2] as string).replace('-', '');
            var identificacao_tomador = (new IdentificacaoPrestadorTomador(cnpj, inscricao_municipal));

        }
        else{
            var identificacao_tomador = new IdentificacaoPrestadorTomador(cnpj);
        }

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
        if (cod_municipio == 0){
            cod_municipio = 9999999
        }
        
        var uf = base_path['Endereco' as jsonKeys2]['Uf' as jsonKeys2] as string;

        if (base_path['Endereco' as jsonKeys2]['Cep' as jsonKeys2] as string){
            var cep = (base_path['Endereco' as jsonKeys2]['Cep' as jsonKeys2] as string).replace('-', '');
        }else {
            var cep = ''
        }
        

        if (complemento !== ''){
            var endereco_tomador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep, complemento);
        }
        else {
            var endereco_tomador = new Endereco(endereco, numero, bairro, cod_municipio, uf, cep)
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

        if (base_path['Contato' as jsonKeys]['Email' as jsonKeys2] as string){
            var email = base_path['Contato' as jsonKeys]['Email' as jsonKeys2] as string;
            var contato = new Contato(email);

            var tomador = new Tomador(identificacao_tomador, razao_social, endereco_tomador, nome_fantasia, contato);
        } else {
            var tomador = new Tomador(identificacao_tomador, razao_social, endereco_tomador, nome_fantasia);
        }   

        return tomador;

    } catch (error) {
        console.error(error)
    }
}

export { getTomador }