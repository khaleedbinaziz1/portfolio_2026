'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';

const GRID_SIZE = 20;
const CELL_SIZE = 12;

interface Position {
  x: number;
  y: number;
}

// Simple pathfinding to move toward food
const getNextDirection = (head: Position, food: Position, currentDir: Position, snake: Position[]): Position => {
  const dx = food.x - head.x;
  const dy = food.y - head.y;

  // Normalize wrap-around distances
  const wrapDx = dx > GRID_SIZE / 2 ? dx - GRID_SIZE : dx < -GRID_SIZE / 2 ? dx + GRID_SIZE : dx;
  const wrapDy = dy > GRID_SIZE / 2 ? dy - GRID_SIZE : dy < -GRID_SIZE / 2 ? dy + GRID_SIZE : dy;

  // Try to move toward food
  let newDir = { ...currentDir };

  // Prefer horizontal movement if horizontal distance is greater
  if (Math.abs(wrapDx) > Math.abs(wrapDy)) {
    if (wrapDx > 0 && currentDir.x === 0) {
      newDir = { x: 1, y: 0 };
    } else if (wrapDx < 0 && currentDir.x === 0) {
      newDir = { x: -1, y: 0 };
    }
  } else {
    if (wrapDy > 0 && currentDir.y === 0) {
      newDir = { x: 0, y: 1 };
    } else if (wrapDy < 0 && currentDir.y === 0) {
      newDir = { x: 0, y: -1 };
    }
  }

  // Check if new direction would cause collision
  const nextHead = { x: head.x + newDir.x, y: head.y + newDir.y };
  if (nextHead.x < 0) nextHead.x = GRID_SIZE - 1;
  if (nextHead.x >= GRID_SIZE) nextHead.x = 0;
  if (nextHead.y < 0) nextHead.y = GRID_SIZE - 1;
  if (nextHead.y >= GRID_SIZE) nextHead.y = 0;

  const wouldCollide = snake.some(seg => seg.x === nextHead.x && seg.y === nextHead.y);

  // If would collide, try alternative directions
  if (wouldCollide) {
    const alternatives = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ].filter(dir => 
      dir.x !== -currentDir.x && dir.y !== -currentDir.y
    );

    for (const alt of alternatives) {
      const altHead = { x: head.x + alt.x, y: head.y + alt.y };
      if (altHead.x < 0) altHead.x = GRID_SIZE - 1;
      if (altHead.x >= GRID_SIZE) altHead.x = 0;
      if (altHead.y < 0) altHead.y = GRID_SIZE - 1;
      if (altHead.y >= GRID_SIZE) altHead.y = 0;

      const wouldCollideAlt = snake.some(seg => seg.x === altHead.x && seg.y === altHead.y);
      if (!wouldCollideAlt) {
        return alt;
      }
    }
  }

  return newDir;
};

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Position>({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const generateFood = useCallback((): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y));
    return newFood;
  }, [snake]);

  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    return body.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  const gameLoop = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      
      // Auto-calculate next direction
      const newDirection = getNextDirection(head, food, direction, prevSnake);
      setDirection(newDirection);
      
      head.x += newDirection.x;
      head.y += newDirection.y;

      // Wrap around edges
      if (head.x < 0) head.x = GRID_SIZE - 1;
      if (head.x >= GRID_SIZE) head.x = 0;
      if (head.y < 0) head.y = GRID_SIZE - 1;
      if (head.y >= GRID_SIZE) head.y = 0;

      // Check collision with self
      if (checkCollision(head, prevSnake)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check if food eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        const newFood = generateFood();
        setFood(newFood);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isPlaying, gameOver, checkCollision, generateFood]);

  // Start game after a delay when component mounts - emerges from cursor
  useEffect(() => {
    const startTimer = setTimeout(() => {
      setHasStarted(true);
      setIsPlaying(true);
    }, 3500); // Start 3.5 seconds after page load (after cursor appears)

    return () => clearTimeout(startTimer);
  }, []);

  // Auto-restart on game over
  useEffect(() => {
    if (gameOver && hasStarted) {
      const restartTimer = setTimeout(() => {
        setSnake([{ x: 10, y: 10 }]);
        setFood(generateFood());
        setDirection({ x: 1, y: 0 });
        setGameOver(false);
        setScore(0);
        setIsPlaying(true);
      }, 2000);
      return () => clearTimeout(restartTimer);
    }
  }, [gameOver, hasStarted, generateFood]);

  useEffect(() => {
    if (isPlaying && !gameOver && hasStarted) {
      gameLoopRef.current = setInterval(gameLoop, 130);
    } else if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameLoop, isPlaying, gameOver, hasStarted]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: -30, scale: 0.85 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1, delay: 3.2, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="relative mt-4 md:mt-6"
    >
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: '100%', opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.2 }}
        className="h-0.5 bg-gradient-to-r from-[#006400] via-[#008b8b] to-transparent mb-3"
        style={{ boxShadow: '0 0 4px rgba(0, 100, 0, 0.4)' }}
      />
      <div 
        className="relative border-2 p-3 md:p-4 overflow-hidden"
        style={{
          borderColor: 'rgba(0, 100, 0, 0.3)',
          backgroundColor: 'rgba(0, 100, 0, 0.05)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
          <div className="flex items-center gap-2">
            <motion.span 
              className="text-xs text-[#006400]"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiPlay size={16} />
            </motion.span>
            <h3 className="text-sm md:text-base font-bold text-[#006400]">Auto Snake</h3>
          </div>
          <span className="text-xs text-[#4a4a4a]">Score: <span className="text-[#006400] font-bold">{score}</span></span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div 
            className="relative grid gap-0 mx-auto"
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            }}
          >
            {/* Grid cells */}
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              const isSnake = snake.some(seg => seg.x === x && seg.y === y);
              const isHead = snake[0]?.x === x && snake[0]?.y === y;
              const isFood = food.x === x && food.y === y;
              const snakeIndex = snake.findIndex(seg => seg.x === x && seg.y === y);

              return (
                <div
                  key={i}
                  className="border border-[rgba(0,100,0,0.1)]"
                  style={{
                    width: CELL_SIZE,
                    height: CELL_SIZE,
                    backgroundColor: isHead 
                      ? '#006400' 
                      : isSnake && snakeIndex > 0
                        ? `rgba(0, 100, 0, ${0.4 + (snakeIndex / snake.length) * 0.3})`
                        : isFood 
                          ? '#cc6600' 
                          : 'transparent',
                    boxShadow: isHead ? '0 0 6px rgba(0, 100, 0, 0.5)' : isFood ? '0 0 4px rgba(204, 102, 0, 0.5)' : 'none',
                    transition: 'background-color 0.15s ease, box-shadow 0.15s ease',
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
