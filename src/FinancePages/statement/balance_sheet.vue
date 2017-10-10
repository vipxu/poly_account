<!-- 资产负债表 -->
<template>
    <div id="balance_sheet">
        <!-- 头开始 -->
        <el-row>
            <div class="vl-top-left">
                <span class="fz4">资产负债表</span>
                <template>
                    <el-select v-model="periodUid" size="small" @change="selectPer()">
                        <el-option v-for="item in periodsList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
                <el-button size="small">刷新</el-button>
            </div>
            <div class="vl-top-right">
                <el-button type="primary" size="small">打印</el-button>
                <el-button size="small">导出 </el-button>
            </div>
        </el-row>
        <!-- 头结束 -->
        <!-- table开始 -->
        <div class="sheet-context">
            <table class="sheet-table" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <td style="width:20%">资产</td>
                        <td style="width:10%">行次</td>
                        <td style="width:10%">期末数</td>
                        <td style="width:10%">年初数</td>
                        <td style="width:20%">负债和所有者（或股东）权益</td>
                        <td style="width:10%">行次</td>
                        <td style="width:10%">期末数</td>
                        <td style="width:10%">年初数</td>
                    </tr>
                </thead>
                <tbody>
                    <!-- 没有连接的头 -->
                    <tr>
                        <td>流动资产：</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>流动负债：</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <!-- 流动资金的一个渲染 循环 -->
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[0].formula,sheetData[0].reportUid)">货币资金</el-button>                           
                        </td>
                        <td style="text-align: center;" >1</td>
                        <td style="text-align: right;" v-text="sheetData[0].monthSum==0?'':sheetData[0].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[0].yearSum==0?'':sheetData[0].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[29].formula,sheetData[29].reportUid)">短期借款</el-button>
                            
                        </td>
                        <td style="text-align: center;">30</td>
                        <td style="text-align: right;" v-text="sheetData[29].monthSum==0?'':sheetData[29].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[29].yearSum==0?'':sheetData[29].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[1].formula,sheetData[1].reportUid)">交易性金融资产</el-button>
                            
                        </td>
                        <td style="text-align: center;">2</td>
                        <td style="text-align: right;" v-text="sheetData[1].monthSum==0?'':sheetData[1].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[1].yearSum==0?'':sheetData[1].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[30].formula,sheetData[30].reportUid)">交易性金融负债</el-button>
                            
                        </td>
                        <td style="text-align: center;">31</td>
                        <td style="text-align: right;" v-text="sheetData[30].monthSum==0?'':sheetData[30].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[30].yearSum==0?'':sheetData[30].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[2].formula,sheetData[2].reportUid)">应收票据</el-button>
                            
                        </td>
                        <td style="text-align: center;">3</td>
                        <td style="text-align: right;" v-text="sheetData[2].monthSum==0?'':sheetData[2].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[2].yearSum==0?'':sheetData[2].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[31].formula,sheetData[31].reportUid)">应付票据</el-button>
                            
                        </td>
                        <td style="text-align: center;">32</td>
                        <td style="text-align: right;" v-text="sheetData[31].monthSum==0?'':sheetData[31].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[31].yearSum==0?'':sheetData[31].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[3].formula,sheetData[3].reportUid)">应收账款</el-button>
                            
                        </td>
                        <td style="text-align: center;">4</td>
                        <td style="text-align: right;" v-text="sheetData[3].monthSum==0?'':sheetData[3].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[3].yearSum==0?'':sheetData[3].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[32].formula,sheetData[32].reportUid)">应付账款</el-button>
                            
                        </td>
                        <td style="text-align: center;">33</td>
                        <td style="text-align: right;" v-text="sheetData[32].monthSum==0?'':sheetData[32].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[32].yearSum==0?'':sheetData[32].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[4].formula,sheetData[4].reportUid)">预付款项</el-button>
                            
                        </td>
                        <td style="text-align: center;">5</td>
                        <td style="text-align: right;" v-text="sheetData[4].monthSum==0?'':sheetData[4].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[4].yearSum==0?'':sheetData[4].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[33].formula,sheetData[33].reportUid)">预收款项</el-button>
                            
                        </td>
                        <td style="text-align: center;">34</td>
                        <td style="text-align: right;" v-text="sheetData[33].monthSum==0?'':sheetData[33].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[33].yearSum==0?'':sheetData[33].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[5].formula,sheetData[5].reportUid)">应收利息</el-button>
                            
                        </td>
                        <td style="text-align: center;">6</td>
                        <td style="text-align: right;" v-text="sheetData[5].monthSum==0?'':sheetData[5].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[5].yearSum==0?'':sheetData[5].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[34].formula,sheetData[34].reportUid)">应付职工薪酬</el-button>
                            
                        </td>
                        <td style="text-align: center;">35</td>
                        <td style="text-align: right;" v-text="sheetData[34].monthSum==0?'':sheetData[34].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[34].yearSum==0?'':sheetData[34].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[6].formula,sheetData[6].reportUid)">应收股利</el-button>
                            
                        </td>
                        <td style="text-align: center;">7</td>
                        <td style="text-align: right;" v-text="sheetData[6].monthSum==0?'':sheetData[6].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[6].yearSum==0?'':sheetData[6].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[35].formula,sheetData[35].reportUid)">应交税费</el-button>
                            
                        </td>
                        <td style="text-align: center;">36</td>
                        <td style="text-align: right;" v-text="sheetData[35].monthSum==0?'':sheetData[35].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[35].yearSum==0?'':sheetData[35].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[7].formula,sheetData[7].reportUid)">其他应收款</el-button>
                            
                        </td>
                        <td style="text-align: center;">8</td>
                        <td style="text-align: right;" v-text="sheetData[7].monthSum==0?'':sheetData[7].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[7].yearSum==0?'':sheetData[7].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[36].formula,sheetData[36].reportUid)">应付利息</el-button>
                            
                        </td>
                        <td style="text-align: center;">37</td>
                        <td style="text-align: right;" v-text="sheetData[36].monthSum==0?'':sheetData[36].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[36].yearSum==0?'':sheetData[36].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[8].formula,sheetData[8].reportUid)">存货</el-button>
                            
                        </td>
                        <td style="text-align: center;">9</td>
                        <td style="text-align: right;" v-text="sheetData[8].monthSum==0?'':sheetData[8].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[8].yearSum==0?'':sheetData[8].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[37].formula,sheetData[37].reportUid)">应付股利</el-button>
                            
                        </td>
                        <td style="text-align: center;">38</td>
                        <td style="text-align: right;" v-text="sheetData[37].monthSum==0?'':sheetData[37].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[37].yearSum==0?'':sheetData[37].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[9].formula,sheetData[9].reportUid)">一年内到期的非流动资产</el-button>
                            
                        </td>
                        <td style="text-align: center;">10</td>
                        <td style="text-align: right;" v-text="sheetData[9].monthSum==0?'':sheetData[9].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[9].yearSum==0?'':sheetData[9].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[38].formula,sheetData[38].reportUid)">其他应付款</el-button>
                            
                        </td>
                        <td style="text-align: center;">39</td>
                        <td style="text-align: right;" v-text="sheetData[38].monthSum==0?'':sheetData[38].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[38].yearSum==0?'':sheetData[38].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[10].formula,sheetData[10].reportUid)">其他流动资产</el-button>
                            
                        </td>
                        <td style="text-align: center;">11</td>
                        <td style="text-align: right;" v-text="sheetData[10].monthSum==0?'':sheetData[10].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[10].yearSum==0?'':sheetData[10].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[39].formula,sheetData[39].reportUid)">一年内到期的非流动负债</el-button>
                            
                        </td>
                        <td style="text-align: center;">40</td>
                        <td style="text-align: right;" v-text="sheetData[39].monthSum==0?'':sheetData[39].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[39].yearSum==0?'':sheetData[39].yearSum"></td>
                    </tr>
                    <tr>
                        <td>流动资产合计</td>                       
                        <td style="text-align: center;">12</td>
                        <td style="text-align: right;" v-text="sheetData[11].monthSum==0?'':sheetData[11].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[11].yearSum==0?'':sheetData[11].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[40].formula,sheetData[40].reportUid)">其他流动负债</el-button>
                            
                        </td>
                        <td style="text-align: center;">41</td>
                        <td style="text-align: right;" v-text="sheetData[40].monthSum==0?'':sheetData[40].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[40].yearSum==0?'':sheetData[40].yearSum"></td>
                    </tr>
                    <tr>
                        <td>非流动资产：</td>
                        <td style="text-align: center;"></td>
                        <td style="text-align: right;"></td>
                        <td style="text-align: right;"></td>
                        <td>流动负债合计</td>
                        <td style="text-align: center;">42</td>
                        <td style="text-align: right;" v-text="sheetData[41].monthSum==0?'':sheetData[41].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[41].yearSum==0?'':sheetData[41].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[12].formula,sheetData[12].reportUid)">可供出售金融资产</el-button>
                            
                        </td>
                        <td style="text-align: center;">13</td>
                        <td style="text-align: right;" v-text="sheetData[12].monthSum==0?'':sheetData[12].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[12].yearSum==0?'':sheetData[12].yearSum"></td>
                        <td>非流动负债：</td>
                        <td style="text-align: center;"></td>
                        <td style="text-align: right;" ></td>
                        <td style="text-align: right;" ></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[13].formula,sheetData[13].reportUid)">持有至到期投资</el-button>
                            
                        </td>
                        <td style="text-align: center;">14</td>
                        <td style="text-align: right;" v-text="sheetData[13].monthSum==0?'':sheetData[13].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[13].yearSum==0?'':sheetData[13].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[42].formula,sheetData[42].reportUid)">长期借款</el-button>
                            
                        </td>
                        <td style="text-align: center;">43</td>
                        <td style="text-align: right;" v-text="sheetData[42].monthSum==0?'':sheetData[42].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[42].yearSum==0?'':sheetData[42].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[14].formula,sheetData[14].reportUid)">长期应收款</el-button>
                            
                        </td>
                        <td style="text-align: center;">15</td>
                        <td style="text-align: right;" v-text="sheetData[14].monthSum==0?'':sheetData[14].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[14].yearSum==0?'':sheetData[14].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[43].formula,sheetData[43].reportUid)">应付债券</el-button>
                            
                        </td>
                        <td style="text-align: center;">44</td>
                        <td style="text-align: right;" v-text="sheetData[43].monthSum==0?'':sheetData[43].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[43].yearSum==0?'':sheetData[43].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[15].formula,sheetData[15].reportUid)">长期股权投资</el-button>
                            
                        </td>
                        <td style="text-align: center;">16</td>
                        <td style="text-align: right;" v-text="sheetData[15].monthSum==0?'':sheetData[15].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[15].yearSum==0?'':sheetData[15].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[44].formula,sheetData[44].reportUid)">长期应付款</el-button>
                            
                        </td>
                      
                        <td style="text-align: center;">45</td>
                        <td style="text-align: right;" v-text="sheetData[44].monthSum==0?'':sheetData[44].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[44].yearSum==0?'':sheetData[44].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[16].formula,sheetData[16].reportUid)">投资性房地产</el-button>
                            
                        </td>
                        <td style="text-align: center;">17</td>
                        <td style="text-align: right;" v-text="sheetData[16].monthSum==0?'':sheetData[16].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[16].yearSum==0?'':sheetData[16].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[45].formula,sheetData[45].reportUid)">专项应付款</el-button>
                            
                        </td>
                        <td style="text-align: center;">46</td>
                        <td style="text-align: right;" v-text="sheetData[45].monthSum==0?'':sheetData[45].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[45].yearSum==0?'':sheetData[45].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[17].formula,sheetData[17].reportUid)">固定资产</el-button>
                            
                        </td>
                        <td style="text-align: center;">18</td>
                        <td style="text-align: right;" v-text="sheetData[17].monthSum==0?'':sheetData[17].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[17].yearSum==0?'':sheetData[17].yearSum"></td>
                     
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[46].formula,sheetData[46].reportUid)">预计负债</el-button>
                            
                        </td>
                        <td style="text-align: center;">47</td>
                        <td style="text-align: right;" v-text="sheetData[46].monthSum==0?'':sheetData[46].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[46].yearSum==0?'':sheetData[46].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[18].formula,sheetData[18].reportUid)">在建工程</el-button>
                            
                        </td>
                        <td style="text-align: center;">19</td>
                        <td style="text-align: right;" v-text="sheetData[18].monthSum==0?'':sheetData[18].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[18].yearSum==0?'':sheetData[18].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[47].formula,sheetData[47].reportUid)">递延所得税负债</el-button>
                            
                        </td>
                        <td style="text-align: center;">48</td>
                        <td style="text-align: right;" v-text="sheetData[47].monthSum==0?'':sheetData[47].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[47].yearSum==0?'':sheetData[47].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[19].formula,sheetData[19].reportUid)">工程物资</el-button>
                            
                        </td>
                        <td style="text-align: center;">20</td>
                        <td style="text-align: right;" v-text="sheetData[19].monthSum==0?'':sheetData[19].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[19].yearSum==0?'':sheetData[19].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[48].formula,sheetData[48].reportUid)">其他非流动负债</el-button>
                            
                        </td>
                        <td style="text-align: center;">49</td>
                        <td style="text-align: right;" v-text="sheetData[48].monthSum==0?'':sheetData[48].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[48].yearSum==0?'':sheetData[48].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[20].formula,sheetData[20].reportUid)">固定资产清理</el-button>
                            
                        </td>
                        <td style="text-align: center;">21</td>
                        <td style="text-align: right;" v-text="sheetData[20].monthSum==0?'':sheetData[20].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[20].yearSum==0?'':sheetData[20].yearSum"></td>
                        <td>非流动负债合计</td>
                        <td style="text-align: center;">50</td>
                        <td style="text-align: right;" v-text="sheetData[49].monthSum==0?'':sheetData[49].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[49].yearSum==0?'':sheetData[49].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[21].formula,sheetData[21].reportUid)">无形资产</el-button>
                            
                        </td>
                        <td style="text-align: center;">22</td>
                        <td style="text-align: right;" v-text="sheetData[21].monthSum==0?'':sheetData[21].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[21].yearSum==0?'':sheetData[21].yearSum"></td>
                        <td>负债合计</td>
                        <td style="text-align: center;">51</td>
                        <td style="text-align: right;" v-text="sheetData[50].monthSum==0?'':sheetData[50].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[50].yearSum==0?'':sheetData[50].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[22].formula,sheetData[22].reportUid)">开发支出</el-button>
                            
                        </td>
                        <td style="text-align: center;">23</td>
                        <td style="text-align: right;" v-text="sheetData[22].monthSum==0?'':sheetData[22].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[22].yearSum==0?'':sheetData[22].yearSum"></td>
                        <td>所有者（或股东）权益：</td>
                        <td style="text-align: center;"></td>
                        <td style="text-align: right;"></td>
                        <td style="text-align: right;"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[23].formula,sheetData[23].reportUid)">商誉</el-button>
                            
                        </td>
                        <td style="text-align: center;">24</td>
                        <td style="text-align: right;" v-text="sheetData[23].monthSum==0?'':sheetData[23].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[23].yearSum==0?'':sheetData[23].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[51].formula,sheetData[51].reportUid)">实收资本（或股本）</el-button>
                            
                        </td>
                        <td style="text-align: center;">52</td>
                        <td style="text-align: right;" v-text="sheetData[51].monthSum==0?'':sheetData[51].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[51].yearSum==0?'':sheetData[51].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[24].formula,sheetData[24].reportUid)">长期待摊费用</el-button>
                            
                        </td>
                        <td style="text-align: center;">25</td>
                        <td style="text-align: right;" v-text="sheetData[24].monthSum==0?'':sheetData[24].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[24].yearSum==0?'':sheetData[24].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[52].formula,sheetData[52].reportUid)">资本公积</el-button>
                            
                        </td>
                        <td style="text-align: center;">53</td>
                       <td style="text-align: right;" v-text="sheetData[52].monthSum==0?'':sheetData[52].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[52].yearSum==0?'':sheetData[52].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[25].formula,sheetData[25].reportUid)">递延所得税资产</el-button>
                            
                        </td>
                        <td style="text-align: center;">26</td>
                        <td style="text-align: right;" v-text="sheetData[25].monthSum==0?'':sheetData[25].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[25].yearSum==0?'':sheetData[25].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[53].formula,sheetData[53].reportUid)">减：库存股</el-button>
                            
                        </td>
                        <td style="text-align: center;">54</td>
                        <td style="text-align: right;" v-text="sheetData[53].monthSum==0?'':sheetData[53].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[53].yearSum==0?'':sheetData[53].yearSum"></td>
                    </tr>
                    <tr>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[26].formula,sheetData[26].reportUid)">其他非流动资产</el-button>
                            
                        </td>
                        <td style="text-align: center;">27</td>
                        <td style="text-align: right;" v-text="sheetData[26].monthSum==0?'':sheetData[26].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[26].yearSum==0?'':sheetData[26].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[54].formula,sheetData[54].reportUid)">盈余公积</el-button>
                            
                        </td>
                        <td style="text-align: center;">55</td>
                        <td style="text-align: right;" v-text="sheetData[54].monthSum==0?'':sheetData[54].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[54].yearSum==0?'':sheetData[54].yearSum"></td>
                    </tr>
                    <tr>
                        <td>非流动资产合计</td>                       
                        <td style="text-align: center;">28</td>
                        <td style="text-align: right;" v-text="sheetData[27].monthSum==0?'':sheetData[27].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[27].yearSum==0?'':sheetData[27].yearSum"></td>
                        <td>
                            <el-button type="text" @click="dialogTable(sheetData[55].formula,sheetData[55].reportUid)">未分配利润</el-button>
                            
                        </td>
                        <td style="text-align: center;">56</td>
                        <td style="text-align: right;" v-text="sheetData[55].monthSum==0?'':sheetData[55].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[55].yearSum==0?'':sheetData[55].yearSum"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style="text-align: center;"></td>
                        <td style="text-align: right;" ></td>
                        <td style="text-align: right;" ></td>
                        <td>所有者权益(或股东权益)合计</td>
                        <td style="text-align: center;">57</td>
                        <td style="text-align: right;" v-text="sheetData[56].monthSum==0?'':sheetData[56].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[56].yearSum==0?'':sheetData[56].yearSum"></td>
                    </tr>
                    <tr>
                        <td> 资产总计</td>
                        <td style="text-align: center;">29</td>
                        <td style="text-align: right;" v-text="sheetData[28].monthSum==0?'':sheetData[28].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[28].yearSum==0?'':sheetData[28].yearSum"></td>
                        <td>负债和所有者权益(或股东权益)总计</td>
                        <td style="text-align: center;">58</td>
                        <td style="text-align: right;" v-text="sheetData[57].monthSum==0?'':sheetData[57].monthSum"></td>
                        <td style="text-align: right;" v-text="sheetData[57].yearSum==0?'':sheetData[57].yearSum"></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="8" style="text-align: right;">
                            1-29 共29条
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <!-- table结束 -->

        <!-- 编辑公式-减，营业成本弹出层 -->
        <el-dialog title="编辑公式:货币资金" :visible.sync="dialogTableVisible" size="small" top="20%" :close-on-click-modal="false">
            <div class="sheet-dialog">
                <el-row>
                    <el-col :span="9" style="position: relative">
                        <span>科目</span>
                        <el-autocomplete size="small" v-model="sub.text" :fetch-suggestions="subjectSearch" placeholder="请输入选择科目" @select="subjectSelect"></el-autocomplete>
                    </el-col>
                    <el-col :span="5">
                        <span class="operator-span">运算符号</span>
                        <el-select v-model="operator" placeholder="+" size="small" class="operator">
                            <el-option v-for="item in operators" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <span class="operator-span">取数规则</span>
                        <el-select v-model="fetchVal" placeholder="余额" size="small" class="fetch">
                            <el-option v-for="item in fetchs" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2">
                        <el-button type="primary" size="small" @click="addSubjectEx()" class="operator-span">添加</el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 编辑的表格 -->
            <el-table :data="dialogData" border height="200" :summary-method="getSummaries" show-summary style="width: 100%; margin-top: 20px">
                <el-table-column prop="subVal" label="科目" header-align="center">
                </el-table-column>
                <el-table-column prop="yf" label="运算方式" header-align="center" align="center" width="100">
                </el-table-column>
                <el-table-column prop="fetch" label="取数规则" header-align="center" align="center" width="100">
                </el-table-column>
                <el-table-column prop="monthSum" label="期末数" align="right" header-align="center">
                </el-table-column>
                <el-table-column prop="yearSum" label="年初数" align="right" header-align="center">
                </el-table-column>
                <el-table-column label="操作" width="120" header-align="center" align="center">
                    <template scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, dialogData)" type="text" size="small">
                            <i class="el-icon-close"></i>
                            <!-- 移除 -->
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 编辑的表格 -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="saveFormula()" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 编辑公式-减，营业成本弹出层 -->
    </div>
</template>
<script>
export default {
    name: 'sheet',
    data() {
        return {
            //会计期间
            periodsList: [],
            //会计期间uid
            periodUid: '',
            //会计年度
            year:'',
            //期间
            period:'',
            //表格数据
            sheetData: [],
            //弹出默认
            dialogTableVisible: false,
            //弹出层对应的公式uid
            reportUid:'',
            //弹出table数据
            dialogData: [],
            //弹出层 科目搜索
            sub : {
                text:'',
                code:''
            },
            //运算符号
            operators: [{
                value: '+',
                label: '+'
            }, {
                value: '-',
                label: '-'
            }],
            operator: '+',
            //取数规则
            fetchs: [{
                value: "'DC'",
                label: '余额'
            }, {
                value: "'DR'",
                label: '借方余额'
            },
            {
                value: "'CR'",
                label: '贷方余额'
            }],
            fetchVal: "'DC'",
        }
    },
    created() {
        this.getSubjectData();//生成科目树并更新科目数据
    },
    mounted() {
        this.getPeriodsCurrencysData();//会计期间数据
        
    },
    methods: {
        //会计期间
        getPeriodsCurrencysData() {
            let Vue = this;
            Vue.AxiosPost('getPeriodsCurrencysList', {
                accbookUid: Vue.$store.state.accbookUid
            }, function(e) {
                if (e.code === '1') {
                    e.data.acctBookInfo.periods.forEach((n, i) => {
                        Vue.periodsList.push({
                            year:n.iyear,//会计期间年
                            period:n.iperiod,//会计期间
                            value: n.aperiodUid,
                            label: n.iyear + '年' + n.iperiod + '期'
                        });
                    });
                    //默认会计期间
                    Vue.periodUid = Vue.periodsList[0].value;
                    Vue.year = Vue.periodsList[0].year;
                    Vue.period=Vue.periodsList[0].period;
                    Vue.getReportForm();
                } else if (e.code === '1006') {
                    Vue.periodsList = [];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //根据选择的会计期间 取出对应的年度与期间,得到不同期间的资产负载表数据
        selectPer(){
            this.periodsList.forEach((n,i)=>{
                if(this.periodUid===n.value){
                    this.period=n.period;
                    this.year=n.year;
                }
            });
            this.getReportForm();      
        },
        //得到资产负债表或利润表信息
        getReportForm() {        
            let Vue = this;
            Vue.AxiosPost('getReportForm', {
                acctBookUid: Vue.$store.state.accbookUid,
                year: Vue.year,
                period: Vue.period,
                reportName: "ZCFZ"
            }, function(e) {
                if (e.code === '1') {
                    Vue.sheetData=[];
                    e.data.reportFormListResult.forEach((n, i) => {
                        Vue.sheetData.push({
                            formula: n.formula,
                            location: n.location,
                            monthSum: n.monthSum,
                            reportUid: n.reportUid,
                            yearSum: n.yearSum
                        })
                    })
                } else if (e.code === '1006') {
                    Vue.sheetData=[];
                } else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //弹出对应的编辑公式层,解析公式,公式uid
        dialogTable(str,reportUid) {
            //弹出框打开
            this.dialogTableVisible = true;
            //公式uid
            this.reportUid=reportUid;
            //处理公式
            if(str!='0'){
                let data = []
                let str1 = str.substr(1);
                let str2 = str1.split(')');
                for (var i = str2.length - 2; i >= 0; i--) {
                    var formulas = {};
                    formulas.location = str2[i].substr(0, 1) + "," + str2[i].split('(')[1].split(',')[0] + "," + str2[i].split('(')[1].split(',')[1];//运算符，科目，取数规则
                    formulas.formula1 = 'YE(\'PE\',' + str2[i].split('(')[1].split(',')[0] + ',' + str2[i].split('(')[1].split(',')[1] + ')';//期末数
                    formulas.formula2 = 'YE(\'YB\',' + str2[i].split('(')[1].split(',')[0] + ',' + str2[i].split('(')[1].split(',')[1] + ')';//年初数
                    data.push(formulas);
                };
                //请求公式计算结果
                let Vue = this;
                Vue.AxiosPost('getFormulaSum', {
                    acctBookUid: Vue.$store.state.accbookUid,
                    year: Vue.year,
                    period: Vue.period,
                    formulas: JSON.stringify(data)
                }, function(e) {
                    if (e.code === '1') {
                        Vue.dialogData=[];
                        e.data.formulaSums.forEach((n, i) => {
                            let loc = n.location.split(',');
                            let data = {
                                monthSum: n.formula1,//期末数
                                yearSum: n.formula2,//年初数
                                sub: loc[1].replace(/'|"/g, ""),//科目编码
                                yf: loc[0].replace(/'|"/g, ""),//运算方式
                                qs: loc[2].replace(/'|"/g, "")//取数规则
                            }
                            //科目变成带文字的科目
                            Vue.$store.state.subjectAllList.forEach((n, i) => { 
                                if (n.code == data.sub) {
                                    data.subVal = n.value;
                                }
                            });
                            //dc,cr,dr变成文字
                            if (data.qs === 'DC') {
                                data.fetch = '余额';
                            } else if (data.qs === 'DR') {
                                data.fetch = '借方余额';
                            } else {
                                data.fetch = '贷方余额';
                            }
                            Vue.dialogData.push(data);
                        })
                    } else {
                        Vue.Message(e.msg, 'error');
                    }
                });
            }
        },

        //科目搜索
        subjectSearch(queryString, callback) {
            let sub = this.$store.state.subjectAllList;
            let results = queryString ? sub.filter(this.subjectFilter(queryString)) : sub;
            callback(results);
        },
        subjectFilter(queryString) {
            return (res) => {
                return (res.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //科目搜索
        //科目选择
        subjectSelect(item) {
            this.sub.code = item.code;
        },
        //科目选择
        // 弹出层自动计算
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总价';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += '';
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        },
        //移除当前行
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        //添加一条规则
        addSubjectEx() {
            let data1 = []
            data1.push({
                location: this.operator + "," +"'"+this.sub.code +"'"+ "," + this.fetchVal,
                formula1: 'YE(\'PE\',' +"'"+this.sub.code +"'"+ ',' + this.fetchVal + ')',
                formula2: 'YE(\'YB\',' +"'"+this.sub.code +"'"+ ',' + this.fetchVal + ')'
            });
            //请求公式计算结果
            let Vue = this;
            Vue.AxiosPost('getFormulaSum', {
                acctBookUid: Vue.$store.state.accbookUid,
                year: Vue.year,
                period: Vue.period,
                formulas: JSON.stringify(data1)
            }, function(e) {
                if (e.code === '1') {
                    //重置添加数据
                    Vue.sub.text='';
                    Vue.operator="+";
                    Vue.fetchVal="'DC'";
                    e.data.formulaSums.forEach((n, i) => {
                        let loc = n.location.split(',');
                        let data = {
                            monthSum: n.formula1,//期末数
                            yearSum: n.formula2,//年初数
                            sub: loc[1].replace(/'|"/g, ""),//科目编码
                            yf: loc[0].replace(/'|"/g, ""),//运算方式
                            qs: loc[2].replace(/'|"/g, "")//取数规则
                        }
                        //科目变成带文字的科目
                        Vue.$store.state.subjectAllList.forEach((n, i) => {
                            if (n.code == data.sub) {
                                data.subVal = n.value;
                            }
                        });
                        //dc,cr,dr变成文字
                        if (data.qs === 'DC') {
                            data.fetch = '余额';
                        } else if (data.qs === 'DR') {
                            data.fetch = '借方余额';
                        } else {
                            data.fetch = '贷方余额';
                        }
                        Vue.dialogData.push(data);
                    })
                }else {
                    Vue.Message(e.msg, 'error');
                }
            });
        },
        //保存公式
        saveFormula(){
            this.dialogTableVisible = false;
            console.log(this.dialogData);
            let Formula="0";
            this.dialogData.forEach((n,i)=>{
                Formula+=n.yf+'YE'+'('+'"'+n.sub+'"'+','+'"'+n.qs+'"'+')';
            })
            console.log(Formula);
            let Vue = this;
            Vue.AxiosPost('setReportFormula', {
                reportUid: Vue.reportUid,
                formula:Formula
            }, function(e) {
                if (e.code === '1') {
                    Vue.getReportForm();
                   Vue.Message(e.msg, 'success'); 
                }                  
                 else {
                    Vue.Message(e.msg, 'error');
                }
            });
                 
        }
    }
}
</script>
<style lang='scss'>
#balance_sheet {
    .el-row {
        line-height: 36px;
        margin-bottom: 15px;
        .vl-top-left {
            float: left;
            .vl-span {
                float: left;
                margin-right: 10px;
            }
        }
        .vl-top-right {
            float: right;
        }
    }
    .sheet-table {
        background-color: #fff;
        color: #555;
        font-family: tahoma, arial, 宋体;
        font-size: 12px;
        border-collapse: collapse;
        /*相邻边被合并;separate: 边框独立*/
        border: none;
        width: 100%;
        /* td 内容太多，想自动换行 */
        table-layout: fixed;
        tbody tr {
            &:nth-child(odd) {
                background-color: #fff;
            }
            &:nth-child(even) {
                background-color: #f8f8f8;
            }
            &:hover {
                background-color: rgb(254, 238, 150);
            }
        }
        thead {
            background-color: #eee;
            tr td {
                font-weight: bold;
                text-align: center;
            }
        }
        td {
            font-weight: 400;
            overflow: hidden;
            white-space: pre;
            height: 34px;
            padding: 0 5px;
            border: solid #CCC 1px;
            /* td 内容太多，想自动换行 */
            word-wrap: break-word;
            button span {
                color: #555;
                cursor: pointer;
                outline: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
    .el-dialog--small {
        width: 800px;
    }
    .sheet-dialog {
        padding: 10px 5px 20px 5px;
        .operator-box {
            padding-left: 5px;
            padding-right: 5px;
        }
        .operator {
            width: 70px;
            height: 30px;
        }
        .fetch {
            width: 140px;
            height: 30px;
        }
    }
}
</style>