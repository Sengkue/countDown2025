@echo off
REM Commit all changes with current timestamp and push to origin
cd /d "%~dp0"
setlocal

for /f "usebackq delims=" %%i in (`powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm:ss'"`) do set "TIMESTAMP=%%i"

echo Using timestamp: %TIMESTAMP%

REM Stage all changes
git add -A

REM Commit the changes
git commit -m "Auto commit %TIMESTAMP%"

REM Check if commit was successful before pushing
if %ERRORLEVEL% EQU 0 (
    echo Commit successful. Pushing to origin...
    git push
    echo Process complete!
) else (
    echo No changes to commit or commit failed.
)

pause
exit /b 0
endlocal