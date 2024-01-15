<script lang='ts'>
	import Ability from './ability.svelte';
    import Attribute from './attribute.svelte';
    import attribute_list from '../lib/game_info/attributes.json'
    import { type Character } from '../interfaces/character'
    
    let total_points: number = 80;
    let points_used: number = 0;
    let character: Character = {
        attributes: [],
        abilities: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    }

    const changeChar = (changes: Character) => {
        character = {...changes}
    }

    const changePoints = (change: number) => {
        // can be positive or negative
        points_used += change
    }

    const removeAttribute = (att: any, index: number) => {
        const point_change = att.rank_cost * att.current_rank
        const change = character.attributes?.toSpliced(index, 1)
        character = {...character, attributes: change}
        changePoints(0 - point_change)
    }

</script>

<h1>Anime 5e Character Builder</h1>

<div class="point-counter">
    <div>
        <div class='points_display'>
            <h2>Total Points:</h2>
            <input type="number" bind:value={total_points}/>
        </div>
        <button on:click={()=>total_points++}>+</button>
        <button on:click={()=>total_points--}>-</button>
    </div>
    <p>Points Remaining: {total_points - points_used}</p>
</div>

<div>
    <h2>Character</h2>
    <Ability 
        total_points={total_points} 
        points_used={points_used} 
        character={character}
        changePoints={changePoints}
        />

    {#if character.attributes}
        {#each character.attributes as att, i}
           <div>
                {att.attribute_name} (att.details)
                Ranks: {att.current_rank} Cost: {att.current_rank * att.rank_cost}
                <button on:click={()=>{removeAttribute(att, i)}}>X</button>
                <div>
                    Change Ranks
                    <button on:click={()=>{att.current_rank++;changeChar(character);changePoints(att.rank_cost)}}>+</button>
                    <button on:click={()=>{att.current_rank--;changeChar(character);changePoints(-att.rank_cost)}}>-</button>
                </div>
           </div>     
        {/each}
    
    {/if}
</div>


<div>
    <h2>Attributes</h2>
    {#each attribute_list as attribute}
        <Attribute attribute={attribute} character={character} changeChar={changeChar} changePoints={changePoints}/>
        <br>
    {/each}
    
</div>

<style>
    .point-counter {
        display: flex;
        justify-content: space-between;
    }

    .points_display {
        display: flex;
        justify-content: space-between;
    }

    .point-counter button {
        height: 50px;
        width: 50px;
    }

    .point-counter input {
        height: 50px;
        width: 50px;
    }
</style>