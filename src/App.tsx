import { useEffect } from 'react';
import './App.css'

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    
    script.src = "https://3Dmol.org/build/3Dmol.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <>
        <h1>3D Molecule Viewer</h1>
        <div
            style={{height: "400px", width: "400px", position: 'relative'}}
            className='viewer_3Dmoljs'
            data-type="xyz"
            data-href="./src/assets/glucose.xyz"
            data-backgroundcolor='cyan'
            data-style='stick'></div>
    </>
  )
}

export default App