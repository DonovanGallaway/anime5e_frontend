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