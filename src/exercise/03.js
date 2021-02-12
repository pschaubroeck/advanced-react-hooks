// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext(null);

function CountProvider({children}) {
    const [ count, setCount ] = React.useState(0);
    
    const { Provider } = CountContext;
    return <Provider value={[
        count,
        setCount
    ]}>
        {children}
    </Provider>
}

function useCount() {
    const countContext = React.useContext(CountContext);
    if (countContext === null) {
        throw new Error('useCount must be used within a CountProvider')
    }
    
    return [ ...countContext ];
}

function CountDisplay() {
  const [ count ] = useCount();

  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const [ ,setCount ] = useCount();
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
          <CountDisplay />
          <Counter />
      </CountProvider>
    </div>
  )
}

export default App
