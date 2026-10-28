import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Contador from './Contador';

export default function Hero() {
  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <Badge className="mx-auto">Portafolio en construcción</Badge>
        <CardTitle className="text-3xl">César Bugueño</CardTitle>
        <CardDescription>Desarrollador de software</CardDescription>
      </CardHeader>
      <CardContent>
        <Contador />
      </CardContent>
    </Card>
  );
}
