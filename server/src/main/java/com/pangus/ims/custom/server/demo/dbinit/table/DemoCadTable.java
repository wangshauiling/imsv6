/*
 * IMS-V6
 *
 * 版权所有 (c) 2024-2024 广东盘古信息科技股份有限公司
 *
 * 2024-03-15 创建 - xxx
 *
 */

package com.pangus.ims.custom.server.demo.dbinit.table;

import com.pangus.ims.custom.server.demo.util.DemoColumnType;
import com.pangus.ims.fa.core.dbinit.Table;
import com.pangus.ims.fa.core.dbinit.annotation.DbMetaData;

/**
 * CAD表定义
 *
 * @author xxx
 **/
@DbMetaData
public class DemoCadTable extends Table {
    public DemoCadTable() {
        super("demo_cad", "CAD主表");
        setSystemCode(DemoColumnType.SystemCode.CUSTOM);
        // column
//        addColumn(new Column("org_code", BsColumnDescDef.ORG_CODE, false));
//        addColumn(new Column("prod_code", BsColumnDescDef.PROD_CODE, false));
//        addColumn(new Column("top_pcnt", BsColumnDescDef.TOP_PCNT, false)).setDefValue(0);
//        addColumn(new Column("bot_pcnt", BsColumnDescDef.BOT_PCNT, false)).setDefValue(0);
//        addColumn(new Column("all_pcnt", BsColumnDescDef.ALL_PCNT, false)).setDefValue(0);
//        addColumn(new Column("remark", BsColumnDescDef.REMARK));
//        // index
//        addIndex(new Index("pk_bs_cad", IndexType.PRIMARY_KEY, new String[]{"org_code", "prod_code"}));
//        addIndex(new Index("ix_bs_cad_fixed", IndexType.NON_UNIQUE, new String[]{"updated_date"}));

    }
}
