import CTA from "./CTA"
import Header from "./Header"
import CodeExplainForm from "./forms/CodeExplainForm"
import "../App.css"
import Footer from "./Footer"

const CodeEntry = ()=> {
  return (
    <div className="min-h-screen flex flex-col items-center my-4">
      <Header/>
      <CTA/>
      <CodeExplainForm/>
      <Footer/>
      
    </div>
    
  )
}

export default CodeEntry