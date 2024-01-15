<script lang='ts'>
    import Attribute from './Attribute.svelte'
    import attribute_list from '../lib/game_info/attributes.json'
    import { type Character } from '../interfaces/character'
    
    let total_points: number = 80;
    let points_used: number = 0;
    let character: Character = {
        attributes: []
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
        <h2>Total Points: {total_points}</h2>
        <button on:click={()=>total_points++}>+</button>
        <button on:click={()=>total_points--}>-</button>
    </div>
    <p>Points Remaining: {total_points - points_used}</p>
</div>

<div>
    <h2>Character</h2>
    Attributes:
    {#if character.attributes}
        {#each character.attributes as assigned_attribute, i}
           <div>
                {assigned_attribute.attribute_name} (assigned_attribute.details)
                Ranks: {assigned_attribute.current_rank} Cost: {assigned_attribute.current_rank * assigned_attribute.rank_cost}
                <button on:click={()=>{removeAttribute(assigned_attribute, i)}}>X</button>
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