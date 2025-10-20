import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useQuestionsWithRealtime } from '../hooks/useSupabaseQuery'

export default function Admin() {
    const { data: questions = [], refetch: fetchQuestions, realtimeConnected } = useQuestionsWithRealtime()
    const [loading, setLoading] = useState(false)
    
    // Debug log to track when questions update
    useEffect(() => {
        console.log('Admin page - Questions updated:', questions)
    }, [questions])

    async function setActive(id: string) {
        if (loading) return
        
        try {
            setLoading(true)
            
            const { error: resetError } = await supabase
                .from('questions')
                .update({ status: 'pending' })
                .neq('id', id)
                
            if (resetError) {
                console.error('Error resetting questions:', resetError)
                return
            }

            const { error: activateError } = await supabase
                .from('questions')
                .update({ status: 'active' })
                .eq('id', id)
                
            if (activateError) {
                console.error('Error activating question:', activateError)
                return
            }
            
            fetchQuestions()
        } catch (error) {
            console.error('Unexpected error in setActive:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 pt-20">
            <h1 className="text-2xl font-bold mb-4">Moderator Panel</h1>
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${realtimeConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-gray-600">
                        {realtimeConnected ? 'Real-time updates enabled' : 'Using polling mode (updates every 5 seconds)'}
                    </span>
                </div>
                <button
                    onClick={fetchQuestions}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors text-sm"
                >
                    Refresh Now
                </button>
            </div>
            <table className="w-full border table-fixed">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2">Question</th>
                        <th className="p-2 w-24">Name</th>
                        <th className="p-2 w-24 text-center">Status</th>
                        <th className="p-2 w-24 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {(questions || []).map((q) => (
                        <tr key={q.id} className="border-t">
                            <td className="p-2">{q.question}</td>
                            <td className="p-2">{q.name || '-'}</td>
                            <td className="p-2 text-center">{q.status}</td>
                            <td className="p-2 text-center">
                                <button
                                    onClick={() => setActive(q.id)}
                                    disabled={loading}
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Loading...' : 'Show'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
