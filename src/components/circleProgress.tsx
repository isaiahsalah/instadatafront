import {cn} from "@/lib/utils";
import {useEffect, useState, forwardRef, useImperativeHandle} from "react";

export interface CircleProgressProps {
  duration?: number; // Duración total del progreso en milisegundos
  step?: number; // Intervalo de actualización en milisegundos
  onComplete?: () => void; // Callback al completar el progreso
  size?: number; // Tamaño del círculo en px
  className?: string; // Clase adicional para el contenedor
}

export interface CircleProgressRef {
  resetProgress: () => void; // Método para reiniciar el progreso
}

export const CircleProgress = forwardRef<CircleProgressRef, CircleProgressProps>(
  ({duration = 300000, step = 100, onComplete = () => {}, size = 100, className}, ref) => {
    const [progress, setProgress] = useState<number>(0);

    useImperativeHandle(ref, () => ({
      resetProgress: () => setProgress(0), // Método para reiniciar el progreso
    }));

    useEffect(() => {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const newProgress = (elapsedTime / duration) * 100;
        //console.log("Progreso:", newProgress);

        if (newProgress >= 100) {
          setProgress(0); // Reinicia el progreso
          onComplete();
          clearInterval(interval);
        } else {
          setProgress(newProgress);
        }
      }, step);

      return () => clearInterval(interval);
    }, [duration, step, onComplete]);

    const radius = (size - 10) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className={cn("flex flex-col items-center", className)}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={radius} strokeWidth="10" fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="dark:stroke-gray-500 stroke-gray-600 "
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (circumference * progress) / 100}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{transition: "stroke-dashoffset 0.1s linear"}}
          />
        </svg>
      </div>
    );
  }
);
