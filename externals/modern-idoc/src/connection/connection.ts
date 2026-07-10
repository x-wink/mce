import { clearUndef } from '../utils'

export type ConnectionMode = 'straight' | 'orthogonal' | 'curved'

export interface ConnectionAnchor {
  id: string
  idx?: number
}

export interface Connection {
  start?: ConnectionAnchor
  end?: ConnectionAnchor
  mode?: ConnectionMode
}

export interface NormalizedConnection {
  start?: ConnectionAnchor
  end?: ConnectionAnchor
  mode: ConnectionMode
}

export function normalizeConnection(connection: Connection): NormalizedConnection {
  return clearUndef({
    start: connection.start,
    end: connection.end,
    mode: connection.mode ?? 'straight',
  })
}
