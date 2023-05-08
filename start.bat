@ECHO OFF
setlocal
set NODEPATH=./
npm run start
start chrome http://localhost:3000
endlocal
pause