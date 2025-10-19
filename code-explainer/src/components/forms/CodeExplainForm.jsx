import { useActionState } from "react"
import { explain } from "../../actions"
import Error from "../Error"
import CodeExplanation from "../CodeExplanation"
import Markdown from 'react-markdown';

const CodeExplainForm = () => {
  const [formState, formAction, isPending] = useActionState(explain, {
    success: null,
    data: null,
    error: null,

  });

  return (
    
    <div className='w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg'>
      
    <form action={formAction}>

      <label className='block mb-2 font-semibold'>Language: </label>
      <select name='language' className='border rounded-lg p-2 w-full mb-4 bg-transparent'>
        <option value="javascript">Javascript</option>
        <option value="python">Python</option>
        <option value="tailwind">Tailwind</option>
        <option value="react">React</option>
      </select>
      
      <label className='block mb-2 font-semibold'>Enter your code here: </label>
      <textarea name='code' required placeholder='Paste your code here' className='border rounded-lg w-full p-3 font-mono text-sm bg bg-transparent min-h-[150px]'/>

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
        <div className="bg-gray-100 p-3 rounded shadow">
          <Markdown>
            {formState?.data.answer.candidates[0].content.parts[0].text}
          </Markdown>
        </div>
      ) : formState?.success === false ? (
        <Error error={formState?.error} />
      ) : null
    }
    </div>
  );
};

export default CodeExplainForm;
