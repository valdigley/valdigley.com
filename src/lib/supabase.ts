import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Check if we're using placeholder values or if tables don't exist
const isUsingPlaceholders = supabaseUrl === 'https://placeholder.supabase.co' || supabaseKey === 'placeholder-key'

if (isUsingPlaceholders && import.meta.env.DEV) {
  console.warn('Supabase environment variables not configured. Using mock data.')
}

// Create a mock client that doesn't make network requests when using placeholders
const createMockSupabaseClient = () => ({
  from: () => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          limit: () => Promise.resolve({ data: null, error: { message: 'Mock client - using fallback data', code: 'MOCK_ERROR' } }),
          single: () => Promise.resolve({ data: null, error: { message: 'Mock client - using fallback data', code: 'MOCK_ERROR' } })
        }),
        single: () => Promise.resolve({ data: null, error: { message: 'Mock client - using fallback data', code: 'MOCK_ERROR' } })
      }),
      order: () => ({
        limit: () => Promise.resolve({ data: null, error: { message: 'Mock client - using fallback data', code: 'MOCK_ERROR' } })
      }),
      limit: () => Promise.resolve({ data: null, error: { message: 'Mock client - using fallback data', code: 'MOCK_ERROR' } }),
      single: () => Promise.resolve({ data: null, error: { message: 'Mock client - using fallback data', code: 'MOCK_ERROR' } })
    }),
    insert: () => Promise.resolve({ data: null, error: { message: 'Mock client - insert not available', code: 'MOCK_ERROR' } }),
    update: () => ({
      eq: () => Promise.resolve({ data: null, error: { message: 'Mock client - update not available', code: 'MOCK_ERROR' } })
    }),
    delete: () => ({
      eq: () => Promise.resolve({ data: null, error: { message: 'Mock client - delete not available', code: 'MOCK_ERROR' } })
    })
  }),
  auth: {
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Mock auth - not available', code: 'MOCK_ERROR' } }),
    signOut: () => Promise.resolve({ error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  }
})

// Create the real client but wrap it to handle table not found errors
const createRealSupabaseClient = () => {
  const client = createClient(supabaseUrl, supabaseKey)
  
  // Wrap the from method to catch table not found errors
  const originalFrom = client.from.bind(client)
  client.from = (table: string) => {
    const query = originalFrom(table)
    
    // Wrap query methods to handle 404 errors gracefully
    const wrapQuery = (originalQuery: any) => {
      const wrappedQuery = { ...originalQuery }
      
      // Wrap methods that return promises
      const methodsToWrap = ['select', 'insert', 'update', 'delete', 'upsert']
      
      methodsToWrap.forEach(method => {
        if (originalQuery[method]) {
          const originalMethod = originalQuery[method].bind(originalQuery)
          wrappedQuery[method] = (...args: any[]) => {
            const result = originalMethod(...args)
            
            // If it's a query builder, wrap it recursively
            if (result && typeof result === 'object' && !result.then) {
              return wrapQuery(result)
            }
            
            // If it's a promise, catch 404 errors
            if (result && result.then) {
              return result.catch((error: any) => {
                if (error?.message?.includes('Could not find the table') || 
                    error?.code === 'PGRST205' ||
                    error?.status === 404) {
                  console.warn(`Table '${table}' not found in Supabase. Using fallback data.`)
                  return { data: null, error: { message: 'Table not found - using fallback data', code: 'TABLE_NOT_FOUND' } }
                }
                throw error
              })
            }
            
            return result
          }
        }
      })
      
      // Wrap chaining methods
      const chainingMethods = ['eq', 'neq', 'gt', 'gte', 'lt', 'lte', 'like', 'ilike', 'is', 'in', 'contains', 'containedBy', 'rangeGt', 'rangeGte', 'rangeLt', 'rangeLte', 'rangeAdjacent', 'overlaps', 'textSearch', 'match', 'not', 'or', 'filter', 'order', 'limit', 'range', 'single', 'maybeSingle']
      
      chainingMethods.forEach(method => {
        if (originalQuery[method]) {
          const originalMethod = originalQuery[method].bind(originalQuery)
          wrappedQuery[method] = (...args: any[]) => {
            const result = originalMethod(...args)
            return wrapQuery(result)
          }
        }
      })
      
      return wrappedQuery
    }
    
    return wrapQuery(query)
  }
  
  return client
}

export const supabase = isUsingPlaceholders 
  ? createMockSupabaseClient() as any
  : createRealSupabaseClient()