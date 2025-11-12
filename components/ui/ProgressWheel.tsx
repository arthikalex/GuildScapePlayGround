'use client'

import { useState } from 'react'
import clsx from 'clsx'

interface Dimension {
  name: string
  value: number
  max: number
  color: string
}

interface ProgressWheelProps {
  dimensions: Dimension[]
  size?: 'sm' | 'md' | 'lg'
  showLabels?: boolean
  className?: string
}

export function ProgressWheel({
  dimensions,
  size = 'md',
  showLabels = true,
  className,
}: ProgressWheelProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const sizeMap = {
    sm: { diameter: 120, strokeWidth: 8, fontSize: 'text-xs' },
    md: { diameter: 240, strokeWidth: 12, fontSize: 'text-sm' },
    lg: { diameter: 360, strokeWidth: 16, fontSize: 'text-base' },
  }

  const { diameter, strokeWidth } = sizeMap[size]
  const radius = (diameter - strokeWidth) / 2
  const center = diameter / 2
  const circumference = 2 * Math.PI * radius
  const segmentAngle = 360 / dimensions.length

  return (
    <div className={clsx('flex flex-col items-center', className)}>
      {/* SVG Wheel */}
      <svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
        className="transform -rotate-90"
        role="img"
        aria-label="Six-dimensional reputation progress wheel"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#F5F4EE"
          strokeWidth={strokeWidth}
        />

        {/* Progress segments */}
        {dimensions.map((dimension, index) => {
          const percentage = (dimension.value / dimension.max) * 100
          const startAngle = index * segmentAngle
          const endAngle = startAngle + segmentAngle
          const isHovered = hoveredIndex === index

          // Calculate arc path
          const startRad = (startAngle * Math.PI) / 180
          const endRad = (endAngle * Math.PI) / 180
          const innerRadius = radius - strokeWidth / 2
          const outerRadius = radius + strokeWidth / 2

          // Calculate segment length based on percentage
          const segmentLength = (circumference / dimensions.length) * (percentage / 100)
          const segmentOffset = (circumference / dimensions.length) * ((100 - percentage) / 100)

          return (
            <g
              key={dimension.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer transition-opacity"
              style={{ opacity: hoveredIndex === null || isHovered ? 1 : 0.5 }}
            >
              {/* Segment arc */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={dimension.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${segmentLength} ${circumference}`}
                strokeDashoffset={-((index * circumference) / dimensions.length + segmentOffset)}
                className="transition-all duration-300"
                style={{
                  filter: isHovered ? `drop-shadow(0 0 8px ${dimension.color})` : 'none',
                }}
              />
            </g>
          )
        })}

        {/* Center text */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-guild-wood-dark font-bold transform rotate-90"
          style={{ fontSize: size === 'sm' ? '14px' : size === 'md' ? '24px' : '36px' }}
        >
          {hoveredIndex !== null ? (
            <tspan>
              {dimensions[hoveredIndex].value}
              <tspan className="text-xs" dy="4">
                /{dimensions[hoveredIndex].max}
              </tspan>
            </tspan>
          ) : (
            dimensions.reduce((sum, d) => sum + d.value, 0)
          )}
        </text>
      </svg>

      {/* Legend */}
      {showLabels && (
        <div
          className={clsx(
            'grid gap-2 mt-4 w-full',
            size === 'sm' ? 'grid-cols-2 text-xs' : 'grid-cols-2 lg:grid-cols-3'
          )}
          role="list"
        >
          {dimensions.map((dimension, index) => (
            <div
              key={dimension.name}
              className={clsx(
                'flex items-center gap-2 p-2 rounded transition-all cursor-pointer',
                hoveredIndex === index && 'bg-parchment-dark shadow-sm'
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              role="listitem"
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: dimension.color }}
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-guild-wood truncate">
                  {dimension.name}
                </div>
                <div className="text-xs text-gray-600">
                  {dimension.value}/{dimension.max}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tooltip for hovered dimension */}
      {hoveredIndex !== null && (
        <div
          className="mt-2 px-3 py-2 bg-guild-wood-dark text-parchment rounded shadow-lg text-sm animate-fade-in"
          role="status"
          aria-live="polite"
        >
          <span className="font-semibold">{dimensions[hoveredIndex].name}:</span>{' '}
          {dimensions[hoveredIndex].value} / {dimensions[hoveredIndex].max} (
          {Math.round((dimensions[hoveredIndex].value / dimensions[hoveredIndex].max) * 100)}%)
        </div>
      )}
    </div>
  )
}

interface TierMedallionProps {
  tier: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function TierMedallion({ tier, size = 'md', className }: TierMedallionProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  }

  const tierColors = {
    Patron: 'bg-gradient-to-br from-gray-300 to-gray-400',
    Apprentice: 'bg-gradient-to-br from-green-400 to-green-600',
    Maker: 'bg-gradient-to-br from-blue-400 to-blue-600',
    Artisan: 'bg-gradient-to-br from-purple-400 to-purple-600',
    Elder: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
  }

  const tierIcons = {
    Patron: '🛡️',
    Apprentice: '⚒️',
    Maker: '🎨',
    Artisan: '⭐',
    Elder: '👑',
  }

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center font-bold text-white shadow-md',
        'border-2 border-parchment',
        sizeClasses[size],
        tierColors[tier as keyof typeof tierColors],
        className
      )}
      title={`${tier} tier`}
      aria-label={`${tier} tier medallion`}
    >
      <span role="img" aria-hidden="true">
        {tierIcons[tier as keyof typeof tierIcons]}
      </span>
    </div>
  )
}

interface ProgressBarProps {
  value: number
  max: number
  label?: string
  showPercentage?: boolean
  color?: string
  className?: string
}

export function ProgressBar({
  value,
  max,
  label,
  showPercentage = true,
  color = '#8B5CF6',
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((value / max) * 100))

  return (
    <div className={className}>
      {(label || showPercentage) && (
        <div className="flex justify-between text-sm mb-1">
          {label && <span className="text-gray-600">{label}</span>}
          {showPercentage && <span className="font-semibold text-guild-wood">{percentage}%</span>}
        </div>
      )}
      <div className="progress-bar">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || `${value} of ${max}`}
        />
      </div>
    </div>
  )
}
