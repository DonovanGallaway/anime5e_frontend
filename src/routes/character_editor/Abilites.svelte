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
        <!-- {console.log(Object.keys(character.abilities))} -->

        {#each Object.entries(character.abilities) as [ability, value]}
        <!-- {console.log(ability, value)} -->
        <Ability 
            character={character}
            total_points={total_points} 
            points_used={points_used} 
            changePoints={changePoints}
            ability={ability}
            value={value}
        />
        {/each}

        <!-- <div class='ability'>
            <div class="ability-header">Strength</div>
            <div> {character.abilities.strength}</div>
            <div>Modifer</div>
            <div> {Math.floor((character.abilities.charisma - 10) / 2)}</div>
            <div class='plus-minus'>
                <button on:click={()=>{changePoints('strength',1)}}>+</button>
                <button on:click={()=>{changePoints('strength',-1)}}>-</button>
            </div>
        </div>
        
        <div class='ability'>
            <div>Dexterity</div>
            <div> {character.abilities.dexterity}</div>
            <div>Modifer</div>
            <div> {Math.floor((character.abilities.charisma - 10) / 2)}</div>
            <div class='plus-minus'>
                <button on:click={()=>{changePoints('dexterity',1)}}>+</button>
                <button on:click={()=>{changePoints('dexterity',-1)}}>-</button>
            </div>
        </div>

        <div class='ability'>
            <div>Constitution</div>
            <div> {character.abilities.constitution}</div>
            <div>Modifer</div>
            <div> {Math.floor((character.abilities.charisma - 10) / 2)}</div>
            <div class='plus-minus'>
                <button on:click={()=>{changePoints('constitution',1)}}>+</button>
                <button on:click={()=>{changePoints('constitution',-1)}}>-</button>
            </div>
       </div>

        <div class='ability'>
            <div>Intelligence</div>
            <div> {character.abilities.intelligence}</div>
            <div>Modifer</div>
            <div> {Math.floor((character.abilities.charisma - 10) / 2)}</div>
            <div class='plus-minus'>
                <button on:click={()=>{changePoints('intelligence',1)}}>+</button>
                <button on:click={()=>{changePoints('intelligence',-1)}}>-</button>
            </div>
        </div>
        
        <div class='ability'>
            <div>Wisdom</div>
            <div> {character.abilities.wisdom}</div>
            <div>Modifer</div>
            <div> {Math.floor((character.abilities.charisma - 10) / 2)}</div>
            <div class='plus-minus'>
                <button on:click={()=>{changePoints('wisdom',1)}}>+</button>
                <button on:click={()=>{changePoints('wisdom',-1)}}>-</button>
            </div>
        </div>

        <div class='ability'>
            <div>Charisma</div>
            <div> {character.abilities.charisma}</div>
            <div>Modifer</div>
            <div> {Math.floor((character.abilities.charisma - 10) / 2)}</div>
            <div class='plus-minus'>
                <button on:click={()=>{changePoints('charisma',1)}}>+</button>
                <button on:click={()=>{changePoints('charisma',-1)}}>-</button>
             </div>
        </div> -->

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