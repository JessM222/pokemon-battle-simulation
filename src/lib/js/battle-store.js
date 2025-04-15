import { writable, get } from "svelte/store";
import { pokedex } from "./pokedex.js";
export const battleStore = writable(getTwoRandomPokemon());
export const recordStore = writable();
export let winner;
export function getUserProfile() {
  return get(battleStore)
}

get(battleStore)
export function attack(attacker, defender) {
  let maxHit;
  if (!attacker.canAttack) {
    return;
  } 
  else {
    maxHit = calculateMax();
    maxHit=compareMaxHitWithCurrentHP(defender, maxHit);
    defender.hp -= maxHit;
    attacker.canAttack = false;
    defender.canAttack = true;
  }

  updateBattleStore(attacker, defender);
  updateRecordStore(defender, maxHit);

  if (defender.hp === 0) {
    winner = attacker;
    return;
  }
}

function calculateMax() {
  if (Math.floor(Math.random() * 10) == 9) {
   return 40;
  } else {
    return Math.floor(10 + Math.random() * 10);
  }
}

function compareMaxHitWithCurrentHP(defender, maxHit) {
  return Math.min(defender.hp, maxHit);
}


function getTwoRandomPokemon() {
  let index1 = 0;
  let index2 = 0;

  // Ensure that the two chosen pokemon are not the same.
  while (index1 === index2) {
    index1 = Math.floor(Math.random() * pokedex.length);
    index2 = Math.floor(Math.random() * pokedex.length);
  }

  return [
    {
      ...pokedex[index1],
      hp: pokedex[index1].maxHp,
      canAttack: true
    },
    {
      ...pokedex[index2],
      hp: pokedex[index2].maxHp,
      canAttack: false
    }
  ];
}


function updateBattleStore(attacker, defender) {
  battleStore.update((battlers) =>
    battlers.map((p) => {
      if (p.dexNumber === attacker.dexNumber) return { ...attacker };
      else if (p.dexNumber === defender.dexNumber) return { ...defender };
      else return p;
    })
  );
}

function updateRecordStore(defender, maxHit) {
  const criticalHit = isCriticalHit(maxHit);
  const recordOfHit = { maxHit, defender, criticalHit };
  recordStore.update(() => recordOfHit);
}

function isCriticalHit(maxHit) {
  return maxHit = 40;
}
