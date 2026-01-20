'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      onClose()
      setSearchQuery('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay Background */}
      <div
        className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Search Container */}
      <div
        className={`fixed top-0 left-0 right-0 z-[70] bg-c-bg shadow-2xl transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        <div className="container-custom py-6">
          <div className="max-w-3xl mx-auto">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            {/* Search Input */}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Знайдіть Свій Автомобіль
              </h2>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Введіть марку або модель автомобіля..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-4 pr-14 py-6 text-lg shadow-sm bg-gray-50 focus:bg-white transition-all"
                  />
                  <Button
                    onClick={handleSearch}
                    size="lg"
                    className="absolute right-2 top-1/2 -translate-y-1/2 aspect-square px-0 cursor-pointer"
                    variant="ghost"
                  >
                    <Search className="size-6! text-gray-400" />
                  </Button>
                </div>

              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-8">
              <p className="text-sm text-gray-600 mb-3">Популярні пошуки:</p>
              <div className="flex flex-wrap gap-2">
                {['Toyota', 'BMW', 'Mercedes-Benz', 'Volkswagen', 'Audi'].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => {
                      setSearchQuery(brand)
                      router.push(`/catalog?search=${encodeURIComponent(brand)}`)
                      onClose()
                    }}
                    className="px-4 py-2 bg-zinc-200/50 text-gray-700 rounded-full text-sm hover:bg-zinc-300/50 transition-colors cursor-pointer"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
