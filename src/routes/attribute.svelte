<script lang='ts'>
    import { type Character } from '../interfaces/character'
    import { type AttributeType } from '../interfaces/attribute'

    export let attribute: AttributeType
    export let character: Character
    export let changeChar
    export let changePoints

    let details: string = ''
    let detail_show: boolean = false
    let current_rank: number = 1

</script>

<div>
    <span>{attribute.attribute_name}</span>
    <span>Rank Cost: {attribute.rank_cost}</span>
    <button on:click={()=>detail_show = true}>Add Attribute</button>
    <span>Ranks to Add: {current_rank}</span>
    <button on:click={()=>current_rank++}>+</button>
    <button on:click={()=>{if(current_rank >= 0){current_rank--}}}>-</button>
    {#if detail_show}
        <form>
            <label for='attribute'>Details:</label>
            <input type='text' bind:value={details}/>
            <button on:click={()=>{
                attribute.details = details
                attribute.current_rank = current_rank
                character.attributes?.push(attribute)
                changeChar(character)
                changePoints(current_rank * attribute.rank_cost)
                detail_show = false
            }}>Add</button>
            <button on:click={()=>detail_show = false}>x</button>
        </form>
    {/if}
</div>