import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target } from 'lucide-react';

interface ObjectiveCardProps {
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

export function ObjectiveCard({ name, targetAmount, currentAmount, deadline, category }: ObjectiveCardProps) {
  const progress = (currentAmount / targetAmount) * 100;
  const formattedTarget = new Intl.NumberFormat('fr-FR').format(targetAmount);
  const formattedCurrent = new Intl.NumberFormat('fr-FR').format(currentAmount);
  const formattedDeadline = new Date(deadline).toLocaleDateString('fr-FR');

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{name}</span>
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {category}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Progression</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formattedCurrent} FCFA</span>
            <span>{formattedTarget} FCFA</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center text-sm text-gray-600">
            <Target className="h-4 w-4 mr-1" />
            <span>Objectif</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDeadline}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}