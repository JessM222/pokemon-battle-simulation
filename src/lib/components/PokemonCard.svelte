<script>
  import { battleStore, recordStore, attack, winner } from "$lib/js/battle-store";
  import kingImage from "$lib/assets/king.png";
  import confettiImage from "$lib/assets/confetti.gif";

  export let pokemon;

  let isUnderAttact = false;

  $: {
    if (pokemon.dexNumber === $recordStore?.defender?.dexNumber) {
      isUnderAttact = true;
      setTimeout(() => {
        isUnderAttact = false;
      }, 500);
    }
  }

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  function dispatchAttackClicked() {
    dispatch("attackClicked", pokemon);
  }
</script>

<div class="pokemonContainer">
  <div class="imageContainer">
    <img
      class:win={pokemon.dexNumber === winner?.dexNumber}
      class="kingImage"
      src={kingImage}
      alt="king"
    />
    <img
      class:win={pokemon.dexNumber === winner?.dexNumber}
      class="confettiImage"
      src={confettiImage}
      alt="confettiImage"
    />

    <img src="  {pokemon.imageUrl}" alt="pokemonImg" />
  </div>

  <div class="contentExcludingImg">
    <h2>
      {pokemon.name}
    </h2>
    <div
      class:underAttack={isUnderAttact}
      class:green={pokemon.hp > 20}
      class:red={pokemon.hp <= 20}
    >
      <div class="hpBarContainer" style="--remaininghp:{pokemon.hp};">
        {#if isUnderAttact == true && $recordStore.maxHit !== 40}
          <div class="maxHitAppearance">{-$recordStore.maxHit}</div>
        {:else if isUnderAttact == true && $recordStore.maxHit === 40}<div class="maxHitAppearance">
            Critical Hit!
          </div>
        {/if}

        <div class="remainingHp"></div>
        <div class="deductedHp"></div>
      </div>
      <h3>HP: {pokemon.hp}/{pokemon.maxHp}</h3>
    </div>
    <button on:click={dispatchAttackClicked} disabled={!pokemon.canAttack || pokemon.hp == 0}
      >ATTACK!</button
    >
  </div>
</div>

<style>
  .pokemonContainer {
    position: relative;
    width: 50%;
    border: 1px solid rgb(216, 215, 215);
    border-radius: 2%;
    box-shadow: 0 10px 8px 0 rgba(0, 0, 0, 0.19);
    padding: 0;
    overflow: hidden;
  }
  .contentExcludingImg {
    position: relative;
    padding: 10px 20px;
  }

  .imageContainer {
    background-color: rgb(247, 246, 244);
  }

  img {
    display: block;
    margin: auto;
  }

  .hpBarContainer {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    height: 40px;
    width: auto;
    border-radius: 2rem;
    overflow: hidden;
  }
  .remainingHp {
    flex: var(--remaininghp);
  }
  .green .remainingHp {
    background-color: #63d669;
  }
  .red .remainingHp {
    background-color: #f62f46;
  }
  h3 {
    text-align: center;
  }
  .red h3 {
    color: #f62f46;
  }

  .deductedHp {
    flex: calc(100 - var(--remaininghp));
    transition: flex 200ms ease-in;
    background-color: aliceblue;
  }

  button {
    font-size: large;
    font-weight: bold;
    height: 40px;
    width: 100%;
    border: #fff;
    border-radius: 8px;
    background-color: rgb(61, 138, 246);
    color: #fff;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: rgb(17, 82, 174);
  }

  button:focus,
  button:active {
    background-color: rgb(16, 40, 77);
    transition: none;
  }
  button:disabled {
    background-color: rgb(176, 171, 171);
    transition: none;
  }

  .underAttack .hpBarContainer {
    outline: #fd7c89df solid 3px;
    transition: outline 50ms ease-in-out;
  }

  .maxHitAppearance {
    font-size: 30px;
    font-weight: bolder;
    color: rgb(254, 33, 92);
    position: absolute;
    bottom: 40%;
    right: 10%;
    z-index: 40;
    opacity: 1;
    animation: moveMaxHit 800ms ease-in-out;
  }

  @keyframes moveMaxHit {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-125px);
      opacity: 0;
    }
  }

  .kingImage {
    position: absolute;
    top: 2%;
    right: 1%;
    z-index: 20;
    width: 25%;
   opacity: 0;
    visibility: hidden;
  }

  .confettiImage {
    position: absolute;
    right: 20%;
    opacity: 0;
    z-index: 10;
    visibility: hidden;
  }
  
  .win.kingImage{
    opacity: 1;
    transition: opacity 1000ms ease-in-out;
    visibility: visible;
  }

  .win.confettiImage{
    opacity: 0.6;
    transition: opacity 1000ms ease-in-out;
    visibility: visible;
  }
</style>
