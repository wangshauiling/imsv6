/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-03-15 创建 - xxx
 *
 */

package com.pangus.ims.custom.server.demo.util;

import com.pangus.ims.bs.util.BsColumnDescDef;
import com.pangus.ims.eam.util.EamColumnDescDef;
import com.pangus.ims.fa.core.util.CoreColumnDescDef;
import com.pangus.ims.iot.util.IotColumnDescDef;
import com.pangus.ims.mas.util.MasColumnDescDef;
import com.pangus.ims.mes.util.MesColumnDescDef;
import com.pangus.ims.pcb.util.PcbColumnDescDef;
import com.pangus.ims.qc.util.QcColumnDescDef;
import com.pangus.ims.smt.util.SmtColumnDescDef;
import com.pangus.ims.sup.util.SupColumnDescDef;
import com.pangus.ims.wms.util.WmsColumnDescDef;

/**
 * 栏位定义类型
 *
 * @author xxx
 */
public class DemoColumnDescDef implements CoreColumnDescDef, BsColumnDescDef, SupColumnDescDef, WmsColumnDescDef, QcColumnDescDef, MesColumnDescDef, EamColumnDescDef, IotColumnDescDef, SmtColumnDescDef, MasColumnDescDef, PcbColumnDescDef {

//    /**
//     * bs_msd_lv
//     */
//    public static final ColumnDesc MSD_LV_CODE = new ColumnDesc("级别编码", ColumnDescDef.CODE);
//    public static final ColumnDesc MSD_LV_NAME = new ColumnDesc("级别名称", ColumnDescDef.NAME);
//    public static final ColumnDesc MSD_EX_TM = new ColumnDesc("可暴露时间", ColumnDescDef.QTY);
//    public static final ColumnDesc MSD_EX_UNIT = new ColumnDesc("单位", ColumnDescDef.STAT, column -> {
//        column.addMapValue(BsColumnType.MsdExUnit.HOUR, "小时");
//        column.addMapValue(BsColumnType.MsdExUnit.YEAR, "年");
//    });

}

