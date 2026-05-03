import { TipoTransacao } from "@/enums/TipoTransacao";

export interface Transacao {
    id: number;
    idTarget: number;
    tipoTransacao: TipoTransacao;
    motivo?: string;
}