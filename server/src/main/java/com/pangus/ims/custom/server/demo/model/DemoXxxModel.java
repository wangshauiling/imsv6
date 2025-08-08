/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-03-15 创建 - xxx
 *
 */

package com.pangus.ims.custom.server.demo.model;

import com.pangus.ims.custom.server.demo.util.DemoColumnType;
import com.pangus.ims.fa.web.annotation.DataModel;
import com.pangus.ims.fa.web.dao.MasterDaoHelper;
import com.pangus.ims.fa.web.dao.MasterDataModel;
import org.springframework.beans.factory.annotation.Autowired;

@DataModel(DemoColumnType.SystemCode.CUSTOM + "/demoXxxModel")
public class DemoXxxModel extends MasterDataModel {
    @Autowired
    private MasterDaoHelper masterDaoHelper;

    public DemoXxxModel() {
        setModelCode("dem_xxx");

    }
}
