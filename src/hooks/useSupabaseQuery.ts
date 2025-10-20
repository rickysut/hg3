import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import type { Question } from '../types'

interface SupabaseError {
    message: string;
    details?: string;
    hint?: string;
    code?: string;
}

interface SupabaseResult<T> {
    data: T | null;
    error: SupabaseError | null;
}

export function useSupabaseQuery<T>(
    queryFn: () => Promise<SupabaseResult<T>>,
    dependencies: unknown[] = []
) {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<SupabaseError | null>(null)

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await queryFn()

            if (result.error) {
                setError(result.error)
            } else {
                setData(result.data)
            }
        } catch (err) {
            setError({
                message: (err as Error).message || 'Unknown error occurred'
            })
        } finally {
            setLoading(false)
        }
    }, dependencies)

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return { data, loading, error, refetch: fetchData }
}

export function useActiveQuestion() {
    return useSupabaseQuery<Question>(
        async () => {
            const result = await supabase
                .from('questions')
                .select('*')
                .eq('status', 'active')
                .limit(1)
                .single()
            return result
        },
        []
    )
}

export function useQuestions() {
    return useSupabaseQuery<Question[]>(
        async () => {
            const result = await supabase
                .from('questions')
                .select('*')
                .order('inserted_at', { ascending: false })
            return result
        },
        []
    )
}

export function useQuestionsWithRealtime() {
    const { data, loading, error, refetch } = useQuestions()
    const [realtimeConnected, setRealtimeConnected] = useState(false)

    useEffect(() => {
        console.log('Setting up realtime subscription...')

        // Set up real-time subscription
        const channelName = `questions_changes_${Date.now()}`
        const subscription = supabase
            .channel(channelName)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'questions'
                },
                (payload) => {
                    console.log('New question inserted via realtime:', payload)
                    refetch()
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'questions'
                },
                (payload) => {
                    console.log('Question updated via realtime:', payload)
                    refetch()
                }
            )
            .subscribe((status, err) => {
                console.log('Subscription status:', status, err)
                if (status === 'SUBSCRIBED') {
                    console.log('Realtime subscription successfully established')
                    setRealtimeConnected(true)
                } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
                    console.error('Realtime subscription error:', status, err)
                    setRealtimeConnected(false)
                }
            })

        // Set up fallback polling if realtime fails
        let pollInterval: number | null = null
        const pollTimeout = setTimeout(() => {
            if (!realtimeConnected) {
                console.log('Realtime not connected, setting up fallback polling every 5 seconds')
                pollInterval = setInterval(() => {
                    console.log('Polling for new questions...')
                    refetch()
                }, 5000)
            }
        }, 3000) // Wait 3 seconds before starting polling

        // Cleanup subscription and polling on unmount
        return () => {
            console.log('Cleaning up realtime subscription')
            supabase.removeChannel(subscription)
            if (pollInterval) clearInterval(pollInterval)
            clearTimeout(pollTimeout)
        }
    }, [refetch, realtimeConnected])

    return { data, loading, error, refetch, realtimeConnected }
}