  
  //Реализуйте базовую логику функции для мемоизации
  
  //Универсальная функция memoize:
  function memoize<F extends (...args: any[]) => any>(fn: F): F {
    const cache: Record<string, ReturnType<F>> = {}; // Кэш для хранения результатов
  
    return function (...args: Parameters<F>): ReturnType<F> {
      const key = JSON.stringify(args); // Создаем ключ на основе аргументов
  
      if (key in cache) {
        console.log("Fetching from cache:", key);
        return cache[key];
      }
  
      console.log("Calculating result:", key);
      const result = fn(...args); // Вызываем оригинальную функцию
      cache[key] = result; // Сохраняем результат в кэше
      return result;
    } as F;
  } 