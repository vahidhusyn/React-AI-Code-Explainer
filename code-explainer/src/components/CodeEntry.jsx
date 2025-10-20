import CTA from "./CTA"
import Header from "./Header"
import CodeExplainForm from "./forms/CodeExplainForm"

const CodeEntry = ()=> {
  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <Header/>
      <CTA/>
      <CodeExplainForm/>
      
    </div>
  )
}

export default CodeEntry