<script lang='ts'>
    import { type Character } from '../interfaces/character'
    import { type AttributeType } from '../interfaces/attribute'

    export let attribute: AttributeType
    export let character: Character
    export let changeChar

    let details: string = ''
    let detail_show: boolean = false

</script>

<div>
    <span>Attribute Name: {attribute.attribute_name}</span>
    <span>Rank Cost: {attribute.rank_cost}</span>
    <button on:click={()=>detail_show = true}>Add Attribute</button>
    {#if detail_show}
        <form>
            <label for='attribute'>Details:</label>
            <input type='text' bind:value={details}/>
            <button on:click={()=>{
                attribute.details = details;
                character = {...character, attributes: {...character.attributes, ...attribute}};
                detail_show = false
                changeChar(character)
            }}>Add</button>
            <button on:click={()=>detail_show = false}>x</button>
        </form>
    {/if}
</div>