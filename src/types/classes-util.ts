import { Classes } from "./_classes";

export module ClassesUtil {
  export const stats: Record<Classes.Name, Classes.Base> = {
    gryffindor: { hp: 45, def: 30, magicPower: 45, int: 20 },
    hufflepuff: { hp: 50, def: 35, magicPower: 40, int: 25 },
    ravenclaw: { hp: 40, def: 25, magicPower: 50, int: 30 },
    slytherin: { hp: 45, def: 40, magicPower: 35, int: 25 },
  };
}
