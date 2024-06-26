import { useCallback, useState ,useEffect,useRef} from 'react'

import './App.css'

function App() {
const [length,setlength]= useState(8);
const [numberallowed,setnumberallowed]= useState(false);
const[charallowed,setcharallowed]= useState(false);
const [password,setpassword]= useState("");
const passwordRef=useRef(null);



const passwordgenerator=useCallback(()=>{
let pass=""
let str="ABCDEFGHIZKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberallowed)str+="0123456789"
if(charallowed)str+="!#^())*&%$#^*(!(!)"
for(let i=1;i<=length;i++){
  let char=Math.floor(Math.random()*str.length+1);
  pass+=str.charAt(char);
}
setpassword(pass);
},[length,numberallowed,charallowed,setpassword])
const   copyPasswordtoClikboard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,length)
window.navigator.clipboard.writeText(password)
},[password])


useEffect(()=>{
  passwordgenerator();
},[passwordgenerator,length,numberallowed,charallowed,])

  return (
    <>
 <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
  <h1 className='text-white text-center my-3 text-lg'>Password Generator</h1>
  <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3 text-sm' 
      placeholder='Password'
      readOnly
     ref={passwordRef}
    />
    <button onClick={copyPasswordtoClikboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 ml-2 hover:bg-blue-500'>Copy</button> 
  </div>
  <div className='flex text-sm gap-x-2 flex-wrap'> 
    <div className='flex items-center gap-x-1 mb-2 w-full sm:w-auto'> 
      <input
        type="range"
        min={6}
        max={100}
        value={length}
        onChange={(e) => { setlength(e.target.value) }}
        className='cursor-pointer flex-grow sm:flex-initial w-full sm:w-auto'
      />
      <label className='whitespace-nowrap'>Length: {length}</label> 
    </div>
    <div className='flex items-center gap-x-1 mb-2 w-full sm:w-auto'>
      <input
        type="checkbox"
        defaultChecked={numberallowed}
        onChange={() => {setnumberallowed((prev) => !prev) }}
      />
      <label className='ml-1'>Numbers</label> 
    </div>
    <div className='flex items-center gap-x-1 mb-2 w-full sm:w-auto'>
      <input
        type="checkbox"
        defaultChecked={charallowed}
        onChange={() => { setcharallowed((prev) => !prev) }}
      />
      <label className='ml-1'>Characters</label>
    </div>
  </div>
</div>
    </>
  )
}

export default App
