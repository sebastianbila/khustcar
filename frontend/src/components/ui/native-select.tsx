import * as React from "react"

import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "lucide-react"

type NativeSelectProps = Omit<React.ComponentProps<"select">, "size"> & {
    size?: "sm" | "default"
}

function NativeSelect({
                          className,
                          size = "default",
                          ...props
                      }: NativeSelectProps) {
    return (
        <div
            className={cn(
                "group/native-select relative has-[select:disabled]:opacity-50",
                className
            )}
            data-slot="native-select-wrapper"
            data-size={size}
        >
            <select
                data-slot="native-select"
                data-size={size}
                className="flex h-10 w-full appearance-none rounded-md bg-gray-100/80 px-3 py-2 pr-8 text-sm text-foreground ring-offset-background focus-visible:outline-none focus:bg-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[size=sm]:h-9 data-[size=sm]:py-1.5"
                {...props}
            />
            <ChevronDownIcon className="text-muted-foreground top-1/2 right-2.5 size-4 -translate-y-1/2 pointer-events-none absolute select-none" aria-hidden="true" data-slot="native-select-icon" />
        </div>
    )
}

function NativeSelectOption({ ...props }: React.ComponentProps<"option">) {
    return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({
                                  className,
                                  ...props
                              }: React.ComponentProps<"optgroup">) {
    return (
        <optgroup
            data-slot="native-select-optgroup"
            className={cn(className)}
            {...props}
        />
    )
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
