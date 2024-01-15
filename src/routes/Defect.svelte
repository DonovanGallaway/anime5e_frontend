<script lang='ts'>
    import { type Character } from '../interfaces/character'
    import { type AttributeType } from '../interfaces/attribute'

    export let defect: AttributeType
    export let character: Character
    export let changeChar: Function
    export let changePoints: Function

    let details: string = ''
    let ability: string = ''
    let detail_show: boolean = false
    let current_rank: number = 1

</script>

{#if defect.id === 0 || defect.id === 6}
    <div>
        <span>{defect.attribute_name}</span>
        <span>Rank Cost: {defect.rank_cost}</span>
        <button on:click={()=>detail_show = true}>Add defect</button>
        <span>Ranks to Add: {current_rank}</span>
        <button on:click={()=>current_rank++}>+</button>
        <button on:click={()=>{if(current_rank >= 0){current_rank--}}}>-</button>
        {#if detail_show}
            <form>
                <input bind:group={ability} type='radio' name='strength' value='strength'/>
                <label for='strength'>Strength</label>
                <input bind:group={ability} type='radio' name='dexterity' value='dexterity'/>
                <label for='dexterity'>Dexterity</label>
                <input bind:group={ability} type='radio' name='constitution' value='constitution'/>
                <label for='constitution'>Constitution</label>
                <input bind:group={ability} type='radio' name='intelligence' value='intelligence'/>
                <label for='intelligence'>Intelligence</label>
                <input bind:group={ability} type='radio' name='wisdom' value='wisdom'/>
                <label for='wisdom'>Wisdom</label>
                <input bind:group={ability} type='radio' name='charisma' value='charisma'/>
                <label for='charisma'>Charisma</label>
                <button on:click={()=>{
                    defect.details = ability
                    defect.current_rank = current_rank
                    character.attributes?.push(defect)
                    character.abilities[ability] -= current_rank
                    changeChar(character)
                    changePoints(0 - current_rank)
                    detail_show = false
                }}>Add</button>
                <button on:click={()=>detail_show = false}>x</button>
            </form>
        {/if}
    </div>
{:else}
<div>
    <span>{defect.attribute_name}</span>
    <span>Rank Cost: {defect.rank_cost}</span>
    <button on:click={()=>detail_show = true}>Add defect</button>
    <span>Ranks to Add: {current_rank}</span>
    <button on:click={()=>current_rank++}>+</button>
    <button on:click={()=>{if(current_rank >= 0){current_rank--}}}>-</button>
    {#if detail_show}
        <form>
            <label for='defect'>Details:</label>
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
{/if}