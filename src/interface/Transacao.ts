import { TipoTransacao } from "@/enums/TipoTransacao";

export interface Transacao {
    id: number;
    idTarget: number;
    Date: Date;
    valor: string;
    tipoTransacao: TipoTransacao;
    motivo?: string;
}