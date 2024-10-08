import arg from 'arg'
import { COEFFICIENT_OF_FRICTION, FEET_PER_METER, METERS_PER_MAP_UNIT_LENGTH, MILES_PER_KILOMETER, VALID_FLAGS } from './constants.js'

export const getUserArgs = (options = {
    argv: process.argv.slice(2),
}) => {

    const validArgs = {}

    Object.entries(VALID_FLAGS).forEach(([flag, {type, aliases}]) => {
        validArgs[flag] = type
        aliases.forEach((alias) => {
            validArgs[alias] = flag
        })
    })

    const args = arg(validArgs, options)

    Object.entries(args)
    .filter(([flag,]) => flag !== '_')
    .forEach(([flag, value]) => {
        if (Object.keys(VALID_FLAGS[flag]).includes('evaluator')) {
            args[flag] = VALID_FLAGS[flag].evaluator(value)
        }
    })

    return args
}
// 0.70
export const rForGivenV = (v) => Math.ceil((v * v) / (COEFFICIENT_OF_FRICTION * 127.0))

export const vForGivenR = (r) => Math.floor(Math.sqrt(COEFFICIENT_OF_FRICTION * 127.0 * r))

export const minimumLengthInMapUnits = (meters) => Math.ceil(meters / METERS_PER_MAP_UNIT_LENGTH)

export const createErrorMessage = (message, ...extras) => Error([message, (extras.length ? extras : '')].join(' ').trim())

export const showResults = (V, R, U) => [
    'using: e + f = v^2 / 127r, e = 0, f = 0.3',
    `Max design speed:\t${V} km/h (${Math.floor(V * MILES_PER_KILOMETER)} mi/h)`,
    `Radius min length:\t${R} m (${Math.floor(R * FEET_PER_METER)} ft)`,
    `Radius min # tiles:\t${U} u`,
    ].join("\n")

export const getRandomAlphaString = (length = 1) => Array(length).fill(0).map(() => (10 + (parseInt(Math.random() * 1000) % 26)).toString(36)).join('')

export const getRandomPositiveInteger = (max = 1000) => parseInt(Math.random() * max, 10) + 1
