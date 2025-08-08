/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-03-15 创建 - xxx
 *
 */

package com.pangus.ims.custom.server.demo;

import com.pangus.ims.custom.server.demo.util.AppConfigure;
import com.pangus.ims.fa.core.util.Constants;
import com.pangus.ims.fa.core.util.RunModeUtils;
import com.pangus.ims.fa.web.util.BaseServerApplication;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Import;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * 应用定义类
 *
 * @author xxx
 */
@EnableScheduling
@SpringBootApplication(scanBasePackages = {Constants.SERVER_CORE_PACKAGE_NAME})
@Import(AppConfigure.class)
public class Application extends BaseServerApplication {
    public static void main(final String[] args) {
        RunModeUtils.initialize(args, isServlet(args), true);
        final SpringApplicationBuilder appBuilder = new SpringApplicationBuilder(Application.class);
        appBuilder.web(isServlet(args) ? WebApplicationType.SERVLET : WebApplicationType.NONE).run(args);
    }
}
