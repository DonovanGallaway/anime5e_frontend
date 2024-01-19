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
        name: "KorsKov",
        level: 0,
        race:"Yordle",
        class:"Duelist",
        description: "",
        alignment: "Chaotic Neutral",
        notes: "",
        hitPoints:20,
        energyPoints:15,
        armorClass:19,
        movementSpeed:60,
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

    let {hitPoints, energyPoints, movementSpeed, armorClass} = character

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
        console.log(att)
        const point_change = att.rank_cost * att.current_rank
        console.log(point_change)
        if(att.id === 0 || (att.id === 4 && att.rank_cost > 0)){
            character.abilities[att.details] -= point_change
        }
        const change = character.attributes?.toSpliced(character.attributes.indexOf(att), 1)
        character.attributes = change
        changeChar(character)
        changePoints(0 - point_change)
        updateCharAttributes()
    }

    const removeDefect = (def: any, index: number) => {
        console.log(def)
        const point_change = def.rank_cost * def.current_rank
        console.log(point_change)
        if(def.id === 0 || (def.id === 6 && def.rank_cost > 0)){
            character.abilities[def.details] += point_change
        }
        const change = character.attributes?.toSpliced(character.attributes.indexOf(def), 1)
        character.attributes = change
        changeChar(character)
        changePoints(0 - point_change)
        updateCharAttributes()
    }

    const updateCharAttributes = () => {
        charAttributes = character.attributes.filter((att) => att.rank_cost > 0)
        charDefects = character.attributes.filter((att) => att.rank_cost < 0)
    }

</script>

<div class='main'>

    <h1>Anime 5e Character Builder</h1>
    <div class="base-info">
        <h2 class="char-name">KorsKov</h2>
        <h3 class="level">Level: {character.level}</h3>
    </div>


    <div class='char-info'>

        <img class='char-img' alt="Character Portrait" src='https://cdn.discordapp.com/attachments/1195836599716556911/1195852459323691108/DALLE_2024-01-12_21.42.20_-_A_fantasy_portrait_of_a_pirate_Yordle_a_small_formidable_creature_known_for_being_a_competent_fighter._Hes_decked_out_in_an_ornate_captains_coat_a.png?ex=65b57f64&is=65a30a64&hm=c61c6b0aa5545edd471d549455199b43dd727d36fa7d6806e4606ce37bdd1180&'/>

        <div class='stats'>
            <div class="stat">
                HP <input class='stat-input' type="number" bind:value={hitPoints} on:change={(evt) => total_points = evt.target.value}/>
            </div>
            <div class="stat">
                EP <input class='stat-input' type="number" bind:value={energyPoints} on:change={(evt) => total_points = evt.target.value}/>
            </div>
            <div class="stat">
                AC <input class='stat-input' type="number" bind:value={armorClass} on:change={(evt) => total_points = evt.target.value}/>
            </div>
            <div class="stat">
                Speed: <input class='stat-input' type="number" bind:value={movementSpeed} on:change={(evt) => total_points = evt.target.value}/>
            </div>
        </div>

        <div class="point-counter">
            <div class='points_display'>
                <h2>Total Points:</h2>
                <input type="number" bind:value={total_points} on:change={(evt) => total_points = evt.target.value}/>
            </div>
            <div class='points-buttons'>
                <button on:click={()=>total_points++}>+</button>
                <button on:click={()=>total_points--}>-</button>
            </div>
            <div style="font-weight:bold; font-size:1em;">Points Remaining: {total_points - points_used}</div>
        </div>
    </div>

    <div>
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
            {#each charDefects as def, i}
            <div>
                    {def.attribute_name} ({def.details})
                    Ranks: {def.current_rank} Cost: {def.current_rank * def.rank_cost}
                    <button on:click={()=>{removeDefect(def, i)}}>X</button>
                    <div>
                        Change Ranks
                        <button on:click={()=>{def.current_rank++;changeChar(character);changePoints(def.rank_cost)}}>+</button>
                        <button on:click={()=>{def.current_rank--;changeChar(character);changePoints(-def.rank_cost)}}>-</button>
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
        background-color: rgb(190, 190, 255);
        box-sizing: border-box;
    }

    .base-info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 25px;
        font-size: 3em;
        gap: 25px;
    }

    .char-info {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        margin-bottom:25px;
    }

    .char-img {
        width: 20%;
    }

    .stats{
        display:flex;
        justify-content: space-around;
        width: 50%;
    }

    .stat {
        display: flex;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        margin: 0 10px;
        border: 1px solid black;
        border-radius: 50%;
        height: 4em;
        width: 4em;
        font-size: 2em;
        font-weight: bold;
    }

    .stat-input {
        width: 1.5em;
        border-radius: 5px;
        align-self: center;
        text-align: center;;
        font-size: 1em;
    }

    .point-counter {
        display: flex;
        flex-direction: column;
    }

    .points_display {
        display: flex;
        text-align: center;
        flex-direction: row;
        justify-content: center;
    }

    .points_display input {
        width: 3em;
        border-radius: 5px;
        align-self: center;
        text-align: center;;
        font-size: 1em;
    }

    .point-counter button {
        height:1.5em;
        width: 1.5em;
        font-size: 1em;
    }

    .point-counter input {
        height: 2em;
        width: 2em;
        text-align: center;
        vertical-align: bottom;
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

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
         -webkit-appearance: none;
        margin: 0;
}

</style>