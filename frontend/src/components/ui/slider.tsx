'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface DualRangeSliderProps {
    min: number
    max: number
    minValue: number
    maxValue: number
    step?: number
    onMinChange: (value: number) => void
    onMaxChange: (value: number) => void
    formatValue?: (value: number) => string
    className?: string
}

function DualRangeSlider({
    min,
    max,
    minValue,
    maxValue,
    step = 1,
    onMinChange,
    onMaxChange,
    formatValue = (v) => `$${v.toLocaleString()}`,
    className,
}: DualRangeSliderProps) {
    const getPercent = (value: number) => ((value - min) / (max - min)) * 100

    const minPercent = getPercent(minValue)
    const maxPercent = getPercent(maxValue)

    return (
        <div className={cn('w-full', className)}>
            <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>{formatValue(minValue)}</span>
                <span>{formatValue(maxValue)}</span>
            </div>
            <div className="relative h-2">
                {/* Track background */}
                <div className="absolute inset-0 rounded-full bg-gray-200" />

                {/* Active track */}
                <div
                    className="absolute h-full rounded-full bg-gray-800"
                    style={{
                        left: `${minPercent}%`,
                        right: `${100 - maxPercent}%`,
                    }}
                />

                {/* Min thumb */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={minValue}
                    onChange={(e) => {
                        const value = Number(e.target.value)
                        if (value <= maxValue) {
                            onMinChange(value)
                        }
                    }}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:pointer-events-auto
                        [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-gray-800
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:shadow-md
                        [&::-moz-range-thumb]:pointer-events-auto
                        [&::-moz-range-thumb]:h-5
                        [&::-moz-range-thumb]:w-5
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-white
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-gray-800
                        [&::-moz-range-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:shadow-md"
                    style={{ zIndex: minValue > max - 100 ? 5 : 3 }}
                />

                {/* Max thumb */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={maxValue}
                    onChange={(e) => {
                        const value = Number(e.target.value)
                        if (value >= minValue) {
                            onMaxChange(value)
                        }
                    }}
                    className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:pointer-events-auto
                        [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-white
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-gray-800
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:shadow-md
                        [&::-moz-range-thumb]:pointer-events-auto
                        [&::-moz-range-thumb]:h-5
                        [&::-moz-range-thumb]:w-5
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-white
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-gray-800
                        [&::-moz-range-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:shadow-md"
                    style={{ zIndex: 4 }}
                />
            </div>
        </div>
    )
}

export { DualRangeSlider }
