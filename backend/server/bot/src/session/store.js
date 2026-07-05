const sessions = new Map();

export function createSession(id, data) {
    sessions.set(id, data);
}

export function getSession(id) {
    return sessions.get(id);
}

export function updateSession(id, patch) {

    const session = sessions.get(id);

    if (!session) return;

    sessions.set(id, {
        ...session,
        ...patch
    });

}

export function removeSession(id) {
    sessions.delete(id);
}

export function getAllSessions() {
    return [...sessions.values()];
}

export function pruneExpiredSessions(maxAgeMs) {
    const now = Date.now();
    let removed = 0;

    for (const [id, session] of sessions) {
        if (now - session.createdAt > maxAgeMs) {
            sessions.delete(id);
            removed++;
        }
    }

    return removed;
}