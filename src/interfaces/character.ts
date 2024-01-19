import type { AbilityType } from "./abilities"

interface Character{
    name?: string,
    level?: number,
    race?: any,
    class?: any,
    description?: string,
    alignment?: string,
    notes?: string,
    hitPoints?: number,
    energyPoints?: number
    movementSpeed?: number,
    armorClass?: number,
    attributes?: [...any],
    defects?: [...any]
    abilities?: AbilityType,
    proficiencies?: any,
    backpack?: [],
    totalPoints?: number,
}

export type {Character}