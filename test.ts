import { Note, MIDINote } from "./connectable";
import { Interval, FreqRatio, JI } from "./intervals";
import { Util } from "./util";

// commas
let syntonic = new FreqRatio(81, 80),
    pythagorean = new FreqRatio(531441, 524288);

let a = new MIDINote(60);
let e1 = a.noteAbove(JI.third),
    e2 = a.noteAbove(JI.fifth.multiply(4)),
    comma = e1.intervalTo(e2).normalized();

console.log(comma.cents() == syntonic.cents());

e1 = a.noteAbove(JI.fifth.multiply(12));
comma = a.intervalTo(e1).normalized();

console.log(comma.cents() - pythagorean.cents());
console.log(pythagorean)


// demonstrating the "error" of different EDOs in representing pure prime ratios

// generate prime harmonics up to 7
let intervals = Util.generatePrimes(7).map((n) => new FreqRatio(n));

// check EDOs from 6 to 53
for (let base = 6; base <= 53; base++) {
    let total = 0;
    for (let interval of intervals) {
        console.log(interval + " error in " + base + "EDO: " + interval.errorFromET(base));
        total += Math.abs(interval.errorFromET(base));
    }
    console.log("total = " + total);
}
// minima for 3, 5, 7 are found at 12, 15, 19, 22, 31, 41, 53 (best by far)