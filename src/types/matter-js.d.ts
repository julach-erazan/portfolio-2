declare module 'matter-js' {
  interface BodyLike {
    id: number
    position: { x: number; y: number }
    angle: number
    bounds: { min: { x: number; y: number }; max: { x: number; y: number } }
  }

  const Matter: {
    Engine: {
      create: (config?: object) => {
        world: { gravity: { x?: number; y: number } }
        gravity: { y: number }
      }
      clear: (engine: object) => void
      update: (engine: object) => void
    }
    Render: {
      create: (options: {
        element: HTMLElement
        engine: object
        options: { width: number; height: number; background?: string; wireframes?: boolean }
      }) => { canvas: HTMLCanvasElement; mouse: object; stop: () => void }
      run: (render: object) => void
      stop: (render: object) => void
    }
    World: {
      add: (world: object, bodies: object | object[]) => void
      clear: (world: object, keepStatic: boolean) => void
    }
    Bodies: {
      rectangle: (
        x: number,
        y: number,
        w: number,
        h: number,
        options?: object,
      ) => BodyLike
    }
    Body: {
      setVelocity: (body: BodyLike, velocity: { x: number; y: number }) => void
      setAngularVelocity: (body: BodyLike, velocity: number) => void
    }
    Runner: {
      create: () => object
      run: (runner: object, engine: object) => void
      stop: (runner: object) => void
    }
    Mouse: { create: (element: HTMLElement) => object }
    MouseConstraint: {
      create: (engine: object, options: { mouse: object; constraint: object }) => object
    }
  }

  export = Matter
}
