<script lang='ts'>
    export let character:object
    export let total_points:number
    export let points_used:number
    let points_remaining:number = total_points - points_used
    export let points_text:string
    export let abilities:object

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
    <div>
        <h3>Strength</h3>
        <button on:click={()=>{changePoints('strength',1,true)}}>+</button>
        <button on:click={()=>{changePoints('strength',1,false)}}>-</button>
        
        <h3>Dexterity</h3>
        <button on:click={()=>{changePoints('dexterity',1,true)}}>+</button>
        <button on:click={()=>{changePoints('dexterity',1,false)}}>-</button>

        <h3>Constitution</h3>
        <button on:click={()=>{changePoints('constitution',1,true)}}>+</button>
        <button on:click={()=>{changePoints('constitution',1,false)}}>-</button>

        <h3>Intelligence</h3>
        <button on:click={()=>{changePoints('intelligence',1,true)}}>+</button>
        <button on:click={()=>{changePoints('intelligence',1,false)}}>-</button>
        
        <h3>Wisdom</h3>
        <button on:click={()=>{changePoints('wisdom',1,true)}}>+</button>
        <button on:click={()=>{changePoints('wisdom',1,false)}}>-</button>

        <h3>Charisma</h3>
        <button on:click={()=>{changePoints('charisma',1,true)}}>+</button>
        <button on:click={()=>{changePoints('charisma',1,false)}}>-</button>

    </div>
    
</div>
