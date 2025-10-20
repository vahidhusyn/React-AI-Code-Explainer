import { useActionState } from "react"
import { explain } from "../../actions"
import Error from "../Error"
import CodeExplanation from "../CodeExplanation"
import { useState } from "react";

const CodeExplainForm = () => {
  const [formState, formAction, isPending] = useActionState(explain, {
    success: null,
    data: null,
    error: null,

  });

  const [language, setLanguage] = useState("");
  const [code, setCode] = useState("");

  return (
    
    <div className='w-full max-w-2xl bg-white p-6 shadow-2xl'>
      
    <form action={formAction}>

      <label className='block mb-2 font-semibold'>Language: </label>
      <select name='language' value={language}
      onChange={(e)=>setLanguage(e.target.value)} className='border rounded-lg p-2 w-full mb-4 bg-transparent'>
        <option value="javascript">Javascript</option>
        <option value="HTML">HTML</option>
        <option value="python">Python</option>
        <option value="tailwind">Tailwind</option>
        <option value="react">React</option>
        <option value="css">CSS</option>
      </select>
      
      <label className='block mb-2 font-semibold'>Code: </label>
      <textarea name='code' required placeholder='Paste your code here'
      value={code} onChange={(e) => setCode(e.target.value)}
      className='border rounded-lg w-full p-3 font-mono text-sm bg bg-transparent min-h-[150px]'/>

      <button
      type="submit"
      disabled={isPending}
      className='mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50 hover:cursor-pointer'>
        {isPending ? "Explaining..." : "Explain Code"}
      </button>
    </form>

      {
      isPending ? (
        <p className="bg-gray-300 my-3 w-64 p-2 rounded-sm">Thinking...</p>
      ) : formState?.success ? 
      (
            <CodeExplanation explanation={formState?.data.answer.candidates[0].content.parts[0].text} />
      ) : formState?.success === false ? (
        <Error error={formState?.error} />
      ) : null
    }
    </div>
  );
};

export default CodeExplainForm;
