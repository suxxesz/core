import type { Session } from '../../../shared/types/form.types.js';

const sessions = new Map();

export function createSession(id : string , data : Session ) {
    sessions.set(id, data);
}

export function getSession(id : string ) {
    return sessions.get(id);
}

export function updateSession(id : string , patch : Partial<Session>) {

    const session = sessions.get(id);

    if (!session) return;

    sessions.set(id, {
        ...session,
        ...patch
    });

}

export function removeSession(id : string ) {
    sessions.delete(id);
}

export function getAllSessions() {
    return [...sessions.values()];
}