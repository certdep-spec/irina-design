@echo off
:: Установка переменной для контроля ошибок
SETLOCAL EnableDelayedExpansion
SET BUILD_SUCCESS=1

:: Строим проект
echo Building project...
npm run build

:: Проверяем результат сборки
if %errorlevel% equ 0 (
  echo Build successful!
) else (
  echo Build failed! Error level: %errorlevel%
  SET BUILD_SUCCESS=0
)

:: Запускаем локальный сервер только при успешной сборке
if !BUILD_SUCCESS! neq 1 (
  echo Skipping server start due to build failure.
  pause
  exit /b %errorlevel%
)

echo Starting local preview server on port 4173...
npm run preview

:: Держим окно открытым после завершения
pause