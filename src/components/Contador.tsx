import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Contador() {
  const [n, setN] = useState(0);
  return <Button onClick={() => setN(n + 1)}>Clics: {n}</Button>;
}
