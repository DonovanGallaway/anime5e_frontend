<script lang='ts'>
    export let character:any
    export let ability:string
    export let total_points:number
    export let points_used:number
    export let changePoints:Function
    let points_remaining:number = total_points - points_used

    const changeAbilityPoints = (ability:string, value: number) => {
        if (points_remaining) {
            if(character.abilities[ability] === 0 && value < 0) return
            character.abilities[ability] += value
            changePoints(value)
        }
    }
</script>

<div class='ability'>
    <div class="ability-header">{ability}</div>
    <div>{character.abilities[ability]}</div>
    <div>Modifer</div>
    <div> {Math.floor((character.abilities[ability] - 10) / 2)}</div>
    <div class='plus-minus'>
        <button class='ability-button' on:click={()=>{changeAbilityPoints(ability,1)}}>+</button>
        <button class='ability-button' on:click={()=>{changeAbilityPoints(ability,-1)}}>-</button>
    </div>
</div>

<style>
    .ability {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 5px;
        font-size:1.5em;
        border: 1px solid black;
        border-radius: 10px;
    }

    .ability-header {
        font-weight: bold;
        font-size: 1.5em;
    }

    .ability-button {
        height:1.5em;
        width: 1.5em;
        font-size: 1em;
    }

</style>