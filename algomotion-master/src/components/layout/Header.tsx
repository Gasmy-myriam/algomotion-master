import Link from 'next/link';
import { CodeXml } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Bubble Sort', href: '/bubble-sort' },
  { name: 'Binary Search', href: '/binary-search' },
  { name: 'AI Suggestions', href: '/suggest-visualization' },
];

export default function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <CodeXml className="h-8 w-8" />
          <span className="text-2xl font-bold font-headline">AlgoMotion</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <Button key={item.name} variant="ghost" asChild>
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>
        {/* Mobile Menu Trigger (optional, can be added later) */}
        {/* <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div> */}
      </div>
    </header>
  );
}
