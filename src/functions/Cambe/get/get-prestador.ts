import { Prestador, IdentificacaoPrestadorTomador } from '../../../models/PrestadorTomador'
import { Endereco } from '../../../models/Endereco';
import { Contato } from '../../../models/Contato';


async function getPrestador(json_object: object){
    try{
        type jsonKeys = keyof typeof json_object;
        var base_path = json_object['espelhoNFSe' as jsonKeys]['NFSe' as jsonKeys]['dadosNFSe' as jsonKeys]['dadosPrestador' as jsonKeys]
        type jsonKeys2 = keyof typeof base_path;

        var cnpj = base_path['prestadorCNPJ' as jsonKeys2] as string;
        cnpj = cnpj.replace('-', '').replace('.', '').replace('.', '').replace('/', '');
        var inscricao_municipal = (base_path['prestadorCMC' as jsonKeys2] as string).replace('-', '');

        var identificacao_prestador = new IdentificacaoPrestadorTomador(cnpj, inscricao_municipal);


        var endereco = base_path['prestadorLogradouro' as jsonKeys2];
        var numero = base_path['prestadorNumero' as jsonKeys2] as string;       
        
        if (base_path['prestadorComplemento' as jsonKeys2]){
            var complemento = base_path['prestadorComplemento' as jsonKeys2] as string;
        }
        else {
            var complemento = '';
        }

        var bairro = base_path['prestadorBairro' as jsonKeys2] as string;

        var cod_municipio = base_path['prestadorMunicipio' as jsonKeys2];
        var uf = base_path['prestadorUF' as jsonKeys2];
        try{
            var cep = (base_path['prestadorCEP' as jsonKeys2] as string).replace('-', '');
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

        var razao_social = base_path['prestadorRazaoSocial' as jsonKeys2] as string;

        if (base_path['prestadorNomeFantasia' as jsonKeys2]){
            var nome_fantasia = base_path['prestadorNomeFantasia' as jsonKeys2] as string ;
        }
        else {
            var nome_fantasia = '';
        }


        if (base_path['prestadorTelefone' as jsonKeys2] || base_path['prestadorEmail' as jsonKeys2]){
            var email = base_path['prestadorEmail' as jsonKeys2] as string;
            var telefone = base_path['prestadorTelefone' as jsonKeys2] as string;
            var contato = new Contato(email, telefone);

            var prestador = new Prestador(identificacao_prestador, razao_social, endereco_prestador, nome_fantasia, contato);
       
        } else {

            var prestador = new Prestador(identificacao_prestador, razao_social, endereco_prestador, nome_fantasia);
        
        }   



        return prestador as Prestador;
    } catch(error){
        
        return({error: 'erro ao pegar dados do prestador'});

    }
}

export { getPrestador }