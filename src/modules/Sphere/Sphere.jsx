import { useEffect, useRef, useState } from 'react'
import { mat4 } from 'gl-matrix'

export const Sphere = () => {
	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //
	const canvasRef = useRef(null)
	const [rotation, setRotation] = useState({ x: 0, y: 0 })
	const [isDragging, setIsDragging] = useState(false)
	const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 })

	useEffect(() => {
		const canvas = canvasRef.current
		const gl = canvas.getContext('webgl')

		if (!gl) {
			console.error('WebGL not supported')
			return
		}

		const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec4 aVertexColor;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      uniform mat4 uLightMatrix;
      varying lowp vec4 vColor;
      varying highp vec4 vShadowCoord;
      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vShadowCoord = uLightMatrix * aVertexPosition;
        vColor = aVertexColor;
      }
    `

		const fsSource = `
      precision mediump float;
      varying lowp vec4 vColor;
      varying highp vec4 vShadowCoord;
      uniform sampler2D uShadowMap;
      void main(void) {
        vec3 shadowCoord = vShadowCoord.xyz / vShadowCoord.w;
        float shadow = texture2D(uShadowMap, shadowCoord.xy).r;
        float visibility = (shadowCoord.z - 0.005 > shadow) ? 0.5 : 0.6;
        gl_FragColor = vColor * visibility;
      }
    `

		const shadowVsSource = `
      attribute vec4 aVertexPosition;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      }
    `

		const shadowFsSource = `
      precision mediump float;
      void main(void) {
        gl_FragColor = vec4(gl_FragCoord.z);
      }
    `

		const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
		const shadowProgram = initShaderProgram(
			gl,
			shadowVsSource,
			shadowFsSource
		)

		const programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: gl.getAttribLocation(
					shaderProgram,
					'aVertexPosition'
				),
				vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
			},
			uniformLocations: {
				projectionMatrix: gl.getUniformLocation(
					shaderProgram,
					'uProjectionMatrix'
				),
				modelViewMatrix: gl.getUniformLocation(
					shaderProgram,
					'uModelViewMatrix'
				),
				lightMatrix: gl.getUniformLocation(
					shaderProgram,
					'uLightMatrix'
				),
				shadowMap: gl.getUniformLocation(shaderProgram, 'uShadowMap')
			}
		}

		const shadowProgramInfo = {
			program: shadowProgram,
			attribLocations: {
				vertexPosition: gl.getAttribLocation(
					shadowProgram,
					'aVertexPosition'
				)
			},
			uniformLocations: {
				projectionMatrix: gl.getUniformLocation(
					shadowProgram,
					'uProjectionMatrix'
				),
				modelViewMatrix: gl.getUniformLocation(
					shadowProgram,
					'uModelViewMatrix'
				)
			}
		}

		const buffers = initBuffers(gl)
		const shadowFramebuffer = initShadowFramebuffer(gl)

		const render = () => {
			drawScene(
				gl,
				programInfo,
				shadowProgramInfo,
				buffers,
				shadowFramebuffer,
				rotation
			)
			requestAnimationFrame(render)
		}
		render()
	}, [rotation])

	function initShaderProgram(gl, vsSource, fsSource) {
		const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
		const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

		const shaderProgram = gl.createProgram()
		gl.attachShader(shaderProgram, vertexShader)
		gl.attachShader(shaderProgram, fragmentShader)
		gl.linkProgram(shaderProgram)

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
			console.error(
				'Unable to initialize the shader program: ' +
					gl.getProgramInfoLog(shaderProgram)
			)
			return null
		}
		return shaderProgram
	}

	function loadShader(gl, type, source) {
		const shader = gl.createShader(type)
		gl.shaderSource(shader, source)
		gl.compileShader(shader)

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(
				'An error occurred compiling the shaders: ' +
					gl.getShaderInfoLog(shader)
			)
			gl.deleteShader(shader)
			return null
		}
		return shader
	}

	function initBuffers(gl) {
		const latitudeBands = 30
		const longitudeBands = 30
		const radius = 1

		const positions = []
		const colors = []
		const indices = []

		for (let latNumber = 0; latNumber <= latitudeBands; latNumber++) {
			const theta = (latNumber * Math.PI) / latitudeBands
			const sinTheta = Math.sin(theta)
			const cosTheta = Math.cos(theta)

			for (
				let longNumber = 0;
				longNumber <= longitudeBands;
				longNumber++
			) {
				const phi = (longNumber * 2 * Math.PI) / longitudeBands
				const sinPhi = Math.sin(phi)
				const cosPhi = Math.cos(phi)

				const x = cosPhi * sinTheta
				const y = cosTheta
				const z = sinPhi * sinTheta

				positions.push(radius * x)
				positions.push(radius * y)
				positions.push(radius * z)

				const r = (x + 1) / 2
				const g = (y + 1) / 2
				const b = (z + 1) / 2
				colors.push(r, g, b, 1.0)
			}
		}

		for (let latNumber = 0; latNumber < latitudeBands; latNumber++) {
			for (
				let longNumber = 0;
				longNumber < longitudeBands;
				longNumber++
			) {
				const first = latNumber * (longitudeBands + 1) + longNumber
				const second = first + longitudeBands + 1
				indices.push(first, second, first + 1)
				indices.push(second, second + 1, first + 1)
			}
		}

		const positionBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
		gl.bufferData(
			gl.ARRAY_BUFFER,
			new Float32Array(positions),
			gl.STATIC_DRAW
		)

		const colorBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

		const indexBuffer = gl.createBuffer()
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
		gl.bufferData(
			gl.ELEMENT_ARRAY_BUFFER,
			new Uint16Array(indices),
			gl.STATIC_DRAW
		)

		return {
			position: positionBuffer,
			color: colorBuffer,
			indices: indexBuffer
		}
	}

	function initShadowFramebuffer(gl) {
		const depthTexture = gl.createTexture()
		gl.bindTexture(gl.TEXTURE_2D, depthTexture)
		gl.texImage2D(
			gl.TEXTURE_2D,
			0,
			gl.DEPTH_COMPONENT,
			1024,
			1024,
			0,
			gl.DEPTH_COMPONENT,
			gl.UNSIGNED_SHORT,
			null
		)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

		const framebuffer = gl.createFramebuffer()
		gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer)
		gl.framebufferTexture2D(
			gl.FRAMEBUFFER,
			gl.DEPTH_ATTACHMENT,
			gl.TEXTURE_2D,
			depthTexture,
			0
		)
		gl.bindFramebuffer(gl.FRAMEBUFFER, null)

		return { framebuffer, depthTexture }
	}

	function drawScene(
		gl,
		programInfo,
		shadowProgramInfo,
		buffers,
		shadowFramebuffer,
		rotation
	) {
		const lightPosition = [5, 5, 5]
		const lightViewMatrix = mat4.create()
		mat4.lookAt(lightViewMatrix, lightPosition, [0, 0, 0], [0, 1, 0])
		const lightProjectionMatrix = mat4.create()
		mat4.perspective(lightProjectionMatrix, Math.PI / 4, 1, 1, 100)

		gl.bindFramebuffer(gl.FRAMEBUFFER, shadowFramebuffer.framebuffer)
		gl.viewport(0, 0, 1024, 1024)
		gl.clear(gl.DEPTH_BUFFER_BIT)

		gl.useProgram(shadowProgramInfo.program)
		gl.uniformMatrix4fv(
			shadowProgramInfo.uniformLocations.projectionMatrix,
			false,
			lightProjectionMatrix
		)
		gl.uniformMatrix4fv(
			shadowProgramInfo.uniformLocations.modelViewMatrix,
			false,
			lightViewMatrix
		)
		{
			const numComponents = 3
			const type = gl.FLOAT
			const normalize = false
			const stride = 0
			const offset = 0
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
			gl.vertexAttribPointer(
				shadowProgramInfo.attribLocations.vertexPosition,
				numComponents,
				type,
				normalize,
				stride,
				offset
			)
			gl.enableVertexAttribArray(
				shadowProgramInfo.attribLocations.vertexPosition
			)
		}
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)
		gl.drawElements(gl.TRIANGLES, 6 * 30 * 30, gl.UNSIGNED_SHORT, 0)

		gl.bindFramebuffer(gl.FRAMEBUFFER, null)
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

		const fieldOfView = (30 * Math.PI) / 180
		const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
		const zNear = 0.1
		const zFar = 100.0
		const projectionMatrix = mat4.create()
		mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar)

		const modelViewMatrix = mat4.create()
		mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0])
		mat4.rotate(modelViewMatrix, modelViewMatrix, rotation.x, [1, 0, 0])
		mat4.rotate(modelViewMatrix, modelViewMatrix, rotation.y, [0, 1, 0])

		const lightMatrix = mat4.create()
		mat4.multiply(lightMatrix, lightProjectionMatrix, lightViewMatrix)

		gl.useProgram(programInfo.program)
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.projectionMatrix,
			false,
			projectionMatrix
		)
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.modelViewMatrix,
			false,
			modelViewMatrix
		)
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.lightMatrix,
			false,
			lightMatrix
		)
		gl.activeTexture(gl.TEXTURE0)
		gl.bindTexture(gl.TEXTURE_2D, shadowFramebuffer.depthTexture)
		gl.uniform1i(programInfo.uniformLocations.shadowMap, 0)

		{
			const numComponents = 3
			const type = gl.FLOAT
			const normalize = false
			const stride = 0
			const offset = 0
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexPosition,
				numComponents,
				type,
				normalize,
				stride,
				offset
			)
			gl.enableVertexAttribArray(
				programInfo.attribLocations.vertexPosition
			)
		}

		{
			const numComponents = 4
			const type = gl.FLOAT
			const normalize = false
			const stride = 0
			const offset = 0
			gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
			gl.vertexAttribPointer(
				programInfo.attribLocations.vertexColor,
				numComponents,
				type,
				normalize,
				stride,
				offset
			)
			gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor)
		}

		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)

		{
			const vertexCount = 6 * 30 * 30
			const type = gl.UNSIGNED_SHORT
			const offset = 0
			gl.drawElements(gl.TRIANGLES, vertexCount, type, offset)
		}
	}

	const handleMouseDown = event => {
		setIsDragging(true)
		setLastMousePosition({ x: event.clientX, y: event.clientY })
	}

	const handleMouseMove = event => {
		if (isDragging) {
			const deltaX = event.clientX - lastMousePosition.x
			const deltaY = event.clientY - lastMousePosition.y
			setLastMousePosition({ x: event.clientX, y: event.clientY })
			setRotation(prevRotation => ({
				x: prevRotation.x + deltaY * 0.01,
				y: prevRotation.y + deltaX * 0.01
			}))
		}
	}

	const handleMouseUp = () => {
		setIsDragging(false)
	}

	//  ← — — — — — — — — — — — — {{ 🗲 }} — — — — — — — — — — — — → //

	return (
		<canvas
			ref={canvasRef}
			width={640}
			height={640}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			style={{ cursor: 'pointer' }}
		/>
	)
}
