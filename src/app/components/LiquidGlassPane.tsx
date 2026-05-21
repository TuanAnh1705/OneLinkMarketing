"use client"

/**
 * LiquidGlassPane — WebGL liquid glass, adapted from dashersw/liquid-glass-js
 *
 * Avoids html2canvas (incompatible with Tailwind v4 oklab colors).
 * Instead it loads /assets/heroBg.png as the backdrop texture; if that
 * image is missing it falls back to the dark-navy CSS gradient used by
 * .hero-bg.  The same physics-based shader (edge warp, rim glow, corner
 * boost, ripple, Gaussian blur, gradient tint) from the original library
 * is applied to whatever texture is loaded.
 */

import { useEffect, useRef, ReactNode } from "react"

/* ── Vertex shader ─────────────────────────────────────────────── */
const VERT = `
attribute vec2 a_position;
attribute vec2 a_texcoord;
varying   vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 0, 1);
  v_texcoord  = a_texcoord;
}
`

/* ── Fragment shader (from dashersw/liquid-glass-js container.js) ─ */
const FRAG = `
precision mediump float;

uniform sampler2D u_image;
uniform vec2  u_resolution;
uniform vec2  u_textureSize;
uniform float u_scrollY;
uniform float u_blurRadius;
uniform float u_borderRadius;
uniform vec2  u_containerPosition;
uniform float u_edgeIntensity;
uniform float u_rimIntensity;
uniform float u_cornerBoost;
uniform float u_rippleEffect;
uniform float u_tintOpacity;
varying vec2  v_texcoord;

float roundedRectDistance(vec2 coord, vec2 size, float radius) {
  vec2  center     = size * 0.5;
  vec2  pixelCoord = coord * size;
  vec2  toCorner   = abs(pixelCoord - center) - (center - radius);
  float outside    = length(max(toCorner, 0.0));
  float inside     = min(max(toCorner.x, toCorner.y), 0.0);
  return outside + inside - radius;
}

void main() {
  vec2 coord = v_texcoord;

  /* map this pixel to its location in the backdrop snapshot */
  vec2 center          = u_containerPosition + vec2(0.0, u_scrollY);
  vec2 textureCoord    = (center + (coord - 0.5) * u_resolution) / u_textureSize;

  /* shape-aware outward normal */
  vec2  shapeNormal  = normalize(coord - vec2(0.5));
  float edgeDist     = max(-roundedRectDistance(coord, u_resolution, u_borderRadius), 0.0)
                       / min(u_resolution.x, u_resolution.y);

  /* edge + rim refraction layers */
  float nd       = edgeDist * min(u_resolution.x, u_resolution.y);
  float edgeFact = exp(-nd * 0.15);
  float rimFact  = exp(-nd * 0.80);
  vec2  baseRef  = shapeNormal * (edgeFact * u_edgeIntensity + rimFact * u_rimIntensity);

  /* corner boost */
  float cx      = min(coord.x, 1.0 - coord.x);
  float cy      = min(coord.y, 1.0 - coord.y);
  float cNorm   = max(cx, cy) * min(u_resolution.x, u_resolution.y);
  vec2  cRef    = shapeNormal * exp(-cNorm * 0.3) * u_cornerBoost;

  /* edge ripple */
  vec2 perp   = vec2(-shapeNormal.y, shapeNormal.x);
  vec2 ripRef = perp * sin(edgeDist * 25.0) * u_rippleEffect * rimFact;

  textureCoord += baseRef + cRef + ripRef;

  /* Gaussian blur – 9×9 kernel */
  vec4  color  = vec4(0.0);
  vec2  tSz    = 1.0 / u_textureSize;
  float sigma  = u_blurRadius / 2.0;
  float total  = 0.0;
  for (float i = -4.0; i <= 4.0; i += 1.0) {
    for (float j = -4.0; j <= 4.0; j += 1.0) {
      float d = length(vec2(i, j));
      if (d > 4.0) continue;
      float w = exp(-(d * d) / (2.0 * sigma * sigma));
      color += texture2D(u_image, textureCoord + vec2(i, j) * tSz * sigma) * w;
      total += w;
    }
  }
  color /= total;

  /* gradient white tint (bright top → muted bottom, matches library) */
  color.rgb = mix(color.rgb, mix(vec3(1.0), vec3(0.78), coord.y), u_tintOpacity);

  /* rounded-rect alpha mask */
  float mask = 1.0 - smoothstep(-1.0, 1.0,
    roundedRectDistance(coord, u_resolution, u_borderRadius));

  gl_FragColor = vec4(color.rgb, mask);
}
`

/* ── WebGL helpers ─────────────────────────────────────────────── */
function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("[LiquidGlass] shader:", gl.getShaderInfoLog(s))
    return null
  }
  return s
}

function makeProgram(gl: WebGLRenderingContext) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT)
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null
  const p = gl.createProgram()!
  gl.attachShader(p, vs); gl.attachShader(p, fs); gl.linkProgram(p)
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error("[LiquidGlass] link:", gl.getProgramInfoLog(p))
    return null
  }
  return p
}

/* ── Build the backdrop texture canvas ────────────────────────── */
async function buildBackdropCanvas(): Promise<HTMLCanvasElement> {
  const W = Math.max(document.body.scrollWidth,  window.innerWidth)
  const H = Math.max(document.body.scrollHeight, window.innerHeight * 3)

  const canvas = document.createElement("canvas")
  canvas.width  = W
  canvas.height = H
  const ctx = canvas.getContext("2d")!

  /* Always start with the dark-navy gradient used by .hero-bg */
  const grad = ctx.createLinearGradient(W * 0.5, 0, W * 0.5, H)
  grad.addColorStop(0,    "#000A1D")
  grad.addColorStop(0.35, "#091440")
  grad.addColorStop(0.7,  "#0D1E4A")
  grad.addColorStop(1,    "#080E28")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  /* Try to overlay the real heroBg.png image */
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image()
      i.crossOrigin = "anonymous"
      i.onload  = () => res(i)
      i.onerror = () => rej(new Error("heroBg not found"))
      i.src = "/assets/heroBg.png"
      setTimeout(() => rej(new Error("timeout")), 3000)
    })
    ctx.drawImage(img, 0, 0, W, H)
  } catch {
    /* file not present — gradient fallback is already drawn */
  }

  return canvas
}

/* ── Props ─────────────────────────────────────────────────────── */
interface Props {
  children:       ReactNode
  className?:     string
  style?:         React.CSSProperties
  borderRadius?:  number
  tintOpacity?:   number
  blurRadius?:    number
  edgeIntensity?: number
  rimIntensity?:  number
  cornerBoost?:   number
  rippleEffect?:  number
}

/* ── Component ─────────────────────────────────────────────────── */
export default function LiquidGlassPane({
  children,
  className = "",
  style,
  borderRadius  = 20,
  tintOpacity   = 0.18,
  blurRadius    = 5,
  edgeIntensity = 0.018,
  rimIntensity  = 0.06,
  cornerBoost   = 0.03,
  rippleEffect  = 0.09,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const uRef       = useRef<Record<string, WebGLUniformLocation | null>>({})
  const rafRef     = useRef<number>(0)
  const roRef      = useRef<ResizeObserver | null>(null)
  const deadRef    = useRef(false)

  useEffect(() => {
    deadRef.current = false
    const canvas  = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    async function init() {
      /* size canvas to wrapper */
      const rect     = wrapper!.getBoundingClientRect()
      canvas!.width  = Math.ceil(rect.width)
      canvas!.height = Math.ceil(rect.height)

      /* WebGL */
      const gl = canvas!.getContext("webgl",
        { alpha: true, preserveDrawingBuffer: true })
      if (!gl) { console.warn("[LiquidGlass] WebGL unavailable"); return }

      /* build backdrop texture */
      const backdrop = await buildBackdropCanvas()
      if (deadRef.current) return

      const prog = makeProgram(gl)
      if (!prog) return
      gl.useProgram(prog)

      /* geometry */
      const posBuf = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([-1,-1, 1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)

      const uvBuf = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
      gl.bufferData(gl.ARRAY_BUFFER,
        new Float32Array([0,1, 1,1, 0,0, 0,0, 1,1, 1,0]), gl.STATIC_DRAW)

      const posLoc = gl.getAttribLocation(prog, "a_position")
      const uvLoc  = gl.getAttribLocation(prog, "a_texcoord")

      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf)
      gl.enableVertexAttribArray(posLoc)
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf)
      gl.enableVertexAttribArray(uvLoc)
      gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0)

      /* uniforms */
      const u = uRef.current
      u.resolution   = gl.getUniformLocation(prog, "u_resolution")
      u.textureSize  = gl.getUniformLocation(prog, "u_textureSize")
      u.scrollY      = gl.getUniformLocation(prog, "u_scrollY")
      u.blurRadius   = gl.getUniformLocation(prog, "u_blurRadius")
      u.borderRadius = gl.getUniformLocation(prog, "u_borderRadius")
      u.containerPos = gl.getUniformLocation(prog, "u_containerPosition")
      u.edgeInt      = gl.getUniformLocation(prog, "u_edgeIntensity")
      u.rimInt       = gl.getUniformLocation(prog, "u_rimIntensity")
      u.cornerBoost  = gl.getUniformLocation(prog, "u_cornerBoost")
      u.ripple       = gl.getUniformLocation(prog, "u_rippleEffect")
      u.tintOpacity  = gl.getUniformLocation(prog, "u_tintOpacity")

      /* texture */
      const tex = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, backdrop)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.activeTexture(gl.TEXTURE0)
      gl.uniform1i(gl.getUniformLocation(prog, "u_image"), 0)

      /* static uniforms */
      gl.uniform2f(u.textureSize!,  backdrop.width, backdrop.height)
      gl.uniform1f(u.blurRadius!,   blurRadius)
      gl.uniform1f(u.borderRadius!, borderRadius)
      gl.uniform1f(u.edgeInt!,      edgeIntensity)
      gl.uniform1f(u.rimInt!,       rimIntensity)
      gl.uniform1f(u.cornerBoost!,  cornerBoost)
      gl.uniform1f(u.ripple!,       rippleEffect)
      gl.uniform1f(u.tintOpacity!,  tintOpacity)

      /* state */
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
      gl.clearColor(0, 0, 0, 0)
      gl.viewport(0, 0, canvas!.width, canvas!.height)
      gl.uniform2f(u.resolution!, canvas!.width, canvas!.height)

      /* resize when dropdown expands */
      roRef.current = new ResizeObserver(() => {
        if (!canvas || !gl || !u.resolution) return
        const r = wrapper!.getBoundingClientRect()
        const w = Math.ceil(r.width), h = Math.ceil(r.height)
        canvas!.width = w; canvas!.height = h
        gl.viewport(0, 0, w, h)
        gl.uniform2f(u.resolution!,   w, h)
        gl.uniform1f(u.borderRadius!, borderRadius)
      })
      roRef.current.observe(wrapper!)

      /* render loop */
      const render = () => {
        if (deadRef.current) return
        gl.clear(gl.COLOR_BUFFER_BIT)
        const scrollY = window.pageYOffset || 0
        const r       = canvas!.getBoundingClientRect()
        gl.uniform1f(u.scrollY!,      scrollY)
        gl.uniform2f(u.containerPos!, r.left + r.width / 2, r.top + r.height / 2)
        gl.drawArrays(gl.TRIANGLES, 0, 6)
        rafRef.current = requestAnimationFrame(render)
      }
      render()
    }

    init()

    return () => {
      deadRef.current = true
      cancelAnimationFrame(rafRef.current)
      roRef.current?.disconnect()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [borderRadius, tintOpacity, blurRadius, edgeIntensity, rimIntensity, cornerBoost, rippleEffect])

  return (
    <div
      ref={wrapperRef}
      data-liquid-glass
      className={`relative overflow-hidden ${className}`}
      style={{ isolation: "isolate", ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position:     "absolute",
          inset:        0,
          width:        "100%",
          height:       "100%",
          zIndex:       -1,
          borderRadius: `${borderRadius}px`,
          boxShadow:    "0 25px 50px rgba(0, 0, 0, 0.25)",
        }}
      />
      {children}
    </div>
  )
}
