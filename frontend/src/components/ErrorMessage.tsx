import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
    message: string;
}

export function ErrorMessage({ message }: Readonly<ErrorMessageProps>) {
    return (
        <div className="w-full max-w-md mx-auto px-4">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8 text-center shadow-sm">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Виникла помилка
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {message}
                </p>
            </div>
        </div>
    );
}
