<script lang='ts'>
    export let character:any
    export let total_points:number
    export let points_used:number
    export let changePointsUsed:Function
    let points_remaining:number = total_points - points_used

    const changePoints = (ability:string, value: number) => {
        if (points_remaining) {
            character.abilities[ability] += value
            changePointsUsed(value)
        } else {
            if(character.abilities[ability] === 0) return
            character.abilities[ability] -= value
            changePointsUsed(value)
        }
    }
</script>

<div>
    <h2>Abilities</h2>
    <div class='abilities'>
        <h3>Strength</h3>
        <h3> {character.abilities.strength}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('strength',1)}}>+</button>
            <button on:click={()=>{changePoints('strength',-1)}}>-</button>
        </div>
        
        <h3>Dexterity</h3>
        <h3> {character.abilities.dexterity}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('dexterity',1)}}>+</button>
            <button on:click={()=>{changePoints('dexterity',-1)}}>-</button>
        </div>

        <h3>Constitution</h3>
        <h3> {character.abilities.constitution}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('constitution',-1)}}>+</button>
            <button on:click={()=>{changePoints('constitution',-1)}}>-</button>
        </div>

        <h3>Intelligence</h3>
        <h3> {character.abilities.intelligence}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('intelligence',1)}}>+</button>
            <button on:click={()=>{changePoints('intelligence',-1)}}>-</button>
        </div>
        
        <h3>Wisdom</h3>
        <h3> {character.abilities.wisdom}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('wisdom',1)}}>+</button>
            <button on:click={()=>{changePoints('wisdom',-1)}}>-</button>
        </div>

        <h3>Charisma</h3>
        <h3> {character.abilities.charisma}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('charisma',1)}}>+</button>
            <button on:click={()=>{changePoints('charisma',-1)}}>-</button>
        </div>

    </div>
    
</div>

<style>
    .abilities {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .ability {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
    }

</style>