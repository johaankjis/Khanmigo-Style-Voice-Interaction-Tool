"use client"

interface GraphQLResponse<T = any> {
  data?: T
  errors?: Array<{ message: string }>
}

export class GraphQLClient {
  private endpoint: string

  constructor(endpoint = "/api/graphql") {
    this.endpoint = endpoint
  }

  async query<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
    try {
      const response = await fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
      })

      const result: GraphQLResponse<T> = await response.json()

      if (result.errors) {
        throw new Error(result.errors[0].message)
      }

      return result.data as T
    } catch (error) {
      console.error("[] GraphQL query error:", error)
      throw error
    }
  }

  async mutate<T = any>(mutation: string, variables?: Record<string, any>): Promise<T> {
    return this.query<T>(mutation, variables)
  }
}

// Singleton instance
export const graphqlClient = new GraphQLClient()

// GraphQL queries and mutations
export const CREATE_SESSION = `
  mutation CreateSession {
    createSession {
      id
      createdAt
      transcripts {
        id
        text
        confidence
        timestamp
      }
    }
  }
`

export const ADD_TRANSCRIPT = `
  mutation AddTranscript($sessionId: ID!, $text: String!, $confidence: Float!) {
    addTranscript(sessionId: $sessionId, text: $text, confidence: $confidence) {
      id
      text
      confidence
      timestamp
      isFinal
    }
  }
`

export const GET_SESSION = `
  query GetSession($id: ID!) {
    session(id: $id) {
      id
      createdAt
      transcripts {
        id
        text
        confidence
        timestamp
        isFinal
      }
    }
  }
`

export const GET_SESSIONS = `
  query GetSessions {
    sessions {
      id
      createdAt
      transcripts {
        id
        text
        confidence
        timestamp
      }
    }
  }
`
