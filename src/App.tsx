import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EditorProvider } from './hooks/useEditorContext'
import { Canvas } from './pages/Canvas'
import { Editor } from './pages/Editor'

function App() {
  return (
    <EditorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="canvas" element={<Canvas />} />
          <Route path="" element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </EditorProvider>
  )
}

export default App
