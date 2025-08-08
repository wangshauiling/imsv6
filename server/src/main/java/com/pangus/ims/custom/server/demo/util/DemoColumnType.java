/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-03-15 创建 - xxx
 *
 */

package com.pangus.ims.custom.server.demo.util;

import com.pangus.ims.fa.core.util.CoreColumnType;

/**
 * 栏位转义定义类型
 *
 * @author xxx
 */
public final class DemoColumnType {

    public static class SystemCode extends CoreColumnType.SystemCode {
        /**
         * {@value} - 项目编码
         */
        public static final String CUSTOM = "demo";
    }

}
