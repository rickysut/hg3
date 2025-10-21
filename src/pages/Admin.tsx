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

    async function deleteQuestion(id: string) {
        if (loading) return
        
        // Add confirmation dialog
        if (!window.confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')) {
            return
        }
        
        try {
            setLoading(true)
            
            const { error } = await supabase
                .from('questions')
                .delete()
                .eq('id', id)
                
            if (error) {
                console.error('Error deleting question:', error)
                return
            }
            
            fetchQuestions()
        } catch (error) {
            console.error('Unexpected error in deleteQuestion:', error)
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
                        <th className="p-2">Jawaban 1</th>
                        <th className="p-2">Jawaban 2</th>
                        <th className="p-2">Jawaban 3</th>
                        <th className="p-2 w-24">Nama</th>
                        <th className="p-2 w-24 text-center">Status</th>
                        <th className="p-2 w-24 text-center">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {(questions || []).map((q) => (
                        <tr key={q.id} className="border-t">
                            <td className="p-2">{q.answer_1}</td>
                            <td className="p-2">{q.answer_2}</td>
                            <td className="p-2">{q.answer_3}</td>
                            <td className="p-2">{q.name || '-'}</td>
                            <td className="p-2 text-center">{q.status}</td>
                            <td className="p-2 text-center">
                                <div className="flex gap-2 justify-center">
                                    <button
                                        onClick={() => setActive(q.id)}
                                        disabled={loading}
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                                        title="Tampilkan pertanyaan"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => deleteQuestion(q.id)}
                                        disabled={loading}
                                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
                                        title="Hapus pertanyaan"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
