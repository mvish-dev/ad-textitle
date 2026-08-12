import { useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

const QUICK_QUESTIONS = [
  'Product Information',
  'Manufacturing',
  'Infrastructure',
  'Quality',
  'Certifications',
  'Contact Sales',
]

const VERTEX_SHADER_SOURCE = `attribute vec2 position; varying vec2 v_texCoord; void main() { v_texCoord = position * 0.5 + 0.5; gl_Position = vec4(position, 0.0, 1.0); }`

const FRAGMENT_SHADER_SOURCE = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;

    float noise = sin(uv.x * 10.0 + u_time * 0.5) * cos(uv.y * 10.0 + u_time * 0.5);
    noise += sin(uv.x * 20.0 - u_time * 0.8) * cos(uv.y * 15.0 + u_time * 1.2) * 0.5;

    vec3 color1 = vec3(0.0, 0.04, 0.12);
    vec3 color2 = vec3(0.1, 0.15, 0.25);

    vec3 finalColor = mix(color1, color2, noise * 0.2 + 0.5);

    float glint = pow(max(0.0, sin(uv.x * 5.0 + uv.y * 2.0 + u_time)), 20.0) * 0.1;
    finalColor += glint;

    gl_FragColor = vec4(finalColor, 0.8);
}`

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

function FloatingAssistant() {
  const [open, setOpen] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl')
    if (!gl) return

    const program = gl.createProgram()
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE))
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const timeLoc = gl.getUniformLocation(program, 'u_time')
    const resLoc = gl.getUniformLocation(program, 'u_resolution')

    let frameId
    function render(time) {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(timeLoc, time * 0.001)
      gl.uniform2f(resLoc, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      frameId = requestAnimationFrame(render)
    }
    frameId = requestAnimationFrame(render)

    return () => cancelAnimationFrame(frameId)
  }, [open])

  return (
    <div className="fixed bottom-6 right-6 z-50 font-body-md">
      {open && (
        <div className="absolute bottom-16 right-0 w-[380px] max-w-[90vw] h-[550px] flex flex-col overflow-hidden rounded-xl border border-white/20 shadow-2xl">
          <div className="absolute inset-0 -z-10 opacity-40">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
          <div className="absolute inset-0 -z-10 bg-white/10 backdrop-blur-xl" />

          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Icon name="smart_toy" className="text-white" />
              </div>
              <div>
                <h4 className="font-label-md text-primary">AD Textile Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Live</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-lg rounded-tl-none max-w-[85%] border border-white/30">
              <p className="text-sm text-primary">Hi, I&apos;m AD Textile Assistant. How can I help you today?</p>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {QUICK_QUESTIONS.map((question) => (
                <button
                  key={question}
                  type="button"
                  className="px-3 py-1.5 bg-white/40 hover:bg-white/60 border border-white/20 rounded-full text-xs text-primary transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-white/10">
            <div className="relative">
              <input
                className="w-full bg-white/30 border border-white/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 placeholder:text-on-surface-variant"
                placeholder="Type your message..."
                type="text"
              />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-primary" aria-label="Send message">
                <Icon name="send" />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className="w-11 h-11 bg-primary/90 text-white/90 rounded-full shadow-md flex items-center justify-center hover:scale-105 hover:opacity-100 transition-all opacity-80"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close AD Textile Assistant' : 'Open AD Textile Assistant'}
      >
        <Icon name="chat_bubble" className="text-lg" />
      </button>
    </div>
  )
}

export default FloatingAssistant
