import * as tune from "../index";

let notes = [
        new tune.ETPitch(60), 
        new tune.Frequency(300),
        new tune.ETPitch(12, 11),
        new tune.MIDINote(23, 70)
    ],
    intervals = [
        new tune.FreqRatio(3, 2),
        new tune.ETInterval(9, 19),
        new tune.ETInterval(12, 12),
        tune.Interval.octave,
        tune.JI.eleventh,
        tune.JI.third
    ];

test("Intervals above a note return the same type of Note",() => {
    for (let note of notes) {
        for (let interval of intervals) {
            expect(note.noteAbove(interval).constructor.name).toBe(note.constructor.name);
        }
    }
});

test("Conversion preserves pitch values",() => {
    for (let note of notes) {
        let a = note.asFrequency(),
            b = note.asET();
        expect(a.getFrequency()).toBeCloseTo(note.getFrequency());
        expect(b.getFrequency()).toBeCloseTo(note.getFrequency());
        for (let base = 2; base < 24; base++) {
            expect(a.getETPitch(base)).toBeCloseTo(note.getETPitch(base));
            expect(a.getETPitch(base)).toBeCloseTo(note.getETPitch(base));
        }
    }
});

test("Can only create positive nonzero frequencies",() => {
    expect(() => new tune.Frequency(0)).toThrow();
    expect(() => new tune.Frequency(-2)).toThrow();
    expect(() => new tune.Frequency(NaN)).toThrow();
});

test("Can't create NaN ET fractions", () => {
    expect(() => new tune.ETPitch(2, 0)).toThrow();
    expect(() => new tune.ETPitch(NaN)).toThrow();
    expect(() => new tune.ETPitch(45, NaN)).toThrow();
    expect(() => new tune.ETPitch(NaN, NaN)).toThrow();
})