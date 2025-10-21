import { useState } from 'react'
import type { FormEvent } from 'react'
import { supabase } from '../supabaseClient'
import type { DatabaseQuestion } from '../types'

export default function Ask() {
    const [name, setName] = useState('')
    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer3, setAnswer3] = useState('')
    const [submitted, setSubmitted] = useState(false)

    async function submitForm(e: FormEvent) {
        e.preventDefault()
        
        if (!answer1.trim()) {
            return
        }

        const answerData: Partial<DatabaseQuestion> = {
            answer_1: answer1.trim(),
            answer_2: answer2.trim(),
            answer_3: answer3.trim(),
            name: name.trim() || undefined,
            status: 'pending'
        }

        const { error } = await supabase.from('questions').insert([answerData])
        if (!error) setSubmitted(true)
    }

    if (submitted)
        return (
            <div className="flex items-center justify-center h-screen px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="w-full max-w-md p-6 text-center bg-white shadow-xl rounded-2xl">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full">
                        <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-gray-800">Terima kasih!</h2>
                    <p className="text-base text-gray-600">Suara kamu sudah terkirim.</p>
                </div>
            </div>
        )

    return (
        <div className="flex items-center justify-center px-2 py-4 pt-5 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="flex-1 flex items-center justify-center px-4 overflow-hidden">
                <div className="w-full max-w-lg">
                    
                    <form onSubmit={submitForm} className="space-y-3">
                        <div>
                            <label htmlFor="name" className="block mb-1 text-base font-medium text-gray-700">
                                Nama <span className="text-base text-gray-400">(boleh tidak diisi)</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="w-full px-3 py-2 text-base transition duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder=""
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="answer1" className="block mb-1 text-base font-medium text-gray-700">
                                Apa yang anda sukai dan membuat anda bertumbuh di pelayanan HG3 Jam 11.00?
                            </label>
                            <textarea
                                id="answer1"
                                className="w-full px-3 py-2 text-base transition duration-200 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Tulis jawaban Anda disini..."
                                rows={3}
                                required
                                value={answer1}
                                onChange={(e) => setAnswer1(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="answer2" className="block mb-1 text-base font-medium text-gray-700">
                                Ada saran atau masukkan untuk perbaikan pelayanan HG3 jam 11.00?
                            </label>
                            <textarea
                                id="answer2"
                                className="w-full px-3 py-2 text-base transition duration-200 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Tulis jawaban Anda disini..."
                                rows={3}
                                required
                                value={answer2}
                                onChange={(e) => setAnswer2(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="answer3" className="block mb-1 text-base font-medium text-gray-700">
                                Ada pertanyaan lain yg ingin disampaikan?
                            </label>
                            <textarea
                                id="answer3"
                                className="w-full px-3 py-2 text-base transition duration-200 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Tulis jawaban Anda disini..."
                                rows={3}
                                required
                                value={answer3}
                                onChange={(e) => setAnswer3(e.target.value)}
                            />
                        </div>
                        
                        
                        
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98] text-base"
                        >
                            Kirim
                        </button>
                        <div
                            className='w-full  mb-4 flex text-grey-700 font-light py-2 px-4  items-center justify-center text-sm'
                        ><p>Malu bertanya, Melayani jedak-jeduk</p></div>
                    </form>
                </div>
            </div>
            
           
        </div>
         
    )
}
