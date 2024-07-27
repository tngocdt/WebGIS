function showResult(str) {
    if(str.length==0) {
        document.getElementById("livesearch").innerHTML = "";
        document.getElementById("livesearch").style.border ="0px";
        return;
    }

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
        if(this.readyState==4 && this.status ==200) {
            document.getElementById("livesearch").innerHTML = this.responseText;
            document.getElementById("livesearch").style.border ="1px solid #A5ACB2";
        }
    }
    // Trong câu lệnh     xmlhttp.open("GET", "live_search.php?....="+str,true);
    // Trong phần "..." ta thêm vào tên thuộc tính mình muốn tìm kiếm
    xmlhttp.open("GET", "live_search.php?tenhc="+str,true);
    xmlhttp.send();
}