<script>
  import { attack, battleStore } from "$lib/js/battle-store.js";
  import PokemonCard from "$lib/components/PokemonCard.svelte";

  function handleAttackClicked(attacker) {
    
    let defender = $battleStore.find(
      (defendingPokemon) => defendingPokemon.dexNumber !== attacker.dexNumber
    );
    
    attack(attacker, defender);
  }
</script>

<div class="mainDisplay">
  {#each $battleStore as item (item.dexNumber)}
    <PokemonCard pokemon={item} on:attackClicked={() => handleAttackClicked(item)} />
  {/each}
</div>

<style>
  .mainDisplay {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  @media (max-width: 600px) {
    .mainDisplay {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
