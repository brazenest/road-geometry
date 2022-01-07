import { ArgEvaluators } from './arg-evaluators.js'

export const METERS_PER_MAP_UNIT_LENGTH = 8.0

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
