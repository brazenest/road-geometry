import arg from 'arg'
import { COEFFICIENT_OF_FRICTION, FEET_PER_METER, METERS_PER_MAP_UNIT_LENGTH, MILES_PER_KILOMETER, SPEED_LIMIT_INCREMENT, VALID_FLAGS } from './constants.js'

export const getUserArgs = (options = {
    argv: process.argv.slice(2),
}) => {

    const validArgs = {}

    Object.entries(VALID_FLAGS).forEach(([flag, { type, aliases }]) => {
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

export const rForGivenV = (v) => Math.ceil((v * v) / (COEFFICIENT_OF_FRICTION * 127.0))

export const vForGivenR = (r) => Math.floor(Math.sqrt(COEFFICIENT_OF_FRICTION * 127.0 * r))

export const metersToFeet = (meters) => Math.floor(meters * FEET_PER_METER)

export const kilometersToMiles = (kilometers) => Math.floor(kilometers * MILES_PER_KILOMETER)

export const minimumLengthInMapUnits = (meters) => Math.ceil(meters / METERS_PER_MAP_UNIT_LENGTH)

export const maximumSpeedLimitInGameIncrements = (speed) => Math.floor(speed / SPEED_LIMIT_INCREMENT) * SPEED_LIMIT_INCREMENT

export const createErrorMessage = (message, ...extras) => Error([message, (extras.length ? extras : '')].join(' ').trim())

export const produceResults = (V, R, U) => [
    'using: e + f = v^2 / 127r, e = 0, f = 0.3',
    `Max design speed:\t${V} km/h (${kilometersToMiles(V)} mi/h)`,
    `Radius min length:\t${R} m (${metersToFeet(R)} ft)`,
    `Radius min # units:\t${minimumLengthInMapUnits(R)}`,
    `Max game speed limit:\t${maximumSpeedLimitInGameIncrements(V)} km/h (${maximumSpeedLimitInGameIncrements(kilometersToMiles(V))} mi/h)`
].join("\n")

export const getRandomAlphaString = (length = 1) => Array(length).fill(0).map(() => (10 + (parseInt(Math.random() * 1000) % 26)).toString(36)).join('')

export const getRandomPositiveInteger = (max = 1000) => parseInt(Math.random() * max, 10) + 1
