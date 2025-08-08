/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-03-15 创建 - xxx
 *
 */

package com.pangus.ims.custom.server.demo.util;

import com.pangus.ims.fa.core.util.CustomConfigure;
import com.pangus.ims.fa.web.annotation.ApiVersion;
import org.springframework.stereotype.Component;

/**
 * 项目配置定义类
 *
 * @author xxx
 */
@ApiVersion
@Component
public class DemoConfigure implements CustomConfigure {

    /**
     * 得到项目编码
     * <p>
     * 与我们内部项目管理系统的编码保持一致。
     *
     * @return 返回项目编码
     */
    @Override
    public String getCode() {
        return DemoColumnType.SystemCode.CUSTOM;
    }

    /**
     * 得到项目版本
     * <p>
     * 每次升级都需要更改版本号，如： 1.0.0 -> 1.0.1 -> 1.0.2 ....
     *
     * @return 返回项目版本
     */
    @Override
    public String getVersion() {
        return "1.0.0";
    }
}
