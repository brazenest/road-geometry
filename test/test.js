import { expect } from 'chai'
import { getRandomAlphaString, getRandomPositiveInteger, getUserArgs, createErrorMessage, produceResults } from './../helpers.js'

describe('flag aliases', function () {

    it('should interpret --r as --radius', function () {
        const argv = ['--r', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--r')).to.equal(false)
        expect(Object.keys(args).includes('--radius')).to.equal(true)
    })

    it('should interpret -r as --radius', function () {
        const argv = ['-r', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('-r')).to.equal(false)
        expect(Object.keys(args).includes('--radius')).to.equal(true)
    })

    it('should interpret --v as --velocity', function () {
        const argv = ['--v', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--v')).to.equal(false)
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
    })

    it('should interpret -v as --velocity', function () {
        const argv = ['-v', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('-v')).to.equal(false)
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
    })

    it('should interpret --speed as --velocity', function () {
        const argv = ['--speed', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--speed')).to.equal(false)
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
    })
})

describe('input is non-zero positive integer', function () {

    it('should accept for --velocity', function () {
        const argv = ['--velocity', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--velocity')).to.equal(true)
    })

    it('should accept for --radius', function () {
        const argv = ['--radius', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
    })

    it('should accept for both --radius and --velocity', function () {
        const argv = ['--velocity', getRandomPositiveInteger(), '--radius', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
    })
})

describe('input is zero', function () {

    it('should reject for --velocity', function () {
        const argv = ['--velocity', 0]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--velocity')).to.equal(true)
        expect(args['--velocity']).to.be.NaN
    })

    it('should reject for --radius', function () {
        const argv = ['--radius', 0]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(args['--radius']).to.be.NaN
    })

    it('should reject for --radius regardless of --velocity value', function () {
        const argv = ['--velocity', getRandomPositiveInteger(), '--radius', 0]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(args['--radius']).to.be.NaN
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
    })

    it('should reject for --velocity regardless of --radius value', function () {
        const argv = ['--velocity', 0, '--radius', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
        expect(args['--velocity']).to.be.NaN
    })
})

describe('input is negative integer', function () {

    it('should reject for --velocity', function () {
        const argv = ['--velocity', -1 * getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--velocity')).to.equal(true)
        expect(args['--velocity']).to.be.NaN
    })

    it('should reject for --radius', function () {
        const argv = ['--radius', -1 * getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(args['--radius']).to.be.NaN
    })

    it('should reject for --radius regardless of --velocity value', function () {
        const argv = ['--velocity', getRandomPositiveInteger(), '--radius', -1 * getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(args['--radius']).to.be.NaN
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
    })

    it('should reject for --velocity regardless of --radius value', function () {
        const argv = ['--velocity', -1 * getRandomPositiveInteger(), '--radius', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
        expect(args['--velocity']).to.be.NaN
    })
})

describe('input is not an integer', function () {

    it('should reject for --velocity', function () {
        const argv = ['--velocity', getRandomAlphaString(6)]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--velocity')).to.equal(true)
        expect(args['--velocity']).to.be.NaN
    })

    it('should reject for --radius', function () {
        const argv = ['--radius', getRandomAlphaString(6)]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(args['--radius']).to.be.NaN
    })

    it('should reject for --radius regardless of --velocity value', function () {
        const argv = ['--velocity', getRandomPositiveInteger(), '--radius', getRandomAlphaString(6)]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(args['--radius']).to.be.NaN
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
    })

    it('should reject for --velocity regardless of --radius value', function () {
        const argv = ['--velocity', getRandomAlphaString(6), '--radius', getRandomPositiveInteger()]
        const options = { argv }
        const args = getUserArgs(options)

        expect(Object.keys(args).includes('--radius')).to.equal(true)
        expect(Object.keys(args).includes('--velocity')).to.equal(true)
        expect(args['--velocity']).to.be.NaN
    })
})

describe('showErrorMessage', function () {

    it('responds as expected', function () {
        const message = getRandomAlphaString(10)
        const result = createErrorMessage(message)

        expect(result).to.be.instanceof(Error)
    })
})

describe('showResults', function () {

    it('responds as expected', function () {
        const V = 55
        const R = 80
        const U = 10
        const message = produceResults(V, R, U)

        expect(message).to.equal("using: e + f = v^2 / 127r, e = 0, f = 0.3\nMax design speed:	55 km/h (34 mi/h)\nRadius min length:	80 m (262 ft)\nRadius min # tiles:	10 u")
    })
})