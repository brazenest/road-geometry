import { ArgEvaluators } from './arg-evaluators.js'

export const COEFFICIENT_OF_FRICTION = 0.3
export const FEET_PER_METER = 3.28084
export const METERS_PER_MAP_UNIT_LENGTH = 8.0
export const MILES_PER_KILOMETER = 0.621371

export const SPEED_LIMIT_INCREMENT = 5

export const VALID_FLAGS = {
    '--radius': {
        type: Number,
        aliases: ['--r', '-r'],
        evaluator: ArgEvaluators.PositiveInteger,
    },
    '--velocity': {
        type: Number,
        aliases: ['--v', '-v', '--speed'],
        evaluator: ArgEvaluators.PositiveInteger,
    },
}
