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
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-2 py-4 pt-5">
            <div className="w-full ">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden ">
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-900 p-2 text-center">
                        {/* <h1 className="text-2xl font-bold text-white mb-2">Pertanyaan</h1> */}
                        <p className="text-blue-100 text-2xl">Pertanyaan dari {question?.name ?? '-'}</p>
                    </div>
                    
                    <div className="p-6 space-y-5">
                        <div>
                            <div className="w-full px-4 py-3 text-5xl border border-gray-300 rounded-lg bg-gray-50 min-h-[100px] whitespace-pre-wrap">
                                {question?.question || "Tidak ada pertanyaan aktif"}
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}
