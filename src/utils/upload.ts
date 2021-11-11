function camelize(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '')  ;
  }

export function Upload(updatefile, updateTableName) {
    var fileUpload: HTMLFormElement = document.getElementById("fileUpload") as HTMLFormElement;
    const tableName = fileUpload.files[0].name
    const cleanName = camelize(tableName)
    updateTableName(cleanName)
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = document.createElement("table");
                // @ts-ignore
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) {
                    var cells = rows[i].split(",");
                    if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                        }
                    }
                }
                updatefile(e.target.result);
                var dvCSV = document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.appendChild(table);
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
          alert("This browser does not support HTML5.");
}
} else {
alert("Please upload a valid CSV file.");
}
}