"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface PageHeaderProps {
    title?: string;
    subtitle?: ReactNode;
    actions?: ReactNode;
    backLink?: {
        href: string;
        label: string;
    };
}

export function PageHeader({
    title,
    subtitle,
    actions,
    backLink,
}: Readonly<PageHeaderProps>) {
    return (
        <section className="py-6 border-b border-b-border bg-background">
            <div className="container-custom flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    {backLink && (
                        <Link
                            href={backLink.href}
                            className={cn(
                                "inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors",
                                (title || subtitle) && "mb-2",
                            )}
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {backLink.label}
                        </Link>
                    )}
                    {title && (
                        <h1 className="text-2xl font-bold text-gray-900">
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <p className="text-sm text-gray-500 font-medium">
                            {subtitle}
                        </p>
                    )}
                </div>

                {actions && (
                    <div className="flex items-center gap-3">{actions}</div>
                )}
            </div>
        </section>
    );
}
