import type { AttributeType } from "./attribute"
import type { AbilityType } from "./abilities"

interface Character{
    attributes?: [...any],
    abilities?: AbilityType,
}

export type {Character}