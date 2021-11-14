import assert from 'assert'
import ScoreHolder from './scoreHolder'

function testGetScore() {
    const sh = new ScoreHolder()
    sh.putScore('M1', 'SET 1 GAME 1 0-0')
    sh.putScore('M2', 'SET 1 GAME 1 0-0')
    sh.putScore('M2', 'SET 1 GAME 1 15-0')
    sh.putScore('M3', 'SET 2 GAME 3 0-30')

    assert.strict.equal(sh.getScore('M1'), 'SET 1 GAME 1 0-0')
    assert.strict.equal(sh.getScore('M2'), 'SET 1 GAME 1 15-0')
    assert.strict.equal(sh.getScore('M3'), 'SET 2 GAME 3 0-30')
}

function testGetHistory() {
    const sh = new ScoreHolder()
    sh.putScore('M1', 'SET 1 GAME 1 0-0')
    sh.putScore('M1', 'SET 1 GAME 1 15-0')

    assert.strict.deepStrictEqual(sh.getHistory('M1'), ['SET 1 GAME 1 0-0', 'SET 1 GAME 1 15-0'])
}

function testWaitForNextScore() {
    const sh = new ScoreHolder()
    setTimeout(() => {
        sh.putScore('M2', 'SET 2 GAME 2 40-0')
    }, 2000)

    sh.waitForNextScore('M2').then(score => assert.strict.equal(score, 'SET 2 GAME 2 40-0'));
}

async function testSubscribe() {
    const sh = new ScoreHolder()
    const values = ['SET 1 GAME 1 0-0', 'SET 1 GAME 1 15-0', 'SET 1 GAME 1 15-15']
    const putNext = () => {
        setTimeout(() => {
            const next = values.shift()
            if (next === undefined) return

            sh.putScore('M1', next)
            putNext()
        }, 100)
    }

    putNext()

    // Subscribe to score changes, add assertions, and unsubscribe when done.
    sh.subscribe("M1");
}

testGetScore()
testGetHistory()
testWaitForNextScore()
testSubscribe()
