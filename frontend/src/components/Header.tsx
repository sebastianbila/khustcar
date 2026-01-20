'use client'

import { SearchOverlay } from '@/components/SearchOverlay'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { Menu, Phone, Search } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { SocialIcon } from 'react-social-icons'

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-c-bg shadow-sm">
        {/* Main Navigation */}
        <nav className="relative bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="container-custom">
            <div className="flex h-20 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 z-10 shrink-0">
                <img
                  src="/khustcar_logo.png"
                  alt={SITE_CONFIG.name}
                  className="h-9 w-auto object-contain scale-150 relative top-1"
                />
                <span className="ml-3 font-bold">Khust Car</span>
              </Link>

              {/* Desktop Navigation - Centered */}
              <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative text-sm font-medium text-gray-800 hover:text-primary transition-colors py-2"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full"></span>
                  </Link>
                ))}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3 z-10">
                {/* Phone */}
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span className="hidden lg:inline text-sm font-medium">{SITE_CONFIG.contact.phone}</span>
                </a>

                {/* Search */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchOpen(true)}
                  className="text-gray-700 hover:text-primary hover:bg-transparent"
                >
                  <Search className="h-5 w-5" />
                </Button>

                {/* Mobile Menu Button */}
                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="md:hidden text-gray-700 hover:text-primary hover:bg-transparent px-0"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <nav className="flex flex-col gap-4 mt-8">
                      {NAV_LINKS.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="text-lg font-medium text-gray-800 hover:text-primary transition-colors py-2"
                          onClick={() => setSheetOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}

                      {/* Social Icons in Sheet */}
                      <div className="flex items-center justify-center gap-3 mt-8 pt-8 border-t border-gray-200">
                        <SocialIcon
                          url={SITE_CONFIG.social.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ height: 40, width: 40 }}
                          fgColor="#ffffff"
                          bgColor="#151922"
                        />
                        <SocialIcon
                          url={SITE_CONFIG.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ height: 40, width: 40 }}
                          fgColor="#ffffff"
                          bgColor="#151922"
                        />
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
