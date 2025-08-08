@echo off
title ims-server building
rem
rem  ims-v6
rem
rem  Copyright(c) 2022-2024 Pangus, Inc.
rem

echo on
set basedir=%cd%

cd %basedir%
call mvn clean install || goto CERROR

@echo off
echo 构建成功。
pause
exit
:CERROR
@echo off
echo 构建失败！
pause
