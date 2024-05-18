export namespace Classes {
  export type Name = "gryffindor" | "hufflepuff" | "ravenclaw" | "slytherin";
  export type Model = Gryffindor | Hufflepuff | Ravenclaw | Slytherin;
  export type Base = {
    hp: number;
    def: number;
    int: number;
    magicPower: number;
  };
  export type Gryffindor = Base & {
    griffindorSpecialBuff: string;
  };
  export type Hufflepuff = Base & {
    hufflepuffSpecialBuff: string; // Düzeltildi: Hufflepuff -> hufflepuff
  };
  export type Ravenclaw = Base & {
    ravenclawSpecialBuff: string; // Düzeltildi: Ravenclaw -> ravenclaw
  };
  export type Slytherin = Base & {
    slytherinSpecialBuff: string; // Düzeltildi: Slytherin -> slytherin
  };
}
