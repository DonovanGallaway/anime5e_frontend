<script lang='ts'>
    import { type Character } from '../interfaces/character'
    import { type AttributeType } from '../interfaces/attribute'

    export let defect: AttributeType
    export let character: Character
    export let changeChar: Function
    export let changePoints: Function

    let details: string = ''
    let detail_show: boolean = false
    let current_rank: number = 1

</script>

<div>
    <span>{defect.attribute_name}</span>
    <span>Rank Cost: {defect.rank_cost}</span>
    <button on:click={()=>detail_show = true}>Add Attribute</button>
    <span>Ranks to Add: {current_rank}</span>
    <button on:click={()=>current_rank++}>+</button>
    <button on:click={()=>{if(current_rank >= 0){current_rank--}}}>-</button>
    {#if detail_show}
        <form>
            <label for='attribute'>Details:</label>
            <input type='text' bind:value={details}/>
            <button on:click={()=>{
                defect.details = details
                defect.current_rank = current_rank
                character.attributes?.push(defect)
                changeChar(character)
                changePoints(current_rank * defect.rank_cost)
                detail_show = false
            }}>Add</button>
            <button on:click={()=>detail_show = false}>x</button>
        </form>
    {/if}
</div>