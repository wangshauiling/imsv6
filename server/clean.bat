@echo off
title ims-server cleaning up
rem
rem  ims-v6
rem
rem  Copyright(c) 2022-2024 Pangus, Inc.
rem

echo on
set basedir=%cd%

cd %basedir%
call mvn clean || goto CERROR

@echo off
echo ����ɹ���
pause
exit
:CERROR
@echo off
echo ����ʧ�ܣ�
pause
