import { Card, CardContent } from '@/components/ui/card'

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Card className="border-destructive">
      <CardContent className="p-6">
        <p className="text-destructive text-center">{message}</p>
      </CardContent>
    </Card>
  )
}
