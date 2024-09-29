import { getUserArgs, createErrorMessage, rForGivenV, vForGivenR, produceResults, minimumLengthInMapUnits } from './helpers.js'

const USER_ARGS = getUserArgs()
const USER_FLAGS = Object.keys(USER_ARGS)

if (!USER_FLAGS.includes('--velocity') && !USER_FLAGS.includes('--radius')) createErrorMessage('Must specify a radius and/or a velocity/speed.')
if (USER_FLAGS.includes('--velocity') && !(USER_ARGS['--velocity'] > 0)) createErrorMessage('Velocity must be a positive integer.')
if (USER_FLAGS.includes('--radius') && !(USER_ARGS['--radius'] > 0)) createErrorMessage('Radius must be a positive integer.')

const R = USER_FLAGS.includes('--radius') ? USER_ARGS['--radius'] : rForGivenV(USER_ARGS['--velocity'])
const V = USER_FLAGS.includes('--velocity') ? USER_ARGS['--velocity'] : vForGivenR(USER_ARGS['--radius'])
const U = minimumLengthInMapUnits(R)

try {
    const resultText = produceResults(V, R, U)
    console.info(resultText)
    process.exit(0)
} catch (err) {
    console.error(err)
    process.exit(1)
}
