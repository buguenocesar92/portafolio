import { useState } from 'react';

export default function Contador() {
  const [n, setN] = useState(0);
  return (
    <button onClick={() => setN(n + 1)}>
      Clics: {n}
    </button>
  );
}
