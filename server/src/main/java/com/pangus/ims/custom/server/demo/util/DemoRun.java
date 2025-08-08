/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-03-15 创建 - xxx
 *
 */

package com.pangus.ims.custom.server.demo.util;

import com.pangus.ims.bs.util.BsRun;
import com.pangus.ims.custom.server.demo.controller.DemoController;
import com.pangus.ims.custom.server.demo.model.DemoXxxModel;
import com.pangus.ims.custom.server.demo.service.DemoService;
import com.pangus.ims.eam.util.EamRun;
import com.pangus.ims.fa.core.util.BeanDto;
import com.pangus.ims.fa.web.util.AbstractBeanConfig;
import com.pangus.ims.iot.util.IotRun;
import com.pangus.ims.mas.util.MasRun;
import com.pangus.ims.mes.util.MesRun;
import com.pangus.ims.pcb.util.PcbRun;
import com.pangus.ims.qc.util.QcRun;
import com.pangus.ims.smt.util.SmtRun;
import com.pangus.ims.sup.util.SupRun;
import com.pangus.ims.system.util.SystemRun;
import com.pangus.ims.wms.util.WmsRun;

/**
 * 运行配置类型
 * <p>
 * 可以根据系统边界选择性配置
 *
 * @author xxx
 */
public class DemoRun extends AbstractBeanConfig {
    public DemoRun() {
        // system
        add(new SystemRun());
        // bs
        add(new BsRun());
        // eam
        add(new EamRun());
        // qcs
        add(new QcRun());
        // wms
        add(new WmsRun());
        // mes
        add(new MesRun());
        // iot
        add(new IotRun());
        // sup
        add(new SupRun());
        // smt
        add(new SmtRun());
        // mas
        add(new MasRun());
        // pcb
        add(new PcbRun());

        // custom
        add(new BeanDto(DemoConfigure.class));
        add(new BeanDto(DemoXxxModel.class));
        add(new BeanDto(DemoService.class));
        add(new BeanDto(DemoController.class));

    }
}
