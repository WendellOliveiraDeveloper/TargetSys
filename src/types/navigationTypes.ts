import { Target } from "@/interface/Target";
import { Transacao } from "@/interface/Transacao";

export type RootStackParamList = {
  Home: undefined;
  Meta:
    | {
        target?: Target;
        isEditing?: boolean;
      }
    | undefined;
  MetaAndamento:
    | {
        target?: Target;
      }
    | undefined;
  Transacao:
    | {
        target?: Target;
      }
    | undefined;
};
