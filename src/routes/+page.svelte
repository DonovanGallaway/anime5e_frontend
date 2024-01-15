<script lang='ts'>
    let total_points: number = 80;
    let points_text: string = `${total_points}`
    let points_used: number = 0;

    const changePoints = (value: number) => {
        total_points -= value
    }
</script>

<h1>Anime 5e Character Builder</h1>

<div class="point-counter">
    <div>
        <h2>Total Points: {total_points}</h2>
        <button on:click={()=>total_points++}>+</button>
        <button on:click={()=>total_points--}>-</button>
    </div>
    <p>Points Remaining: {total_points - points_used}</p>
</div>

<div>
    <h2>Abilities</h2>
    
</div>

<div>
    <h2>Attributes</h2>

</div>