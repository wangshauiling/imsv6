/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-03-15 创建 - xxx
 *
 */

package com.pangus.ims.custom.server.demo.dbinit.dml;

import com.pangus.ims.fa.core.dbinit.annotation.DbMetaData;
import com.pangus.ims.fa.web.util.BaseImsJobDml;

/**
 * 定时任务初始化类
 *
 * @author xxx
 */
@DbMetaData
public class ImsJobDml extends BaseImsJobDml {

    public ImsJobDml() {

        //add("mockRcsCallbackJob", "模拟RCS回调定时任务", BooleanConstants.FALSE, "0/30 * * * * ?", CoreColumnType.JobImplType.BEAN, "mockRcsCallbackJobService", CoreColumnType.SystemCode.BS);

    }
}
