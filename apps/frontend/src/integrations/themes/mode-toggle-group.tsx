import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '@/integrations/themes/provider'

import { cn } from '@/lib/utils'
import { Button } from '@/shadcn/ui/button'
import { Card } from '@/shadcn/ui/card'

export function ModeToggleGroup({
  className = '',
}: {
  className?: string | undefined
}) {
  const { theme, setTheme } = useTheme()

  return (
    <Card
      className={cn(
        'flex max-w-min flex-row gap-2 rounded-full p-1 md:p-2',
        className,
      )}
    >
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        onClick={() => {
          setTheme('light')
        }}
        className="h-8 rounded-full"
      >
        <SunIcon />
        <span className="hidden md:block">Light</span>
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        onClick={() => {
          setTheme('dark')
        }}
        className="h-8 rounded-full"
      >
        <MoonIcon />
        <span className="hidden md:block">Dark</span>
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        onClick={() => {
          setTheme('system')
        }}
        className="h-8 rounded-full"
      >
        <MonitorIcon />
        <span className="hidden md:block">System</span>
      </Button>
    </Card>
  )
}
