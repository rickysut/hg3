import { useEffect } from 'react'
import { useActiveQuestion } from '../hooks/useSupabaseQuery'

export default function Display() {
    const { data: question, error, refetch } = useActiveQuestion()

    useEffect(() => {
        const interval = setInterval(refetch, 5000)
        return () => clearInterval(interval)
    }, [refetch])

    if (error) {
        console.error('Error fetching active question:', error)
    }

    return (
        <div className="h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col" style={{ height: '100dvh', maxHeight: '100dvh', overflow: 'hidden' }}>
            <div className="flex flex-col" style={{ height: '90vh' }}>
                <div className="flex-1 min-h-0 p-8">
                    <textarea
                        className="w-full h-full p-8 text-4xl font-medium text-white bg-gray-700 bg-opacity-80 rounded-lg resize-none focus:outline-none overflow-y-auto"
                        value={question?.question || "Tidak ada data aktif"}
                        readOnly
                        placeholder="Pertanyaan akan muncul di sini..."
                        style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                    />
                </div>
                {question?.name && (
                    <div className="p-8 pt-0">
                        <p className="text-2xl font-semibold text-blue-800">
                            Dari {question.name}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

