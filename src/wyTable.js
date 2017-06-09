/**
 * Created by wangyang on 2017/5/19.
 */

$(function(){
    $.fn.wyTable = function(option) {

        var fillStyle = (style)=>{
            if(style!==undefined && style!==""){
                return `style='${style}'`;
            }else{
                return "";
            }
        }

        var fillData = (fun,data)=>{
            if(typeof (fun)==="function"){
                return fun(data);
            }else{
                return data;
            }
        }

        var buildThead = ()=>{
            var columns = option.columns || [];
            var html = `<thead><tr>[th]</tr></thead>`;
            var result = "";
            columns.forEach((col)=>{
                var style = col.style || "";
                var content = col.name || "";
                var item = (`<th [style]>[content]</th>`)
                    .replace("[style]",fillStyle(style))
                    .replace("[content]",content);
                result += item;
            });
            return html.replace("[th]",result);
        }

        var buildTbody = ()=>{

            var json = option.json || [];
            var columns = option.columns || [];
            var html = `<tbody>[tr]</tbody>`;
            var result = "";
            json.forEach((row)=>{
                var tr = `<tr>[td]</tr>`;
                var td = ""
                columns.forEach((col)=>{
                    var style = col.style || "";
                    var content = col.name || "";
                    var item = (`<td [style]>[content]</td>`)
                        .replace("[style]",fillStyle(style))
                        .replace("[content]", fillData(col.format,row[col["id"]]));
                    td += item;
                });
                result+=tr.replace("[td]",td);
            });
            return html.replace("[tr]",result);
        }

        var thead = buildThead();
        var tbody = buildTbody();

        //在这里面,this指的是用jQuery选中的元素
        //example :$('a'),则this=$('a')
        //this.css('color', 'red');
        this.empty();
        this.append(thead+tbody);
    };
});