import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";

export function Footer() {
    return (
        <footer className="bg-footer border-t border-border">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 shrink-0 mb-4"
                        >
                            <img
                                src="/khustcar_logo.png"
                                alt={SITE_CONFIG.name}
                                className="h-9 w-auto object-contain scale-150 relative top-1"
                            />
                            <span className="ml-3 font-bold text-lg text-gray-900">
                                Khust Car
                            </span>
                        </Link>
                        <p className="text-sm text-gray-500 mb-6 max-w-xs mt-6">
                            {SITE_CONFIG.description}
                        </p>
                        <div className="flex gap-2">
                            <SocialIcon
                                url={SITE_CONFIG.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ height: 36, width: 36 }}
                                fgColor="#64748b"
                                bgColor="transparent"
                                className="border border-gray-200 rounded-full hover:border-gray-300 transition-colors"
                            />
                            <SocialIcon
                                url={SITE_CONFIG.social.telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ height: 36, width: 36 }}
                                fgColor="#64748b"
                                bgColor="transparent"
                                className="border border-gray-200 rounded-full hover:border-gray-300 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Навігація
                        </h3>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Контактна Інформація
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                                <span className="text-sm text-gray-500">
                                    {SITE_CONFIG.contact.address}
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                                <a
                                    href={`tel:${SITE_CONFIG.contact.phone}`}
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    {SITE_CONFIG.contact.phone}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
                                <a
                                    href={`mailto:${SITE_CONFIG.contact.email}`}
                                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                                >
                                    {SITE_CONFIG.contact.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Working Hours */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">
                            Графік Роботи
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex justify-between text-sm">
                                <span className="text-gray-500">Пн - Пт</span>
                                <span className="text-gray-700">
                                    09:00 - 18:00
                                </span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span className="text-gray-500">Сб</span>
                                <span className="text-gray-700">
                                    10:00 - 16:00
                                </span>
                            </li>
                            <li className="flex justify-between text-sm">
                                <span className="text-gray-500">Нд</span>
                                <span className="text-gray-700">Вихідний</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-200">
                <div className="container-custom py-6">
                    <p className="text-sm text-gray-500 text-center">
                        © {new Date().getFullYear()} {SITE_CONFIG.name}. Всі
                        права захищені.
                    </p>
                </div>
            </div>
        </footer>
    );
}
