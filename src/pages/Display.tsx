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
        <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col" >
            <div className="flex flex-col w-full space-y-3" >
                <div>
                    <label htmlFor="answer1" className="block mb-1 text-2xl font-medium text-gray-700 px-6 pt-4">
                        Apa yang anda sukai dan membuat anda bertumbuh di pelayanan HG3 Jam 11.00?
                    </label>
                    <div className="flex-1  p-4">
                        <textarea
                            className="w-full h-full p-4 text-3xl font-medium text-blue-600 bg-stone-200 bg-opacity-80 rounded-lg resize-none focus:outline-none overflow-y-auto"
                            value={question?.answer_1 || "Tidak ada data aktif"}
                            rows={3}
                            readOnly
                            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="answer2" className="block mb-1 text-2xl font-medium text-gray-700 px-6">
                        Ada saran atau masukkan untuk perbaikan pelayanan HG3 jam 11.00?
                    </label>
                    <div className="flex-1  p-4">
                        <textarea
                            className="w-full h-full p-4 text-3xl font-medium text-blue-600 bg-stone-200 bg-opacity-80 rounded-lg resize-none focus:outline-none overflow-y-auto"
                            value={question?.answer_2 || "Tidak ada data aktif"}
                            rows={3}
                            readOnly
                            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="answer3" className="block mb-1 text-2xl font-medium text-gray-700 px-6">
                        Ada pertanyaan lain yg ingin disampaikan?
                    </label>
                    <div className="flex-1  p-4">
                        <textarea
                            className="w-full h-full p-4 text-3xl font-medium text-blue-600 bg-stone-200 bg-opacity-80 rounded-lg resize-none focus:outline-none overflow-y-auto"
                            value={question?.answer_3 || "Tidak ada data aktif"}
                            rows={3}
                            readOnly
                            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                        />
                    </div>
                </div>
                {question?.name && (
                    <div className="py-8 pt-0 block mb-1 text-2xl font-medium text-gray-700 px-6">
                        <p className="text-2xl font-semibold text-blue-800">
                            Dari {question.name}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

