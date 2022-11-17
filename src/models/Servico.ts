import {ValoresServico} from "./Valores"
import { getItemServico } from '../functions/Gerais/get-item-servico'


class Servico{
    Valores: ValoresServico;
    IssRetido: number; 
    ItemListaServico: string;
    CodigoCnae: string;
    CodigoTributacaoMunicipio: string;
    Discriminacao: string;
    CodigoMunicipio: number; 
    ExigibilidadeISS?: number; 
    MunicipioIncidencia?: number;

    constructor(valores: ValoresServico, iss_retido: boolean, item_lista_servico: string, discriminacao: string, cod_municipio: number,
    exigibilidade_iss: number | undefined, municipio_incidencia: number | undefined){
        this.Valores = valores;
        
        if (iss_retido == true){
            this.IssRetido = 1;
        }
        else if (iss_retido == false){
            this.IssRetido = 2;
        }
        else{
            this.IssRetido = 3;
        }


        if (item_lista_servico.length == 3){
            this.ItemListaServico = '0' + item_lista_servico;
            this.CodigoCnae = '00';
            this.CodigoTributacaoMunicipio = this.ItemListaServico + this.CodigoCnae;
        }
        else if (item_lista_servico.length == 4){
            this.ItemListaServico = item_lista_servico;
            this.CodigoCnae = '00';
            this.CodigoTributacaoMunicipio = this.ItemListaServico + this.CodigoCnae;
        }
        else if (item_lista_servico.length == 5){
            this.ItemListaServico = item_lista_servico[0] + item_lista_servico[1] + item_lista_servico[2] + item_lista_servico[3]  
            this.CodigoCnae = '0' + item_lista_servico[4];
            this.CodigoTributacaoMunicipio = this.ItemListaServico + this.CodigoCnae;
        }
        else if (item_lista_servico.length == 9){
            let cnae = item_lista_servico

            item_lista_servico = getItemServico(cnae) as string;

            this.ItemListaServico = item_lista_servico;

            if (item_lista_servico == 'error'){
                this.CodigoCnae = 'error'
                this.CodigoTributacaoMunicipio = 'error'
            }
            else {
                this.CodigoCnae = '00';
                this.CodigoTributacaoMunicipio = this.ItemListaServico + this.CodigoCnae;
            }

        }
        else{
            this.ItemListaServico = 'error';
            this.CodigoCnae = 'error';
            this.CodigoTributacaoMunicipio = 'error';
        }

        this.Discriminacao = discriminacao;
        this.CodigoMunicipio = cod_municipio;
        
        if (exigibilidade_iss != 0 && exigibilidade_iss != undefined){
            this.ExigibilidadeISS = exigibilidade_iss;
        }
        
        if(municipio_incidencia !== undefined){
            this.MunicipioIncidencia = municipio_incidencia;
        }
        
    }
}

export { Servico }