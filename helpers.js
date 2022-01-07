import arg from 'arg'
import { METERS_PER_MAP_UNIT_LENGTH, VALID_FLAGS } from './constants.js'

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

export const rForGivenV = (v) => Math.ceil((v * v) / 127.0)

export const vForGivenR = (r) => Math.floor(Math.sqrt(127.0 * r))

export const minimumLengthInMapUnits = (meters) => Math.ceil(meters / METERS_PER_MAP_UNIT_LENGTH)

export const exitWithError = (message, ...extras) => {
    console.error('ERROR:', message, (extras.length ? extras : ''))
    process.exit(0)
}

export const showResults = (V, R, U) => console.log([
    'from v^2 = 127r',
    `Max design speed:\t${V} km/h`,
    `Radius min length:\t${R} m`,
    `Radius min # tiles:\t${U} u`,
    ].join("\n"))

export const getRandomAlphaString = (length = 1) => Array(length).fill(0).map(() => (10 + (parseInt(Math.random() * 1000) % 26)).toString(36)).join('')

export const getRandomPositiveInteger = (max = 1000) => parseInt(Math.random() * max, 10) + 1
