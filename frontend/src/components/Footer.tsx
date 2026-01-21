import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants'
import { MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons'

export function Footer() {
    return (
        <footer className="bg-footer text-text">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 z-10 shrink-0">
                            <img
                                src="/khustcar_logo.png"
                                alt={SITE_CONFIG.name}
                                className="h-9 w-auto object-contain scale-150 relative top-1"
                            />
                            <span className="ml-3 font-bold">Khust Car</span>
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <ul className="space-y-2">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm hover:text-primary transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-с-text font-semibold mb-4">Зв'яжіться з Нами</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                                <a
                                    href={`tel:${SITE_CONFIG.contact.phone}`}
                                    className="text-sm hover:text-primary transition-colors"
                                >
                                    {SITE_CONFIG.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                                <span className="text-sm">{SITE_CONFIG.contact.address}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-с-text font-semibold mb-4">Слідкуйте за Нами</h3>
                        <div className="flex gap-3">
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
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-footer-border">
                <div className="container-custom py-6">
                    <p className="text-sm text-center">
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. Всі права захищені.
                    </p>
                </div>
            </div>
        </footer>
    )
}
