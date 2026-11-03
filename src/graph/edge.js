import { createParticipantMap } from './participants.js';

const EDGE_PARTICIPANTS = ["team", "investor", "foundation", "advisor", "community"];

export class Edge {

    constructor(distribution) {
        this.distribution = createParticipantMap(participant => distribution[participant], EDGE_PARTICIPANTS);
    }

}
