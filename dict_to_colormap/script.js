function isDigit(char) {
    return !isNaN(parseInt(char));
}

function convert() {
    let input = document.getElementById("dict").value;
    let rgb_list = [];
    let names_list = [];
    let type = "";
    let num = "";
    let rgb = [];
    let name = "";

    for (let i = 0; i < input.length; i++) {
        if (type == "nums") {
            // save all rgb values
            if (isDigit(input[i])) {
                num += input[i];
            } 
            if (num.length > 0 && i + 1 < input.length && !isDigit(input[i + 1])) {
                rgb.push(parseInt(num));
                num = "";
                if (rgb.length == 3) {
                    rgb_list.push(rgb);
                    rgb = [];
                }
            }
        } else if (type == "names") {
            // save all commented names
            name += input[i];
            if (i + 1 < input.length && (input[i + 1] == "(" || input[i + 1] == "}")) {
                names_list.push(name.trim());
                name = "";
                type = "";
            }
        }

        // set type of input
        if (input[i] == "(") {
            type = "nums";
        }
        else if (input[i] == ")") {
            type = "";
        } else if (input[i] == "#") {
            type = "names";
        }
    }

    output = "COLORMAP = np.array(\n\t[";
    for (let i = 0; i < rgb_list.length; i++) {
        output += "\n\t\t";
        output += "[" + rgb_list[i].join(', ') + "],";
        if (names_list.length > 0) {
            output += " # ";
            output += names_list[i]
        }
    }
    output += "\n\t]\n)"

    document.getElementById("colmap").value = output;
    console.log(names_list);
    console.log(rgb_list);
}