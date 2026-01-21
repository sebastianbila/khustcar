"use client";

import { SearchOverlay } from "@/components/SearchOverlay";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { Heart, Menu, Phone, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

export function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [sheetOpen, setSheetOpen] = useState(false);
    const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);

    return (
        <>
            <header className="top-0 z-50 w-full bg-header shadow-sm font-medium">
                <nav className="border-b border-gray-100 bg-background/80 backdrop-blur-md">
                    <div className="container-custom">
                        <div className="flex h-20 items-center">
                            {/* Logo */}
                            <Link
                                href="/"
                                className="flex items-center gap-2 mr-12 shrink-0"
                            >
                                <img
                                    src="/khustcar_logo.png"
                                    alt={SITE_CONFIG.name}
                                    className="h-10 w-auto object-contain"
                                />
                                <span className="text-xl font-bold text-slate-800">
                                    Khust Car
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center gap-8">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-[15px] font-medium text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Right Actions */}
                            <div className="ml-auto flex items-center gap-6">
                                {/* Search */}
                                <button
                                    onClick={() => setSearchOpen(true)}
                                    className="text-slate-500 hover:text-slate-900 transition-colors"
                                >
                                    <Search className="h-5 w-5" />
                                </button>

                                {/* Favorites */}
                                <Link
                                    href="/favorites"
                                    className="relative text-slate-500 hover:text-rose-500 transition-colors"
                                >
                                    <Heart className="h-5 w-5" />
                                    {favoriteCount > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                                            {favoriteCount > 9 ? "9+" : favoriteCount}
                                        </span>
                                    )}
                                </Link>

                                {/* Phone */}
                                <a
                                    href={`tel:${SITE_CONFIG.contact.phone}`}
                                    className="hidden md:flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
                                >
                                    <Phone className="h-4 w-4" />
                                    <span className="text-[15px] font-semibold">
                                        {SITE_CONFIG.contact.phone}
                                    </span>
                                </a>

                                {/* Social Icons */}
                                <div className="hidden lg:flex items-center gap-4 border-l border-gray-200 pl-6 ml-2">
                                    <a
                                        href={SITE_CONFIG.social.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-[#E4405F] transition-colors"
                                    >
                                        <FaInstagram className="h-5 w-5" />
                                    </a>
                                    <a
                                        href={SITE_CONFIG.social.telegram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-[#0088cc] transition-colors"
                                    >
                                        <FaTelegramPlane className="h-5 w-5" />
                                    </a>
                                </div>

                                {/* Mobile Menu Button */}
                                <Sheet
                                    open={sheetOpen}
                                    onOpenChange={setSheetOpen}
                                >
                                    <SheetTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="lg:hidden text-slate-700 hover:text-slate-900 px-0 -ml-2"
                                        >
                                            <Menu className="h-6 w-6" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent
                                        side="right"
                                        className="w-10/12 sm:w-100"
                                    >
                                        <nav className="flex flex-col gap-4 mt-8">
                                            {NAV_LINKS.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className="text-lg font-medium text-slate-800 hover:text-primary transition-colors py-2"
                                                    onClick={() =>
                                                        setSheetOpen(false)
                                                    }
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}

                                            {/* Favorites */}
                                            <Link
                                                href="/favorites"
                                                className="flex items-center gap-3 text-lg font-medium text-slate-800 hover:text-rose-500 transition-colors py-2"
                                                onClick={() => setSheetOpen(false)}
                                            >
                                                <Heart className="h-5 w-5" />
                                                Обране
                                                {favoriteCount > 0 && (
                                                    <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                                                        {favoriteCount}
                                                    </span>
                                                )}
                                            </Link>

                                            {/* Phone */}
                                            <a
                                                href={`tel:${SITE_CONFIG.contact.phone}`}
                                                className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors py-2"
                                            >
                                                <Phone className="h-5 w-5" />
                                                <span className="text-lg font-semibold">
                                                    {SITE_CONFIG.contact.phone}
                                                </span>
                                            </a>

                                            {/* Social Icons */}
                                            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-border">
                                                <a
                                                    href={
                                                        SITE_CONFIG.social
                                                            .instagram
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-600 hover:text-[#E4405F] transition-colors"
                                                >
                                                    <FaInstagram className="h-5 w-5" />
                                                </a>
                                                <a
                                                    href={
                                                        SITE_CONFIG.social
                                                            .telegram
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-600 hover:text-[#0088cc] transition-colors"
                                                >
                                                    <FaTelegramPlane className="h-5 w-5" />
                                                </a>
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
            <SearchOverlay
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
            />
        </>
    );
}
