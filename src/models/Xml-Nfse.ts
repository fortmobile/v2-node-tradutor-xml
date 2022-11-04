import { InfNfse } from "./InfNfse";
import {Cancelada} from "./Cancelada"

class Xml_Nfse{
    '?xml version="1.0" encoding="utf-8"': null
    ConsultarNfseServicoPrestadoResposta: {
        ListaNfse: {
            CompNfse: {
                Nfse: {
                    InfNfse: InfNfse
                },
                NfseCancelamento?: Cancelada
            }
        }
    }

    constructor(InfNfse: InfNfse, NfseCancelamento?: Cancelada){
        this['?xml version="1.0" encoding="utf-8"'] = null
        this.ConsultarNfseServicoPrestadoResposta = {
            ListaNfse: {
                CompNfse: {
                    Nfse: {
                        InfNfse
                    }
                }
            }
        }
        if (NfseCancelamento){
            this.ConsultarNfseServicoPrestadoResposta.ListaNfse.CompNfse.NfseCancelamento = NfseCancelamento;
        }
    }
}

export { Xml_Nfse }