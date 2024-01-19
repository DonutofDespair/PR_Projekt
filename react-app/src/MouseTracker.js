import React, { useEffect, useRef } from 'react';

const CustomMouseTracker = () => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const hueRef = useRef(220);
    const incrementsRef = useRef(true);
    const initialOffsetRef = useRef(0); // Początkowe przesunięcie animacji od kursora
    const constantOffsetX = 0; // Stałe przesunięcie w osi X
    const constantOffsetY = 0; // Stałe przesunięcie w osi Y

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const particleCount = 2; // Ilość cząsteczek
        const particleSize = 18; // Rozmiar cząsteczki
        const speedX = 3; // Szybkość ruchu w poziomie
        const halfSpeedX = speedX / 2;
        const speedY = 3; // Szybkość ruchu w pionie
        const halfSpeedY = speedY / 2;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const Particle = function (x, y) {
            // Początkowe położenie cząsteczki z losowym przesunięciem
            this.x = x + (Math.random() - 0.5) * initialOffsetRef.current + constantOffsetX;
            this.y = y + (Math.random() - 0.5) * initialOffsetRef.current + constantOffsetY;
            this.size = Math.random() * particleSize + 1;
            this.speedX = Math.random() * speedX - halfSpeedX;
            this.speedY = Math.random() * speedY - halfSpeedY;
            this.color = `hsla(${hueRef.current}, 100%, 50%, 0.5)`;
        };

        Particle.prototype.update = function () {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > 0.2) {
                this.size -= 0.1;
            }
        };

        Particle.prototype.draw = function () {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        };

        const handleParticles = () => {
            for (let i = 0; i < particlesRef.current.length; i++) {
                particlesRef.current[i].update();
                particlesRef.current[i].draw();

                for (let j = i; j < particlesRef.current.length; j++) {
                    const dx = particlesRef.current[i].x - particlesRef.current[j].x;
                    const dy = particlesRef.current[i].y - particlesRef.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = particlesRef.current[i].color;
                        ctx.lineWidth = particlesRef.current[i].size / 10;
                        ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
                        ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }

                if (particlesRef.current[i].size <= 0.3) {
                    particlesRef.current.splice(i, 1);
                    i--;
                }
            }
        };

        const handleMouseMove = (e) => {
            const { clientX: x, clientY: y } = e;
            spawnParticles(x, y);
        };

        const spawnParticles = (x, y) => {
            for (let i = 0; i < particleCount; i++) {
                let particle = new Particle(x, y);
                particlesRef.current.push(particle);
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (incrementsRef.current) {
                hueRef.current += 2;
                if (hueRef.current >= 275) {
                    incrementsRef.current = false;
                }
            } else {
                hueRef.current -= 1;
                if (hueRef.current <= 220) {
                    incrementsRef.current = true;
                }
            }

            handleParticles();
            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 5000,
                left: 0,
                top: 0,
            }}
        />
    );
};

export default CustomMouseTracker;
