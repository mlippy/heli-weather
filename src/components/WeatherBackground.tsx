"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    drift: number;
}

type WeatherType = 'Snow' | 'Rain' | 'Clear' | 'Clouds' | 'Fog' | 'Storm' | 'Drizzle' | 'Heavy Shower' | 'Partly Cloudy';

export function WeatherBackground({ condition }: { condition?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Normalize condition to simple types
    const getWeatherType = (cond?: string): 'Snow' | 'Rain' | 'Clear' => {
        if (!cond) return 'Clear';
        const lower = cond.toLowerCase();
        if (lower.includes('snow') || lower.includes('storm')) return 'Snow';
        if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('shower')) return 'Rain';
        return 'Clear';
    };

    const type = getWeatherType(condition);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            // Density varies by type
            let count = 0;
            if (type === 'Snow') count = Math.floor((width * height) / 10000);
            else if (type === 'Rain') count = Math.floor((width * height) / 6000); // Rain needs more density
            else count = Math.floor((width * height) / 15000); // Clear needs fewer

            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(createParticle(width, height));
            }
        };

        const createParticle = (w: number, h: number): Particle => {
            if (type === 'Rain') {
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 15 + 10, // Length of drop
                    speed: Math.random() * 10 + 15, // Fast
                    opacity: Math.random() * 0.3 + 0.1,
                    drift: 0 // Rain usually falls straight-ish in this style
                };
            } else if (type === 'Snow') {
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 2 + 0.5,
                    speed: Math.random() * 1 + 0.5,
                    opacity: Math.random() * 0.5 + 0.3,
                    drift: Math.random() * 0.5 - 0.25
                };
            } else {
                // Clear/Sun - floating dust/pollen
                return {
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 1.5 + 0.5,
                    speed: Math.random() * 0.2 + 0.1, // Very slow
                    opacity: Math.random() * 0.3 + 0.1,
                    drift: Math.random() * 0.2 - 0.1
                };
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();

            if (type === 'Rain') {
                ctx.strokeStyle = "rgba(174, 194, 224, 0.5)";
                ctx.lineWidth = 1;
                particles.forEach(p => {
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x, p.y + p.size);
                });
                ctx.stroke();
            } else {
                ctx.fillStyle = type === 'Clear' ? "rgba(255, 255, 200, 0.5)" : "white";
                particles.forEach(p => {
                    ctx.moveTo(p.x, p.y);
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                });
                ctx.fill();
            }

            update();
            animationFrameId = requestAnimationFrame(draw);
        };

        const update = () => {
            particles.forEach(p => {
                p.y += p.speed;
                p.x += p.drift;

                if (p.y > canvas.height) {
                    p.y = -p.size;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x > canvas.width) p.x = 0;
                else if (p.x < 0) p.x = canvas.width;
            });
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [type]); // Re-run if type changes

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[-1] transition-opacity duration-1000"
        />
    );
}
