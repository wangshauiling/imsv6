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
import com.pangus.ims.fa.web.util.BaseImsMessageDml;

/**
 * 国际化信息初始化类
 *
 * @author xxx
 */
@DbMetaData
public class ImsMessageDml extends BaseImsMessageDml {
    public ImsMessageDml() {
        add("demo.msg.0001", "BS0001：%s 流水号达到最大上限：%s。");
        add("demo.msg.0002", "全局策略");
    }
}
