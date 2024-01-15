<script lang='ts'>
    export let character:object
    export let total_points:number
    export let points_used:number
    let points_remaining:number = total_points - points_used

    const abilities = character.abilities

    const changePoints = (ability:string, value: number, isPositive:boolean) => {
        if (isPositive && points_remaining) {
            character.abilities[ability] += value
            total_points -= value
        } else {
            character.abilities[ability] -= value
            total_points += value
        }
    }
</script>

<div>
    <h2>Abilities</h2>
    <div class='abilities'>
        <h3>Strength</h3>
        <h3> {abilities.strength}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('strength',1,true)}}>+</button>
            <button on:click={()=>{changePoints('strength',1,false)}}>-</button>
        </div>
        
        <h3>Dexterity</h3>
        <h3> {abilities.dexterity}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('dexterity',1,true)}}>+</button>
            <button on:click={()=>{changePoints('dexterity',1,false)}}>-</button>
        </div>

        <h3>Constitution</h3>
        <h3> {abilities.constitution}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('constitution',1,true)}}>+</button>
            <button on:click={()=>{changePoints('constitution',1,false)}}>-</button>
        </div>

        <h3>Intelligence</h3>
        <h3> {abilities.intelligence}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('intelligence',1,true)}}>+</button>
            <button on:click={()=>{changePoints('intelligence',1,false)}}>-</button>
        </div>
        
        <h3>Wisdom</h3>
        <h3> {abilities.wisdom}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('wisdom',1,true)}}>+</button>
            <button on:click={()=>{changePoints('wisdom',1,false)}}>-</button>
        </div>

        <h3>Charisma</h3>
        <h3> {abilities.charisma}</h3>
        <div class='ability'>
            <button on:click={()=>{changePoints('charisma',1,true)}}>+</button>
            <button on:click={()=>{changePoints('charisma',1,false)}}>-</button>
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