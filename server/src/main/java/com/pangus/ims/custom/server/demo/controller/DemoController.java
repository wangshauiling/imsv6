/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-03-15 创建 - xxx
 *
 */

package com.pangus.ims.custom.server.demo.controller;

import com.pangus.ims.custom.server.demo.service.DemoService;
import com.pangus.ims.custom.server.demo.util.DemoColumnType;
import com.pangus.ims.fa.web.util.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 控制器实现类定义
 *
 * @author xxx
 */
@RestController
@RequestMapping(DemoColumnType.SystemCode.CUSTOM)
public class DemoController extends BaseController {
    @Autowired
    private DemoService demoService;

//    @RequestMapping(value = "/getData", method = RequestMethod.POST)
//    public DataRow getData(@RequestBody Params params) {
//        return new DataRowImpl();
//    }

}
