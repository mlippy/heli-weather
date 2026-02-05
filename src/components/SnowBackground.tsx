"use client";

import { useEffect, useRef } from "react";

interface Snowflake {
    x: number;
    y: number;
    radius: number;
    speed: number;
    wind: number;
    opacity: number;
}

export function SnowBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let snowflakes: Snowflake[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initSnowflakes();
        };

        const initSnowflakes = () => {
            const count = Math.floor((window.innerWidth * window.innerHeight) / 10000); // Responsive density
            snowflakes = [];
            for (let i = 0; i < count; i++) {
                snowflakes.push(createSnowflake());
            }
        };

        const createSnowflake = (): Snowflake => {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5, // 0.5px to 2.5px
                speed: Math.random() * 1 + 0.5, // 0.5px/frame to 1.5px/frame
                wind: Math.random() * 0.5 - 0.25, // Slight horizontal drift
                opacity: Math.random() * 0.5 + 0.3, // 0.3 to 0.8
            };
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "white";
            ctx.beginPath();

            snowflakes.forEach((flake) => {
                ctx.moveTo(flake.x, flake.y);
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            });

            ctx.fill();
            update();
            animationFrameId = requestAnimationFrame(draw);
        };

        const update = () => {
            snowflakes.forEach((flake) => {
                flake.y += flake.speed;
                flake.x += flake.wind;

                // Reset if out of bounds
                if (flake.y > canvas.height) {
                    flake.y = 0;
                    flake.x = Math.random() * canvas.width;
                }
                if (flake.x > canvas.width) {
                    flake.x = 0;
                } else if (flake.x < 0) {
                    flake.x = canvas.width;
                }
            });
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1]"
        />
    );
}
