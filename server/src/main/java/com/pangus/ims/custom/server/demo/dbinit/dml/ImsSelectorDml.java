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
import com.pangus.ims.fa.core.dbinit.util.ScriptParams;
import com.pangus.ims.fa.web.util.BaseImsSelectorDml;

/**
 * 选择器初始化类
 *
 * @author xxx
 */
@DbMetaData
public class ImsSelectorDml extends BaseImsSelectorDml {

    public ImsSelectorDml() {
        ScriptParams dataRow = null;

//        bs_country
//        dataRow = new ScriptParams(ScriptType.INSERT_OR_UPDATE);
//        dataRow.setString("system_code", CoreColumnType.SystemCode.BS);
//        dataRow.setString("selector_code", BsColumnType.SelectorCode.BS_COUNTRY);
//        dataRow.setString("is_valid", BooleanConstants.TRUE);
//        dataRow.setString("selector_name", "国家地区列表");
//        dataRow.setString("list_table_name", "bs_country");
//        dataRow.setString("list_column", "bs_country.country_code,bs_country.country_name,bs_country.is_valid,bs_country.remark");
//        dataRow.setString("list_result_column", "country_code");
//        dataRow.setString("list_sort_column", "country_code");
//        add(dataRow);

    }
}
