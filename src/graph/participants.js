export const PARTICIPANTS = Object.freeze([
    "team", "investor", "advisor", "foundation", "community"
]);

/** Create independent participant state, preserving the caller's iteration order. */
export function createParticipantMap(valueFor = () => 0, order = PARTICIPANTS) {
    return new Map(order.map(participant => [participant, valueFor(participant)]));
}

/** Project the same participant names into the plain objects used by policies. */
export function createParticipantRecord(valueFor) {
    const record = {};
    PARTICIPANTS.forEach(participant => {
        record[participant] = valueFor(participant);
    });
    return record;
}
