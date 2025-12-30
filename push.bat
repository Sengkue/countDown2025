@echo off
setlocal
cd /d "%~dp0"

:loop
REM 1. Get the current timestamp
for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"`) do set "TIMESTAMP=%%i"

echo [%TIMESTAMP%] Checking for changes...

REM 2. Stage all changes
git add -A

REM 3. Attempt to commit (Redirect errors to null so it stays clean)
git commit -m "Auto commit %TIMESTAMP%" >nul 2>&1

REM 4. If there was something to commit, push it
if %ERRORLEVEL% EQU 0 (
    echo Changes detected. Pushing to origin...
    git push
    echo Done.
) else (
    echo No changes found.
)

REM 5. Wait for 10 seconds
echo Waiting 10 seconds before next check...
timeout /t 10 /nobreak

REM 6. Go back to the start
goto loop

endlocal