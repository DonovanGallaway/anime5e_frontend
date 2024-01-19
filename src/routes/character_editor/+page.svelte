<script lang='ts'>
	import Ability from './Ability.svelte';
	import Abilities from './Abilites.svelte';
    import Attribute from './Attribute.svelte';
    import Defect from './Defect.svelte';
    import attribute_list from '../../lib/game_info/attributes.json'
    import defect_list from '../../lib/game_info/defects.json'
    import { type Character } from '../../interfaces/character'
    
    let total_points: number = 80;
    let points_used: number = 0;
    let character: Character = {
        name: "",
        level: 0,
        description: "",
        alignment: "",
        notes: "",
        hitPoints:0,
        energyPoints:0,
        movementSpeed:0,
        armorClass:0,
        attributes: [],
        abilities: {
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        },
        proficiencies: {
            weapons: [],
            armor: [],
            tools: [],
            skills: [],
            languages: []
        },
        equipment: {
            weapons: [],
            armor: [],
            tools: [],
            items: []
        }
    }

    let charAttributes = character.attributes.filter((att) => att.rank_cost > 0)
    let charDefects = character.attributes.filter((att) => att.rank_cost < 0)
    
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

    const removeDeffect = (deff: any, index: number) => {
        const point_change = deff.rank_cost * deff.current_rank
        const change = character.defects?.toSpliced(index, 1)
        character = {...character, defects: change}
        changePoints(0 - point_change)
    }

    const updateCharAttributes = () => {
        charAttributes = character.attributes.filter((att) => att.rank_cost > 0)
        charDefects = character.attributes.filter((att) => att.rank_cost < 0)
        console.log(charAttributes)
        console.log(charDefects)
    }

</script>

<div class='main'>

    <h1>Anime 5e Character Builder</h1>

    <div class="point-counter">
        <div>
            <div class='points_display'>
                <h2>Total Points:</h2>
                <input type="number" bind:value={total_points} on:change={(evt) => total_points = evt.target.value}/>
            </div>
            <div class='points-buttons'>
                <button on:click={()=>total_points++}>+</button>
                <button on:click={()=>total_points--}>-</button>
            </div>
        </div>
        <div>Points Remaining: {total_points - points_used}</div>
    </div>

    <div>
        <h2>Character</h2>
        <div class='abilities'>
            {#each Object.entries(character.abilities) as [ability, value]}
            <Ability 
                character={character}
                total_points={total_points} 
                points_used={points_used} 
                changePoints={changePoints}
                ability={ability}
            />
            {/each}
        </div>

        <!-- <Abilities 
            total_points={total_points} 
            points_used={points_used} 
            character={character}
            changePoints={changePoints}
            /> -->
        <!-- list of current character attributes -->

        <h2>Character Attributes</h2>

        {#if charAttributes}
            {#each charAttributes as att, i}
            <div>
                    {att.attribute_name} ({att.details})
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

    <!-- List of current character defects -->


    <h2>Character Defects</h2>

    {#if charDefects}
            {#each charDefects as deff, i}
            <div>
                    {deff.attribute_name} ({deff.details})
                    Ranks: {deff.current_rank} Cost: {deff.current_rank * deff.rank_cost}
                    <button on:click={()=>{removeDeffect(deff, i)}}>X</button>
                    <div>
                        Change Ranks
                        <button on:click={()=>{deff.current_rank++;changeChar(character);changePoints(deff.rank_cost)}}>+</button>
                        <button on:click={()=>{deff.current_rank--;changeChar(character);changePoints(-deff.rank_cost)}}>-</button>
                    </div>
            </div>     
            {/each}
        {/if}

    <!-- list of possible attributes -->
    <div class='attribute-defect'>
        <div>
            <h2>Attributes List</h2>
            {#each attribute_list as attribute}
                <Attribute attribute={attribute} character={character} changeChar={changeChar} changePoints={changePoints} updateCharAttributes={updateCharAttributes}/>
                <br>
            {/each}
            
        </div>

    <!-- List of possible defects -->
        <div>
            <h2>Defects List</h2>
            {#each defect_list as defect}
                <Defect defect={defect} character={character} changeChar={changeChar} changePoints={changePoints} updateCharAttributes={updateCharAttributes}/>
                <br>
            {/each}
            
        </div>
    </div>
</div>

<style>

    .main {
        display: flex;
        flex-direction: column;
        text-align: center;
    }
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

    .points-buttons{
        text-align: center;
    }

    .attribute-defect {
        display: flex;
        justify-content: space-around;
    }

    .abilities {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
        flex-wrap: wrap;
    }
</style>