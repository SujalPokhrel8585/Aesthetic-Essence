import { useEffect, useRef, useState } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { Clone, Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { Group, Mesh } from "three";

export default function Stethoscope() {
  const modelGroup = useRef<Group>(null);
  const hitboxRef = useRef<Mesh>(null);
  const { scene } = useGLTF("/stethoscope_animation.glb");
  const { gl } = useThree();
  const canvasElRef = useRef<HTMLCanvasElement | null>(null);
  const [hovered, setHovered] = useState(false);
  const hoveredRef = useRef(false); // mirrors `hovered`, but readable from stable callbacks

  useEffect(() => {
    canvasElRef.current = gl.domElement;
  }, [gl]);

  const hoverProgress = useRef(0);

  // Drag-to-rotate state
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 }); // user-applied rotation offset
  const dragVelocity = useRef({ x: 0, y: 0 }); // for inertia after release

  // Idle / return-to-original state
  const idleTimer = useRef(0); // seconds since last interaction ended
  const returning = useRef(false); // true once we start easing back

  const RETURN_DELAY = 1; // seconds of inactivity before it snaps back
  const RETURN_SPEED = 1; // higher = faster ease back to original

  // Auto-rotate (idle spin) state
  const autoRotation = useRef(0);
  const AUTO_ROTATE_SPEED = 0.08; // radians/sec, very slow continuous spin

  const BASE_SCALE = 0.6;
  const HOVER_SCALE = 0.62;
  const HOVER_LIFT = 0.3;
  const HOVER_ROTATION = Math.PI * 0.15;

  const resetIdleTimer = () => {
    idleTimer.current = 0;
    returning.current = false;
  };

  // Centralized cursor updates so drag state always wins over hover state.
  // We set the cursor on the actual canvas DOM element rather than
  // document.body, body's cursor is only used when nothing closer to the
  // pointer (like the canvas itself) has its own cursor style, so setting it
  // there can silently get overridden. We read the element from a ref
  // (populated in useEffect) rather than mutating `gl` directly, since React
  // Compiler disallows mutating a value returned from a hook.
  const updateCursor = (isHovered: boolean) => {
    const value = isDragging.current
      ? "grabbing"
      : isHovered
        ? "grab"
        : "default";
    if (canvasElRef.current) {
      canvasElRef.current.style.cursor = value;
    }
    document.body.style.cursor = value;
  };

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hoveredRef.current = true;
    setHovered(true);
    updateCursor(true);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    // While actively dragging, ignore leaving the mesh's hit area, the drag
    // should keep going (and the cursor should stay "grabbing") until the
    // user actually releases the pointer, which is handled by the window
    // listeners below, not by this boundary event.
    if (isDragging.current) return;
    hoveredRef.current = false;
    setHovered(false);
    updateCursor(false);
  };

  // Window-level listeners so a drag reliably ends on pointerup no matter
  // where the pointer is released, R3F's onPointerMove/onPointerUp on the
  // mesh only fire while the raycast is still hitting that mesh, so a fast
  // drag that leaves the model's bounds would otherwise never fire pointerup,
  // leaving isDragging (and the "grabbing" cursor) stuck forever.
  const handleWindowPointerMove = (e: PointerEvent) => {
    if (!isDragging.current) return;

    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };

    const ROTATE_SPEED = 0.01;
    dragRotation.current.y += dx * ROTATE_SPEED;
    dragRotation.current.x += dy * ROTATE_SPEED;

    dragRotation.current.x = THREE.MathUtils.clamp(
      dragRotation.current.x,
      -Math.PI / 3,
      Math.PI / 3,
    );

    dragVelocity.current = { x: dy * ROTATE_SPEED, y: dx * ROTATE_SPEED };
    resetIdleTimer();
  };

  const handleWindowPointerUp = () => {
    isDragging.current = false;
    updateCursor(hoveredRef.current);
    resetIdleTimer(); // idle countdown starts now, from the moment you let go
    window.removeEventListener("pointermove", handleWindowPointerMove);
    window.removeEventListener("pointerup", handleWindowPointerUp);
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    updateCursor(hoveredRef.current);
    resetIdleTimer();
    window.addEventListener("pointermove", handleWindowPointerMove);
    window.addEventListener("pointerup", handleWindowPointerUp);
  };

  // Safety net: if the component unmounts mid-drag, don't leak listeners.
  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", handleWindowPointerMove);
      window.removeEventListener("pointerup", handleWindowPointerUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (!modelGroup.current) return;

    // Hover pop animation
    const target = hovered ? 1 : 0;
    const speed = 4;
    hoverProgress.current = THREE.MathUtils.damp(
      hoverProgress.current,
      target,
      speed,
      delta,
    );
    const t = hoverProgress.current;
    const eased = t * t * (3 - 2 * t);

    const scale = THREE.MathUtils.lerp(BASE_SCALE, HOVER_SCALE, eased);
    modelGroup.current.scale.setScalar(scale);
    modelGroup.current.position.y = THREE.MathUtils.lerp(0, HOVER_LIFT, eased);

    if (isDragging.current) {
      // actively dragging, nothing to auto-return, just apply drag rotation
    } else {
      // count up idle time since last interaction
      idleTimer.current += delta;

      if (idleTimer.current >= RETURN_DELAY) {
        returning.current = true;
      }

      if (returning.current) {
        // ease drag rotation back to 0,0 and kill any residual inertia
        dragRotation.current.x = THREE.MathUtils.damp(
          dragRotation.current.x,
          0,
          RETURN_SPEED,
          delta,
        );
        dragRotation.current.y = THREE.MathUtils.damp(
          dragRotation.current.y,
          0,
          RETURN_SPEED,
          delta,
        );
        dragVelocity.current.x = 0;
        dragVelocity.current.y = 0;

        // keep spinning slowly once settled back into place
        autoRotation.current += AUTO_ROTATE_SPEED * delta;
      } else {
        // still within the "recently interacted" window, let inertia play out
        dragRotation.current.y += dragVelocity.current.y;
        dragRotation.current.x += dragVelocity.current.x;
        dragVelocity.current.x = THREE.MathUtils.damp(
          dragVelocity.current.x,
          0,
          6,
          delta,
        );
        dragVelocity.current.y = THREE.MathUtils.damp(
          dragVelocity.current.y,
          0,
          6,
          delta,
        );

        dragRotation.current.x = THREE.MathUtils.clamp(
          dragRotation.current.x,
          -Math.PI / 3,
          Math.PI / 3,
        );
      }
    }

    modelGroup.current.rotation.y =
      HOVER_ROTATION * eased + dragRotation.current.y + autoRotation.current;
    modelGroup.current.rotation.x = dragRotation.current.x;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={modelGroup}>
        <mesh
          ref={hitboxRef}
          position={[0, 0, 0]}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          onPointerDown={handlePointerDown}
        >
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshBasicMaterial visible={false} />
        </mesh>

        {/* Clone (not primitive) so React StrictMode's dev double-mount gets
            its own object instance, reusing the cached scene via <primitive>
            leaves the model detached and invisible in dev. */}
        <Clone
          object={scene}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        />
      </group>
    </Float>
  );
}

useGLTF.preload("/stethoscope_animation.glb");
