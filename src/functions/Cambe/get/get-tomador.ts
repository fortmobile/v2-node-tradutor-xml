import { Tomador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco'
import { Contato } from '../../../models/Contato';

async function getTomador(json_object: object){
    try{
        type jsonKeys = keyof typeof json_object;
        var base_path = json_object['espelhoNFSe' as jsonKeys]['NFSe' as jsonKeys]['dadosNFSe' as jsonKeys]['dadosTomador' as jsonKeys]
        type jsonKeys2 = keyof typeof base_path;

        if (base_path['tomadorCPFCNPJ' as jsonKeys2]){
            var cnpj = base_path['tomadorCPFCNPJ' as jsonKeys2] as string;
            if(cnpj.length == 18){
                cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
            }
            else{
                cnpj = cnpj.replace('.', '').replace('.', '').replace('-', '')
            }
        }
        else{
            var cnpj = ''
        }    

        var identificacao_tomador = new IdentificacaoPrestadorTomador(cnpj);

        // Endereço Tomador
        var endereco = base_path['tomadorLogradouro' as jsonKeys2] as string;
        var numero = base_path['tomadorNumero' as jsonKeys2] as string;       
        if (base_path['tomadorComplemento' as jsonKeys2]){
            var complemento = base_path['tomadorComplemento' as jsonKeys2] as string;
        }
        else {
            var complemento = '';
        }
        if(base_path['tomadorBairro' as jsonKeys2]){
            var bairro = base_path['tomadorBairro' as jsonKeys2] as string;
        }
        else {
            var bairro = ''
        }

        if (base_path['tipoTomador' as jsonKeys2] as number == 5){
            var cod_municipio = 9999999
        }
        else {
            var cod_municipio = base_path['tomadorMunicipio' as jsonKeys2] as number;
        }

        var uf = base_path['tomadorUF' as jsonKeys2];
        
        try{
            var cep = (base_path['tomadorCEP' as jsonKeys2] as string).replace('-', '');
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

        var razao_social = base_path['tomadorRazaoSocial' as jsonKeys2] as string;

        if (base_path['tomadorNomeFantasia' as jsonKeys2]){
            var nome_fantasia = base_path['tomadorNomeFantasia' as jsonKeys2] as string ;
        }
        else {
            var nome_fantasia = '';
        }

        if (base_path['tomadorTelefone' as jsonKeys2] || base_path['tomadorEmail' as jsonKeys2]){
            var email = base_path['tomadorEmail' as jsonKeys2] as string;
            var telefone = base_path['tomadorTelefone' as jsonKeys2] as string;
            var contato = new Contato(email, telefone);

            var tomador = new Tomador(identificacao_tomador, razao_social, endereco_tomador, nome_fantasia, contato);
    
        } else {

            var tomador = new Tomador(identificacao_tomador, razao_social, endereco_tomador, nome_fantasia);
        
        }   

        return tomador;
    } catch(error){
        return ({error: 'erro ao pegar dados do prestador'})
    }
}

export { getTomador } 