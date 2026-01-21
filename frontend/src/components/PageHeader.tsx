"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: ReactNode;
    actions?: ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
    return (
        <section className="py-8 border-b border-b-border bg-background">
            <div className="container-custom flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-sm text-gray-500 font-medium">
                            {subtitle}
                        </p>
                    )}
                </div>

                {actions && <div className="flex items-center gap-3">{actions}</div>}
            </div>
        </section>
    );
}
