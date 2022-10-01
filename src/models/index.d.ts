import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CardMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PackCardMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Card {
  readonly id: string;
  readonly valeur?: string | null;
  readonly couleur?: string | null;
  readonly personnage?: string | null;
  readonly verbe?: string | null;
  readonly objet?: string | null;
  readonly lieu?: string | null;
  readonly conditions?: string | null;
  readonly packcardID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Card, CardMetaData>);
  static copyOf(source: Card, mutator: (draft: MutableModel<Card, CardMetaData>) => MutableModel<Card, CardMetaData> | void): Card;
}

export declare class PackCard {
  readonly id: string;
  readonly userId?: string | null;
  readonly Cards?: (Card | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PackCard, PackCardMetaData>);
  static copyOf(source: PackCard, mutator: (draft: MutableModel<PackCard, PackCardMetaData>) => MutableModel<PackCard, PackCardMetaData> | void): PackCard;
}