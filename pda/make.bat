@echo off
title ims-v6 building...
rem
rem  ims-v6
rem
rem  Copyright(c) 2022-2024 Pangus, Inc.
rem

echo on

call npm install --loglevel verbose || goto CERROR
call npm run build --loglevel verbose || goto CERROR


@echo off
echo �����ɹ���
pause
exit
:CERROR
@echo off
color 4
echo ����ʧ�ܣ�
pause
