'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Каталог', href: '/catalog' },
  { name: 'Избранное', href: '/favorites' },
  { name: 'О нас', href: '/about' },
  { name: 'Контакты', href: '/contacts' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">
                АвтоСалон
              </Link>
            </div>

            {/* Десктопное меню */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    pathname === item.href
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <ThemeToggle />
            </div>

            {/* Мобильное меню */}
            <div className="flex md:hidden">
              <ThemeToggle />
              <Button
                variant="ghost"
                className="ml-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Открыть меню</span>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Мобильная навигация */}
          {isOpen && (
            <div className="md:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'block px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                      pathname === item.href
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
} 