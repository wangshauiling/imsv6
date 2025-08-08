/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-06-15 创建 - 彭招军
 *
 */

package com.pangus.ims.custom.server.demo.dbinit.dml;

import com.pangus.ims.custom.server.demo.util.DemoColumnType;
import com.pangus.ims.fa.core.dbinit.annotation.DbMetaData;
import com.pangus.ims.fa.core.util.BooleanConstants;
import com.pangus.ims.fa.core.util.CoreColumnType;
import com.pangus.ims.fa.web.util.BaseImsSystemDml;

/**
 * 系统信息初始化类
 *
 * @author 彭招军
 */
@DbMetaData
public class ImsSystemDml extends BaseImsSystemDml {
    public ImsSystemDml() {
//        add(DemoColumnType.SystemCode.CUSTOM, "demo", 10, CoreColumnType.SystemIconCode.BS, "#00a0e9", BooleanConstants.TRUE);
    }
}
