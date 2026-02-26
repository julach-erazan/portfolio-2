import { useRef, useState, useEffect } from 'react'
import Matter from 'matter-js'

const DEFAULT_COLORS = [
  '#c0c2ce',
  '#ffc0cb',
  '#a8e6cf',
  '#ffcc5c',
  '#536872',
  '#3b82f6',
  '#6366f1',
  '#0d9488',
  '#4f46e5',
  '#1e3a5f',
  '#374151',
  '#6b21a8',
  '#14532d',
  '#7c2d12',
  '#1e293b',
]

interface FallingCapsulesProps {
  words: string[]
  colors?: string[]
  trigger?: 'auto' | 'scroll'
  gravity?: number
  mouseConstraintStiffness?: number
  fontSize?: string
  className?: string
}

export default function FallingCapsules({
  words,
  colors = DEFAULT_COLORS,
  trigger = 'scroll',
  gravity = 0.8,
  mouseConstraintStiffness = 0.2,
  fontSize = '0.875rem',
  className = '',
}: FallingCapsulesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const pillsRef = useRef<HTMLDivElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const [effectStarted, setEffectStarted] = useState(false)

  useEffect(() => {
    if (trigger === 'auto') {
      setEffectStarted(true)
      return
    }
    if (trigger === 'scroll' && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setEffectStarted(true)
            observer.disconnect()
          }
        },
        { threshold: 0.1 },
      )
      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }
  }, [trigger])

  useEffect(() => {
    if (!effectStarted) return

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } =
      Matter

    if (
      !containerRef.current ||
      !canvasContainerRef.current ||
      !pillsRef.current
    )
      return

    const containerRect = containerRef.current.getBoundingClientRect()
    const width = containerRect.width
    const height = containerRect.height

    if (width <= 0 || height <= 0) return

    const engine = Engine.create()
    ;(engine.world as { gravity: { y: number } }).gravity.y = gravity

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
      },
    })

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    }
    const floor = Bodies.rectangle(
      width / 2,
      height + 25,
      width + 100,
      50,
      boundaryOptions,
    )
    const leftWall = Bodies.rectangle(
      -25,
      height / 2,
      50,
      height + 100,
      boundaryOptions,
    )
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2,
      50,
      height + 100,
      boundaryOptions,
    )
    const ceiling = Bodies.rectangle(
      width / 2,
      -25,
      width + 100,
      50,
      boundaryOptions,
    )

    const pillElems = pillsRef.current.querySelectorAll('[data-pill]')
    if (pillElems.length === 0) return

    const wordBodies = [...pillElems].map((elem) => {
      const rect = (elem as HTMLElement).getBoundingClientRect()
      const x = rect.left - containerRect.left + rect.width / 2
      const y = rect.top - containerRect.top + rect.height / 2

      const body = Bodies.rectangle(
        x,
        y,
        Math.max(rect.width, 20),
        Math.max(rect.height, 24),
        {
          render: { fillStyle: 'transparent' },
          restitution: 0.5,
          frictionAir: 0.012,
          friction: 0.2,
        },
      )
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 4,
        y: 0,
      })
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04)

      return { elem: elem as HTMLElement, body }
    })

    wordBodies.forEach(({ elem }) => {
      elem.style.position = 'absolute'
      elem.style.pointerEvents = 'none'
    })

    const mouse = Mouse.create(containerRef.current)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
      },
    })
    render.mouse = mouse

    World.add(engine.world, [
      floor,
      leftWall,
      rightWall,
      ceiling,
      mouseConstraint,
      ...wordBodies.map((wb) => wb.body),
    ])

    const runner = Runner.create()
    Runner.run(runner, engine)
    Render.run(render)

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position
        elem.style.left = `${x}px`
        elem.style.top = `${y}px`
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`
      })
      Engine.update(engine)
      requestAnimationFrame(updateLoop)
    }
    updateLoop()

    return () => {
      Render.stop(render)
      Runner.stop(runner)
      if (
        render.canvas &&
        canvasContainerRef.current?.contains(render.canvas)
      ) {
        canvasContainerRef.current.removeChild(render.canvas)
      }
      World.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [effectStarted, gravity, mouseConstraintStiffness])

  return (
    <div
      ref={containerRef}
      className={`relative z-[1] w-full min-h-[280px] overflow-hidden ${className}`}
    >
      <div
        ref={pillsRef}
        className="flex flex-wrap justify-center gap-2 px-4 py-6"
        style={{ fontSize, lineHeight: 1.4 }}
      >
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            data-pill
            className="inline-flex items-center px-3 py-1.5 rounded-full font-medium text-white/95 border border-white/10 select-none"
            style={{
              backgroundColor: colors[i % colors.length],
              fontSize,
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <div
        className="absolute inset-0 top-0 left-0 z-0 pointer-events-none"
        aria-hidden
      />
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 top-0 left-0 z-0"
        style={{ pointerEvents: effectStarted ? 'auto' : 'none' }}
      />
    </div>
  )
}
