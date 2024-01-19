<script lang='ts'>
    import Ability from './Ability.svelte';

    export let character:any
    export let total_points:number
    export let points_used:number
    export let changePoints:Function
    let points_remaining:number = total_points - points_used
</script>

<div>
    <h2>Abilities</h2>

    

    <div class='abilities'>
        {#each Object.entries(character.abilities) as [ability, value]}
        <Ability 
            character={character}
            total_points={total_points} 
            points_used={points_used} 
            changePoints={changePoints}
            ability={ability}
            value={value}
        />
        {/each}
    </div>
    
</div>

<style>
    .abilities {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 80%;
        flex-wrap: wrap;
    }

    .ability {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 5px;
    }

</style>