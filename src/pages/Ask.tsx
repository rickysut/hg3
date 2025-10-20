import { useState } from 'react'
import type { FormEvent } from 'react'
import { supabase } from '../supabaseClient'
import type { DatabaseQuestion } from '../types'

export default function Ask() {
    const [name, setName] = useState('')
    const [question, setQuestion] = useState('')
    const [submitted, setSubmitted] = useState(false)

    async function submitForm(e: FormEvent) {
        e.preventDefault()
        
        if (!question.trim()) {
            return
        }

        const questionData: Partial<DatabaseQuestion> = {
            question: question.trim(),
            name: name.trim() || undefined,
            status: 'pending'
        }

        const { error } = await supabase.from('questions').insert([questionData])
        if (!error) setSubmitted(true)
    }

    if (submitted)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 ">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Terima kasih!</h2>
                    <p className="text-gray-600">Pertanyaan kamu sudah terkirim.</p>
                </div>
            </div>
        )

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10 pt-5">
            <div className="w-full max-w-lg">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-700 to-indigo-900 p-6 text-center">
                        <h1 className="text-2xl font-bold text-white mb-2">Pertanyaan</h1>
                        <p className="text-blue-100">Isi pertanyaan kamu disini ya.</p>
                    </div>
                    
                    <form onSubmit={submitForm} className="p-6 space-y-5">
                        <div>
                            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                                Pertanyaan <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="question"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                                placeholder="Tulis disini pertanyaannya..."
                                rows={4}
                                required
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Nama<span className="text-gray-400">(boleh tidak diisi)</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                placeholder=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Kirim
                        </button>
                    </form>
                </div>
                
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        Malu bertanya, melayani jedak jeduk.
                    </p>
                </div>
            </div>
        </div>
    )
}
