<script lang='ts'>
    import Attribute from './Attribute.svelte'
    import attribute_list from '../lib/game_info/attributes.json'
    import { type Character } from '../interfaces/character'
    
    let total_points: number = 80;
    let points_text: string = `${total_points}`
    let points_used: number = 0;
    let character: Character = {
        attributes: []
    }

    const changeChar = (changes: Character) => {
        character = {...changes}
    }

    const changePoints = (value: number) => {
        total_points -= value
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
        "I promise I'm here!"
        {#each character.attributes as assigned_attribute}
                <span>{assigned_attribute.attribute_name}</span>
        {/each}
    
    {/if}
</div>


<div>
    <h2>Attributes</h2>
    {#each attribute_list as attribute}
        <Attribute attribute={attribute} character={character} changeChar={changeChar}/>
    {/each}
    
</div>