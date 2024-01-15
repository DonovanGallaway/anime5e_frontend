import type { AttributeType } from "./attribute"
import type { AbilityType } from "./abilities"

interface Character{
    name?: string,
    level?: number,
    race?: string,
    description?: string,
    alignment?: string,
    notes?: string,
    hitpoints?: number,
    energyPoints?: number
    movementSpeed?: number,
    armorClass?: number,
    attributes?: [...any],
    abilities?: AbilityType,
    proficiencies?: any,
    backpack?: []
}

export type {Character}