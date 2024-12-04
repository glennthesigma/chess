var is_Wturn = true; //black's turn if not is_Wturn
var W_can_OO = true;
var W_can_OOO = true;
var B_can_OO = true;
var B_can_OOO = true;
var deltamaterial = 0; //deltamaterial > 0, white has more material and vice versa
var W_pot_pro = []; //white has potential promotion(s)
var B_pot_pro = []; //black has potential promotion(s)
var W_pot_ep = -1; //white has potential en passant(s)
var B_pot_ep = -1; //white has potential en passant(s)

//preparing the board
document.getElementById(`gamestatus`).textContent = `White's turn`;
let pos = 0;
for (let node of document.querySelectorAll(`td`)) {
    if (!Boolean(node.id)) {
        node.id = `X` + String(pos);

        if (pos == 0 || pos == 7) {
            node.className = `B_R`; //Black Rook
        }
    
        else if (pos == 1 || pos == 6) {
            node.className = `B_N`; //Black kNight
        }

        else if (pos == 2 || pos == 5) {
            node.className = `B_B`; //Black Bishop
        }

        else if (pos == 3) {
            node.className = `B_Q`; //Black Queen
        }

        else if (pos == 4) {
            node.className = `B_K`; //Black King
        }

        else if (pos >= 8 && pos <= 15) {
            node.className = `B_P`; //Black Pawn
        }

        else if (pos >= 48 && pos <= 55) {
            node.className = `W_P`; //White Pawn
        }

        else if (pos == 56 || pos == 63) {
            node.className = `W_R`; //White Rook
        }
    
        else if (pos == 57 || pos == 62) {
            node.className = `W_N`; //White kNight
        }

        else if (pos == 58 || pos == 61) {
            node.className = `W_B`; //White Bishop
        }

        else if (pos == 59) {
            node.className = `W_Q`; //White Queen
        }

        else if (pos == 60) {
            node.className = `W_K`; //White King
        }

        else {
            node.className = `empty`;
        }

        pos ++;
    }
        

    node.onclick = function() {
        if (node.className == `W_R` || node.className == `W_N` || node.className == `W_B` || node.className == `W_Q` || node.className == `W_P` || node.className == `W_K`) {
            white_move(node);
        }
    }
}

updatecursor()

//RESET BOARD
const resetbutton = document.getElementById(`reset`);

resetbutton.onmouseenter = resetbutton.style.cursor = "pointer";

resetbutton.onclick = function() {
    is_Wturn = true; 
    W_can_OO = true;
    W_can_OOO = true;
    B_can_OO = true;
    B_can_OOO = true;
    deltamaterial = 0; 
    W_pot_pro = []; 
    B_pot_pro = []; 
    W_pot_ep = -1; 
    B_pot_ep = -1; 

    document.getElementById(`gamestatus`).textContent = `White's turn`;
    updatedeltamaterial();

    const piece_arr = [`W_P`, `W_N`, `W_B`, `W_R`, `W_Q`, `B_P`, `B_N`, `B_B`, `B_R`, `B_Q`]

    for (let piece of piece_arr) {
        document.getElementById(piece + `count`).textContent = `0`
    }

    for (let pos = 0; pos < 64; pos++) {
        let node = document.getElementById(`X` + String(pos));
        node.className = ``;
            
        if (pos == 0 || pos == 7) {
            node.className = `B_R`; //Black Rook
        }
    
        else if (pos == 1 || pos == 6) {
             node.className = `B_N`; //Black kNight
        }

        else if (pos == 2 || pos == 5) {
            node.className = `B_B`; //Black Bishop
        }

        else if (pos == 3) {
            node.className = `B_Q`; //Black Queen
        }

        else if (pos == 4) {
            node.className = `B_K`; //Black King
        }

        else if (pos >= 8 && pos <= 15) {
            node.className = `B_P`; //Black Pawn
        }

        else if (pos >= 48 && pos <= 55) {
            node.className = `W_P`; //White Pawn
        }

        else if (pos == 56 || pos == 63) {
            node.className = `W_R`; //White Rook
        }
        
        else if (pos == 57 || pos == 62) {
            node.className = `W_N`; //White kNight
        }

        else if (pos == 58 || pos == 61) {
            node.className = `W_B`; //White Bishop
        }

        else if (pos == 59) {
            node.className = `W_Q`; //White Queen
        }

        else if (pos == 60) {
            node.className = `W_K`; //White King
        }

        else {
            node.className = `empty`;
        }
    }
}

//UPDATE CURSOR
function updatecursor() {
    for (let pos = 0; pos < 64; pos++) {
        if (document.getElementById(`X` + String(pos)).className != `empty` || document.getElementById(`X` + String(pos)).classList.contains(`pos_playable`)) {
            document.getElementById(`X` + String(pos)).style.cursor = "pointer";
        }
        else {
            document.getElementById(`X` + String(pos)).style.cursor = "initial";
        }
    }
}

//TRACK CAPTURED PIECES
function updatedeltamaterial() {
    const whitematerial = document.getElementById(`whiteadvantage`);
    const blackmaterial = document.getElementById(`blackadvantage`);

    if (deltamaterial == 0) {
        whitematerial.textContent = ``;
        blackmaterial.textContent = ``;
    }
    else if (deltamaterial > 0) {
        whitematerial.textContent = `+${String(deltamaterial)}`;
        blackmaterial.textContent = ``;
    }
    else {
        whitematerial.textContent = ``;
        blackmaterial.textContent = `+${String(Math.abs(deltamaterial))}`;
    }
}

function piece_to_value(piece) {
    if (piece[2] == `P`) {
        return 1
    }
    if (piece[2] == `N`) {
        return 3
    }
    if (piece[2] == `B`) {
        return 3
    }
    if (piece[2] == `R`) {
        return 5
    }
    if (piece[2] == `Q`) {
        return 8
    }
}

function add_captured(piece) {
    const countbox = document.getElementById(`${piece}count`);
    countbox.textContent = String(Number(countbox.textContent) + 1);

    if (piece[0] == `W`) {
        deltamaterial += piece_to_value(piece);
    }
    else {
        deltamaterial -= piece_to_value(piece);
    }

    updatedeltamaterial()
}

//WHITE

//WHITE PAWN
function WP_moves_list(position) { //White Pawn (returns list of possible moves based on position)
    let return_list = [];

    if (position < 8) {
        return return_list;
    }

    if (position >= 8) {
        if (position >= 9) {
            const left_diag = document.getElementById(`X` + String(position - 9)).className;

            if (position % 8 != 0 && (
                (left_diag == `B_R` || left_diag == `B_N` || left_diag == `B_B` || left_diag == `B_Q` || left_diag == `B_P` || left_diag == `B_K`) ||
                (position >= 24 && position <= 31 && position - 9 == W_pot_ep && left_diag == `empty`))) {

                if (position - 9 < 8) {
                    W_pot_pro.push(position - 9);
                }
                
                return_list.push(position - 9);
            }
        }
        const right_diag = document.getElementById(`X` + String(position - 7)).className;

        if (position % 8 != 7 && (
            (right_diag == `B_R` || right_diag == `B_N` || right_diag == `B_B` || right_diag == `B_Q` || right_diag == `B_P` || right_diag == `B_K`) ||
            (position >= 24 && position <= 31 && position - 7 == W_pot_ep && right_diag == `empty`))) {

            if (position - 7 < 8) {
                W_pot_pro.push(position - 7);
            }
            return_list.push(position - 7);
        }
    }

    const up1 = document.getElementById(`X` + String(position - 8)).className;

    if (up1 == `empty`) {
        if (position - 8 < 8) {
            W_pot_pro.push(position - 8);
        }
        return_list.push(position - 8);

        if (position >= 48 && position <= 55) {
            const up2 = document.getElementById(`X` + String(position - 16)).className;
        
            if (up2 == `empty`) {
                return_list.push(position - 16);
            }
        }
    }
    return return_list
}

function pseudoWP_moves_list(position, pseudo_list) { //White Pawn (returns list of possible moves based on position)
    let return_list = [];

    if (position < 8) {
        return return_list;
    }

    if (position >= 8) {
        if (position >= 9) {
            const left_diag = pseudo_list[position - 9];

            if (position % 8 != 0 && (
                (left_diag == `B_R` || left_diag == `B_N` || left_diag == `B_B` || left_diag == `B_Q` || left_diag == `B_P` || left_diag == `B_K`) ||
                (position >= 24 && position <= 31 && position - 9 == W_pot_ep && left_diag == `empty`))) {

                if (position - 9 < 8) {
                    W_pot_pro.push(position - 9);
                }
                
                return_list.push(position - 9);
            }
        }
        const right_diag = pseudo_list[position - 7];

        if (position % 8 != 7 && (
            (right_diag == `B_R` || right_diag == `B_N` || right_diag == `B_B` || right_diag == `B_Q` || right_diag == `B_P` || right_diag == `B_K`) ||
            (position >= 24 && position <= 31 && position - 7 == W_pot_ep && right_diag == `empty`))) {

            if (position - 7 < 8) {
                W_pot_pro.push(position - 7);
            }
            return_list.push(position - 7);
        }
    }

    const up1 = pseudo_list[position - 8];

    if (up1 == `empty`) {
        if (position - 8 < 8) {
            W_pot_pro.push(position - 8);
        }
        return_list.push(position - 8);

        if (position >= 48 && position <= 55) {
            const up2 = pseudo_list[position - 16];
        
            if (up2 == `empty`) {
                return_list.push(position - 16);
            }
        }
    }
    return return_list
}

//WHITE ROOK
function WR_moves_list(position) { //White Rook
    let hori_list = [];
    let vert_list = [];
    let end = false;

    for (pos = position - position % 8; pos < 8 + position - position % 8; pos++) {
        if (pos != position) {
            let hori = document.getElementById(`X` + String(pos)).className;
            if (hori == `W_R` || hori == `W_N` || hori == `W_B` || hori == `W_Q` || hori == `W_P` || hori == `W_K`) {
                if (end) {
                    break;
                } else {
                    hori_list = [];
                }
                
            } else if (hori == `B_R` || hori == `B_N` || hori == `B_B` || hori == `B_Q` || hori == `B_P` || hori == `B_K`) {
                if (end) {
                    hori_list.push(pos);
                    break;
                } else {
                    hori_list = [pos];
                }
            } else if (hori == `empty`) {
                hori_list.push(pos)
            }

        } else {
            end = true;
        }
    }

    end = false;
    for (pos = position % 8; pos < 64; pos += 8) {
        if (pos != position) {
            let vert = document.getElementById(`X` + String(pos)).className;
            if (vert == `W_R` || vert == `W_N` || vert == `W_B` || vert == `W_Q` || vert == `W_P` || vert == `W_K`) {
                if (end) {
                    break;
                } else {
                    vert_list = [];
                }
                
            } else if (vert == `B_R` || vert == `B_N` || vert == `B_B` || vert == `B_Q` || vert == `B_P` || vert == `B_K`) {
                if (end) {
                    vert_list.push(pos);
                    break;
                } else {
                    vert_list = [pos];
                }
            } else if (vert == `empty`) {
                vert_list.push(pos)
            }

        } else {
            end = true;
        }
    }
    return hori_list.concat(vert_list)
}

function pseudoWR_moves_list(position, pseudo_list) { //White Rook
    let hori_list = [];
    let vert_list = [];
    let end = false;

    for (pos = position - position % 8; pos < 8 + position - position % 8; pos++) {
        if (pos != position) {
            let hori = pseudo_list[pos];
            if (hori == `W_R` || hori == `W_N` || hori == `W_B` || hori == `W_Q` || hori == `W_P` || hori == `W_K`) {
                if (end) {
                    break;
                } else {
                    hori_list = [];
                }
                
            } else if (hori == `B_R` || hori == `B_N` || hori == `B_B` || hori == `B_Q` || hori == `B_P` || hori == `B_K`) {
                if (end) {
                    hori_list.push(pos);
                    break;
                } else {
                    hori_list = [pos];
                }
            } else if (hori == `empty`) {
                hori_list.push(pos)
            }

        } else {
            end = true;
        }
    }

    end = false;
    for (pos = position % 8; pos < 64; pos += 8) {
        if (pos != position) {
            let vert = pseudo_list[pos];
            if (vert == `W_R` || vert == `W_N` || vert == `W_B` || vert == `W_Q` || vert == `W_P` || vert == `W_K`) {
                if (end) {
                    break;
                } else {
                    vert_list = [];
                }
                
            } else if (vert == `B_R` || vert == `B_N` || vert == `B_B` || vert == `B_Q` || vert == `B_P` || vert == `B_K`) {
                if (end) {
                    vert_list.push(pos);
                    break;
                } else {
                    vert_list = [pos];
                }
            } else if (vert == `empty`) {
                vert_list.push(pos)
            }

        } else {
            end = true;
        }
    }
    return hori_list.concat(vert_list)
}

//WHITE BISHOP
function WB_moves_list(position) { //White Bishop
    let pos_list = [];
    let neg_list = [];
    let end = false;

    if (position % 7 == 0) {
        for (pos = 7; pos <= 56; pos += 7) {
            if (pos != position) {
                let positive = document.getElementById(`X` + String(pos)).className;
            
                if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }
        }

    } else if (position % 8 + Math.floor(position / 8) < 7) {
        for (pos = position % 8 + Math.floor(position / 8); pos < 64; pos += 7) {
            if (pos != position) {
                let positive = document.getElementById(`X` + String(pos)).className;
            
                if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }

            if (pos % 8 == 0) {
                break;
            }
        }
    } else {
        for (pos = position - 7 * (7 - position % 8); pos < 64; pos += 7) {
            if (pos != position) {
                let positive = document.getElementById(`X` + String(pos)).className;
            
                if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }
        }
    }

    end = false;

    if (position % 9 == 0) {
        for (pos = 9; pos <= 63; pos += 9) {
            if (pos != position) {
                let negative = document.getElementById(`X` + String(pos)).className;
            
                if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }
        }

    } else if (position % 8 - Math.floor(position / 8) > 0) {
        for (pos = position % 8 - Math.floor(position / 8); pos < 64; pos += 9) {
            if (pos != position) {
                let negative = document.getElementById(`X` + String(pos)).className;
            
                if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }

            if (pos % 8 == 7) {
                break;
            }
        }
    } else {
        for (pos = position - 9 * (position % 8); pos < 64; pos += 9) {
            if (pos != position) {
                let negative = document.getElementById(`X` + String(pos)).className;
            
                if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }
        }
    }
    return pos_list.concat(neg_list)
}

function pseudoWB_moves_list(position, pseudo_list) { //White Bishop
    let pos_list = [];
    let neg_list = [];
    let end = false;

    if (position % 7 == 0) {
        for (pos = 7; pos <= 56; pos += 7) {
            if (pos != position) {
                let positive = pseudo_list[pos];
            
                if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }
        }

    } else if (position % 8 + Math.floor(position / 8) < 7) {
        for (pos = position % 8 + Math.floor(position / 8); pos < 64; pos += 7) {
            if (pos != position) {
                let positive = pseudo_list[pos];
            
                if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }

            if (pos % 8 == 0) {
                break;
            }
        }
    } else {
        for (pos = position - 7 * (7 - position % 8); pos < 64; pos += 7) {
            if (pos != position) {
                let positive = pseudo_list[pos];
            
                if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }
        }
    }

    end = false;

    if (position % 9 == 0) {
        for (pos = 9; pos <= 63; pos += 9) {
            if (pos != position) {
                let negative = pseudo_list[pos];
            
                if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }
        }

    } else if (position % 8 - Math.floor(position / 8) > 0) {
        for (pos = position % 8 - Math.floor(position / 8); pos < 64; pos += 9) {
            if (pos != position) {
                let negative = pseudo_list[pos];
            
                if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }

            if (pos % 8 == 7) {
                break;
            }
        }
    } else {
        for (pos = position - 9 * (position % 8); pos < 64; pos += 9) {
            if (pos != position) {
                let negative = pseudo_list[pos];
            
                if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }
        }
    }
    return pos_list.concat(neg_list)
}

//WHITE QUEEN
function WQ_moves_list(position) { //White Queen
    return WR_moves_list(position).concat(WB_moves_list(position))
}

function pseudoWQ_moves_list(position, pseudo_list) { //White Queen
    return pseudoWR_moves_list(position, pseudo_list).concat(pseudoWB_moves_list(position, pseudo_list))
}

//WHITE KNIGHT
function WN_moves_list(position) { //White kNight
    let result_list = [];
    const xpos = position % 8;
    const ypos = Math.floor(position / 8);
    let pos;

    if (xpos >= 2) {
        if (ypos != 0) {
            pos = document.getElementById(`X` + String(position - 10)).className;
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position - 10);
            }
        }
        
        if (ypos != 7) {
            pos = document.getElementById(`X` + String(position + 6)).className;
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position + 6);
            }
        }
    }

    if (xpos <= 5) {
        if (ypos != 0) {
            pos = document.getElementById(`X` + String(position - 6)).className;
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position - 6);
            }
        }
        
        if (ypos != 7) {
            pos = document.getElementById(`X` + String(position + 10)).className;
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position + 10);
            }
        }
    }

    if (ypos >= 2) {
        if (xpos != 0) {
            pos = document.getElementById(`X` + String(position - 17)).className;
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position - 17);
            }
        }
        
        if (xpos != 7) {
            pos = document.getElementById(`X` + String(position - 15)).className;
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position - 15);
            }
        }
    }

    if (ypos <= 5) {
        if (xpos != 0) {
            pos = document.getElementById(`X` + String(position + 15)).className;
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position + 15);
            }
        }
        
        if (xpos != 7) {
            pos = document.getElementById(`X` + String(position + 17)).className;
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position + 17);
            }
        }
    }
    return result_list
}

function pseudoWN_moves_list(position, pseudo_list) { //White kNight
    let result_list = [];
    const xpos = position % 8;
    const ypos = Math.floor(position / 8);
    let pos;

    if (xpos >= 2) {
        if (ypos != 0) {
            pos = pseudo_list[position - 10];
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position - 10);
            }
        }
        
        if (ypos != 7) {
            pos = pseudo_list[position + 6];
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position + 6);
            }
        }
    }

    if (xpos <= 5) {
        if (ypos != 0) {
            pos = pseudo_list[position - 6];
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position - 6);
            }
        }
        
        if (ypos != 7) {
            pos = pseudo_list[position + 10];
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position + 10);
            }
        }
    }

    if (ypos >= 2) {
        if (xpos != 0) {
            pos = pseudo_list[position - 17];
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position - 17);
            }
        }
        
        if (xpos != 7) {
            pos = pseudo_list[position - 15];
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position - 15);
            }
        }
    }

    if (ypos <= 5) {
        if (xpos != 0) {
            pos = pseudo_list[position + 15];
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position + 15);
            }
        }
        
        if (xpos != 7) {
            pos = pseudo_list[position + 17];
            if (pos != `W_R` && pos != `W_N` && pos != `W_B` && pos != `W_Q` && pos != `W_P` && pos != `W_K`) {
                result_list.push(position + 17);
            }
        }
    }
    return result_list
}

//WHITE KING
function WK_moves_list(position) { //White King
    let result_list = [];
    let movelist = [position - 8, position + 8];

    if (position % 8 != 0) {
        movelist.push(position - 9)
        movelist.push(position - 1)
        movelist.push(position + 7)
    }

    if (position % 8 != 7) {
        movelist.push(position - 7)
        movelist.push(position + 1)
        movelist.push(position + 9)
    }

    for (pos of movelist) {
        if (pos < 64 && pos >= 0) {
            let piece = document.getElementById(`X` + String(pos)).className;
            if (piece != `W_R` && piece != `W_N` && piece != `W_B` && piece != `W_Q` && piece != `W_P`) {
                result_list.push(pos);
            }
        }

    }
    if (position == 60) {
        if (W_can_OO && document.getElementById(`X61`).className == `empty` && document.getElementById(`X62`).className == `empty` && !is_Wcheck(`W_K`, 60, 61)) {
            result_list.push(62)
        }
    
        if (W_can_OOO && document.getElementById(`X59`).className == `empty` && document.getElementById(`X58`).className == `empty` && document.getElementById(`X57`).className == `empty` && !is_Wcheck(`W_K`, 60, 59)) {
            result_list.push(58)
        }
    }
    return result_list
}

function pseudoWK_moves_list(position, pseudo_list) { //White King
    let result_list = [];
    let movelist = [position - 8, position + 8];

    if (position % 8 != 0) {
        movelist.push(position - 9)
        movelist.push(position - 1)
        movelist.push(position + 7)
    }

    if (position % 8 != 7) {
        movelist.push(position - 7)
        movelist.push(position + 1)
        movelist.push(position + 9)
    }

    for (pos of movelist) {
        if (pos < 64 && pos >= 0) {
            let piece = pseudo_list[pos];
            if (piece != `W_R` && piece != `W_N` && piece != `W_B` && piece != `W_Q` && piece != `W_P`) {
                result_list.push(pos);
            }
        }

    }
    if (position == 60) {
        if (W_can_OO && pseudo_list[61] == `empty` && pseudo_list[62] == `empty` && !is_Wcheck(`W_K`, 60, 61)) {
            result_list.push(62)
        }
    
        if (W_can_OOO && pseudo_list[59] == `empty` && pseudo_list[58] == `empty` && pseudo_list[57] == `empty` && !is_Wcheck(`W_K`, 60, 59)) {
            result_list.push(58)
        }
    }
    return result_list
}


//
function white_move(node) {
    if (is_Wturn) {
        let playable_list = []; //list of id representing integer index
        let promotion = false;

        if (node.className == `W_P`) {
            playable_list = WP_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `W_R`) {
            playable_list = WR_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `W_B`) {
            playable_list = WB_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `W_Q`) {
            playable_list = WQ_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `W_N`) {
            playable_list = WN_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `W_K`) {
            playable_list = WK_moves_list(Number(node.id.slice(1)));
        }

        for (let pos of playable_list) {
            if (!is_Wcheck(node.className, Number(node.id.slice(1)), pos)) {
                document.getElementById(`X` + String(pos)).classList.add(`pos_playable`);
            }
        }

        updatecursor()

        for (let temp of document.querySelectorAll(`td`)) {
            temp.onclick = function() {
                if (temp.className == `W_R` || temp.className == `W_N` || temp.className == `W_B` || temp.className == `W_Q` || temp.className == `W_P` || temp.className == `W_K`) {
                    for (let pos of playable_list) {
                        document.getElementById(`X` + String(pos)).classList.remove(`pos_playable`);
                    }

                    white_move(temp);
                }
                else if (!temp.className.includes(`pos_playable`)) {
                    for (let pos of playable_list) {
                        document.getElementById(`X` + String(pos)).classList.remove(`pos_playable`);
                    }
                    
                    if (temp.className != `empty`) {
                        black_move(temp); 
                    }
                }
                else {
                    for (let pos of playable_list) {
                        document.getElementById(`X` + String(pos)).classList.remove(`pos_playable`);
                    }

                    //double advance pawn = trigger en passant
                    if (node.className == `W_P` && Number(temp.id.slice(1)) == Number(node.id.slice(1)) - 16) {
                        B_pot_ep = Number(temp.id.slice(1)) + 8;
                    }
                    else {
                        B_pot_ep = -1;
                    }

                    //en passant capture
                    if (node.className == `W_P` && Number(temp.id.slice(1)) == W_pot_ep) {
                        document.getElementById(`X` + String(Number(temp.id.slice(1)) + 8)).className = `empty`;
                        add_captured(`B_P`);
                    }

                    if (temp.className == `B_R` || temp.className == `B_N` || temp.className == `B_B` || temp.className == `B_Q` || temp.className == `B_P`) {
                        add_captured(temp.className);
                    }

                    if (node.className ==  `W_R`) {
                        if (node.id == `X56`) {
                            W_can_OOO = false;
                        }
                        else if (node.id == `X63`) {
                            W_can_OO = false;
                        }
                    }

                    if (node.className ==  `W_K`) {
                        if (temp.id == `X62` && W_can_OO) {
                            document.getElementById(`X63`).className = `empty`;
                            document.getElementById(`X61`).className = `W_R`;
                        }
                        else if (temp.id == `X58` && W_can_OOO && !is_Wcheck(`W_K`, 60, 59)) {
                            document.getElementById(`X56`).className = `empty`;
                            document.getElementById(`X59`).className = `W_R`;
                        }
                        W_can_OO = false;
                        W_can_OOO = false;
                    }

                    if (W_pot_pro.includes(Number(temp.id.slice(1)))) {
                        function removenodes() {
                            knight_button.className = ``
                            bishop_button.className = ``
                            rook_button.className = ``
                            queen_button.className = ``
                        }

                        promotion = true;
                        temp.className = node.className
                        W_pot_pro = [];
                        document.getElementById(`gamestatus`).textContent = `Select piece for\npawn to promote to`

                        const knight_button = document.getElementById(`Npromote`)
                        const bishop_button = document.getElementById(`Bpromote`)
                        const rook_button = document.getElementById(`Rpromote`)
                        const queen_button = document.getElementById(`Qpromote`)

                        knight_button.className = `W_Ndisplay`;
                        bishop_button.className = `W_Bdisplay`;
                        rook_button.className = `W_Rdisplay`;
                        queen_button.className = `W_Qdisplay`;
                        
                        knight_button.onclick = function() {
                            if (is_Wturn) {
                                temp.className = `W_N`;
                                deltamaterial -= piece_to_value(`W_N`) - 1;
                                updatedeltamaterial();
                                removenodes();
                                document.getElementById(`gamestatus`).textContent = `Black's turn`;
                                is_Wturn = false
                            }
                        }
                        bishop_button.onclick = function() {
                            if (is_Wturn) {
                                temp.className = `W_B`;
                                deltamaterial -= piece_to_value(`W_B`) - 1;
                                updatedeltamaterial();
                                removenodes();
                                document.getElementById(`gamestatus`).textContent = `Black's turn`;
                                is_Wturn = false;
                            }
                        }
                        rook_button.onclick = function() {
                            if (is_Wturn) {
                                temp.className = `W_R`;
                                deltamaterial -= piece_to_value(`W_R`) - 1;
                                updatedeltamaterial();
                                removenodes();
                                document.getElementById(`gamestatus`).textContent = `Black's turn`;
                                is_Wturn = false;
                            }
                        }
                        queen_button.onclick = function() {
                            if (is_Wturn) {
                                temp.className = `W_Q`;
                                deltamaterial -= piece_to_value(`W_Q`) - 1;
                                updatedeltamaterial();
                                removenodes();
                                document.getElementById(`gamestatus`).textContent = `Black's turn`;
                                is_Wturn = false;
                            }
                        }
                    }
                    else {
                        temp.className = node.className;
                        is_Wturn = false;
                    }

                    node.className = `empty`;
                    if (is_Bcheckmate()) {
                        if (is_Bcheck()) {
                            document.getElementById(`gamestatus`).textContent = `White won by Checkmate!`;
                        }
                        else {
                            document.getElementById(`gamestatus`).textContent = `Game is drawn due to\nStalemate!`;
                        }
                    }
                    else if(!promotion) {
                        document.getElementById(`gamestatus`).textContent = `Black's turn`;
                    }
                    updatecursor()
                }   
            }
        }
    }
}



//BLACK

//BLACK PAWN
function BP_moves_list(position) { //returns list of possible moves based on position of black pawn
    let return_list = [];

    if (position > 55) {
        return return_list;
    }

    if (position <= 55) {
        if (position <= 54) {
            const right_diag = document.getElementById(`X` + String(position + 9)).className;

            if (position % 8 != 7 && (
                (right_diag == `W_R` || right_diag == `W_N` || right_diag == `W_B` || right_diag == `W_Q` || right_diag == `W_P` || right_diag == `W_K`) ||
                (position >= 32 && position <= 39 && position + 9 == B_pot_ep && right_diag == `empty`))) {

                if (position + 9 > 55) {
                    B_pot_pro.push(position + 9);
                }
                return_list.push(position + 9);
            }
        }
        const left_diag = document.getElementById(`X` + String(position + 7)).className;

        if (position % 8 != 0 && (
            (left_diag == `W_R` || left_diag == `W_N` || left_diag == `W_B` || left_diag == `W_Q` || left_diag == `W_P` || left_diag == `W_K`) ||
            (position >= 32 && position <= 39 && position + 7 == B_pot_ep && left_diag == `empty`))) {

            if (position + 7 > 55) {
                B_pot_pro.push(position + 7);
        }
            return_list.push(position + 7);
        }
    }

    const down1 = document.getElementById(`X` + String(position + 8)).className;

    if (down1 == `empty`) {
        if (position + 8 > 55) {
            B_pot_pro.push(position + 8);
        }
        return_list.push(position + 8);

        if (position >= 8 && position <= 15) {
            const down2 = document.getElementById(`X` + String(position + 16)).className;
        
            if (down2 == `empty`) {
                return_list.push(position + 16);
            }
        }
    }
    return return_list
}

function pseudoBP_moves_list(position, pseudo_list) { //returns list of possible moves based on position of black pawn
    let return_list = [];

    if (position > 55) {
        return return_list;
    }

    if (position <= 55) {
        if (position <= 54) {
            const right_diag = pseudo_list[position + 9];

            if (position % 8 != 7 && (right_diag == `W_R` || right_diag == `W_N` || right_diag == `W_B` || right_diag == `W_Q` || right_diag == `W_P` || right_diag == `W_K`)) {
                if (position + 9 > 55) {
                    B_pot_pro.push(position + 9);
                }
                return_list.push(position + 9);
            }
        }
        const left_diag = pseudo_list[position + 7];

            if (position % 8 != 0 && (left_diag == `W_R` || left_diag == `W_N` || left_diag == `W_B` || left_diag == `W_Q` || left_diag == `W_P` || left_diag == `W_K`)) {
                if (position + 7 > 55) {
                    B_pot_pro.push(position + 7);
                }
                return_list.push(position + 7);
            }
    }

    const down1 = pseudo_list[position + 8];

    if (down1 == `empty`) {
        if (position + 8 > 55) {
            B_pot_pro.push(position + 8);
        }
        return_list.push(position + 8);

        if (position >= 8 && position <= 15) {
            const down2 = pseudo_list[position + 16];
        
            if (down2 == `empty`) {
                return_list.push(position + 16);
            }
        }
    }
    return return_list
}

//BLACK ROOK
function BR_moves_list(position) { //Black Rook
    let hori_list = [];
    let vert_list = [];
    let end = false;

    for (pos = position - position % 8; pos < 8 + position - position % 8; pos++) {
        if (pos != position) {
            let hori = document.getElementById(`X` + String(pos)).className;
            if (hori == `B_R` || hori == `B_N` || hori == `B_B` || hori == `B_Q` || hori == `B_P` || hori == `B_K`) {
                if (end) {
                    break;
                } else {
                    hori_list = [];
                }
                
            } else if (hori == `W_R` || hori == `W_N` || hori == `W_B` || hori == `W_Q` || hori == `W_P` || hori == `W_K`) {
                if (end) {
                    hori_list.push(pos);
                    break;
                } else {
                    hori_list = [pos];
                }
            } else if (hori == `empty`) {
                hori_list.push(pos)
            }

        } else {
            end = true;
        }
    }

    end = false;
    for (pos = position % 8; pos < 64; pos += 8) {
        if (pos != position) {
            let vert = document.getElementById(`X` + String(pos)).className;
            if (vert == `B_R` || vert == `B_N` || vert == `B_B` || vert == `B_Q` || vert == `B_P` || vert == `B_K`) {
                if (end) {
                    break;
                } else {
                    vert_list = [];
                }
                
            } else if (vert == `W_R` || vert == `W_N` || vert == `W_B` || vert == `W_Q` || vert == `W_P` || vert == `W_K`) {
                if (end) {
                    vert_list.push(pos);
                    break;
                } else {
                    vert_list = [pos];
                }
            } else if (vert == `empty`) {
                vert_list.push(pos)
            }

        } else {
            end = true;
        }
    }
    return hori_list.concat(vert_list)
}

function pseudoBR_moves_list(position, pseudo_list) { //Black Rook
    let hori_list = [];
    let vert_list = [];
    let end = false;

    for (pos = position - position % 8; pos < 8 + position - position % 8; pos++) {
        if (pos != position) {
            let hori = pseudo_list[pos];
            if (hori == `B_R` || hori == `B_N` || hori == `B_B` || hori == `B_Q` || hori == `B_P` || hori == `B_K`) {
                if (end) {
                    break;
                } else {
                    hori_list = [];
                }
                
            } else if (hori == `W_R` || hori == `W_N` || hori == `W_B` || hori == `W_Q` || hori == `W_P` || hori == `W_K`) {
                if (end) {
                    hori_list.push(pos);
                    break;
                } else {
                    hori_list = [pos];
                }
            } else if (hori == `empty`) {
                hori_list.push(pos)
            }

        } else {
            end = true;
        }
    }

    end = false;
    for (pos = position % 8; pos < 64; pos += 8) {
        if (pos != position) {
            let vert = pseudo_list[pos];
            if (vert == `B_R` || vert == `B_N` || vert == `B_B` || vert == `B_Q` || vert == `B_P` || vert == `B_K`) {
                if (end) {
                    break;
                } else {
                    vert_list = [];
                }
                
            } else if (vert == `W_R` || vert == `W_N` || vert == `W_B` || vert == `W_Q` || vert == `W_P` || vert == `W_K`) {
                if (end) {
                    vert_list.push(pos);
                    break;
                } else {
                    vert_list = [pos];
                }
            } else if (vert == `empty`) {
                vert_list.push(pos)
            }

        } else {
            end = true;
        }
    }
    return hori_list.concat(vert_list)
}

//BLACK BISHOP
function BB_moves_list(position) { //Black Bishop
    let pos_list = [];
    let neg_list = [];
    let end = false;

    if (position % 7 == 0) {
        for (pos = 7; pos <= 56; pos += 7) {
            if (pos != position) {
                let positive = document.getElementById(`X` + String(pos)).className;
            
                if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }
        }

    } else if (position % 8 + Math.floor(position / 8) < 7) {
        for (pos = position % 8 + Math.floor(position / 8); pos < 64; pos += 7) {
            if (pos != position) {
                let positive = document.getElementById(`X` + String(pos)).className;
            
                if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }

            if (pos % 8 == 0) {
                break;
            }
        }
    } else {
        for (pos = position - 7 * (7 - position % 8); pos < 64; pos += 7) {
            if (pos != position) {
                let positive = document.getElementById(`X` + String(pos)).className;
            
                if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }
        }
    }

    end = false;

    if (position % 9 == 0) {
        for (pos = 9; pos <= 63; pos += 9) {
            if (pos != position) {
                let negative = document.getElementById(`X` + String(pos)).className;
            
                if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }
        }

    } else if (position % 8 - Math.floor(position / 8) > 0) {
        for (pos = position % 8 - Math.floor(position / 8); pos < 64; pos += 9) {
            if (pos != position) {
                let negative = document.getElementById(`X` + String(pos)).className;
            
                if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }

            if (pos % 8 == 7) {
                break;
            }
        }
    } else {
        for (pos = position - 9 * (position % 8); pos < 64; pos += 9) {
            if (pos != position) {
                let negative = document.getElementById(`X` + String(pos)).className;
            
                if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }
        }
    }
    return pos_list.concat(neg_list)
}

function pseudoBB_moves_list(position, pseudo_list) { //Black Bishop
    let pos_list = [];
    let neg_list = [];
    let end = false;

    if (position % 7 == 0) {
        for (pos = 7; pos <= 56; pos += 7) {
            if (pos != position) {
                let positive = pseudo_list[pos];
            
                if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }
        }

    } else if (position % 8 + Math.floor(position / 8) < 7) {
        for (pos = position % 8 + Math.floor(position / 8); pos < 64; pos += 7) {
            if (pos != position) {
                let positive = pseudo_list[pos];
            
                if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }

            if (pos % 8 == 0) {
                break;
            }
        }
    } else {
        for (pos = position - 7 * (7 - position % 8); pos < 64; pos += 7) {
            if (pos != position) {
                let positive = pseudo_list[pos];
            
                if (positive == `B_R` || positive == `B_N` || positive == `B_B` || positive == `B_Q` || positive == `B_P` || positive == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        pos_list = [];
                    }
                } else if (positive == `W_R` || positive == `W_N` || positive == `W_B` || positive == `W_Q` || positive == `W_P` || positive == `W_K`) {
                    if (end) {
                        pos_list.push(pos);
                        break;
                    } else {
                        pos_list = [pos];
                    }
                } else if (positive == `empty`) {
                    pos_list.push(pos);
                }

            } else {
                end = true;
            }
        }
    }

    end = false;

    if (position % 9 == 0) {
        for (pos = 9; pos <= 63; pos += 9) {
            if (pos != position) {
                let negative = pseudo_list[pos];
            
                if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }
        }

    } else if (position % 8 - Math.floor(position / 8) > 0) {
        for (pos = position % 8 - Math.floor(position / 8); pos < 64; pos += 9) {
            if (pos != position) {
                let negative = pseudo_list[pos];
            
                if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }

            if (pos % 8 == 7) {
                break;
            }
        }
    } else {
        for (pos = position - 9 * (position % 8); pos < 64; pos += 9) {
            if (pos != position) {
                let negative = pseudo_list[pos];
            
                if (negative == `B_R` || negative == `B_N` || negative == `B_B` || negative == `B_Q` || negative == `B_P` || negative == `B_K`) {
                    if (end) {
                        break;
                    } else {
                        neg_list = [];
                    }
                } else if (negative == `W_R` || negative == `W_N` || negative == `W_B` || negative == `W_Q` || negative == `W_P` || negative == `W_K`) {
                    if (end) {
                        neg_list.push(pos);
                        break;
                    } else {
                        neg_list = [pos];
                    }
                } else if (negative == `empty`) {
                    neg_list.push(pos);
                }

            } else {
                end = true;
            }
        }
    }
    return pos_list.concat(neg_list)
}

//BLACK QUEEN
function BQ_moves_list(position) { //Black Queen
    return BR_moves_list(position).concat(BB_moves_list(position))
}

function pseudoBQ_moves_list(position, pseudo_list) { //Black Queen
    return pseudoBR_moves_list(position, pseudo_list).concat(pseudoBB_moves_list(position, pseudo_list))
}

//BLACK KNIGHT
function BN_moves_list(position) { //Black kNight
    let result_list = [];
    const xpos = position % 8;
    const ypos = Math.floor(position / 8);
    let pos;

    if (xpos >= 2) {
        if (ypos != 0) {
            pos = document.getElementById(`X` + String(position - 10)).className;
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position - 10);
            }
        }
        
        if (ypos != 7) {
            pos = document.getElementById(`X` + String(position + 6)).className;
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position + 6);
            }
        }
    }

    if (xpos <= 5) {
        if (ypos != 0) {
            pos = document.getElementById(`X` + String(position - 6)).className;
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position - 6);
            }
        }
        
        if (ypos != 7) {
            pos = document.getElementById(`X` + String(position + 10)).className;
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position + 10);
            }
        }
    }

    if (ypos >= 2) {
        if (xpos != 0) {
            pos = document.getElementById(`X` + String(position - 17)).className;
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position - 17);
            }
        }
        
        if (xpos != 7) {
            pos = document.getElementById(`X` + String(position - 15)).className;
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position - 15);
            }
        }
    }

    if (ypos <= 5) {
        if (xpos != 0) {
            pos = document.getElementById(`X` + String(position + 15)).className;
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position + 15);
            }
        }
        
        if (xpos != 7) {
            pos = document.getElementById(`X` + String(position + 17)).className;
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position + 17);
            }
        }
    }
    return result_list
}

function pseudoBN_moves_list(position, pseudo_list) { //Black kNight
    let result_list = [];
    const xpos = position % 8;
    const ypos = Math.floor(position / 8);
    let pos;

    if (xpos >= 2) {
        if (ypos != 0) {
            pos = pseudo_list[position - 10];
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position - 10);
            }
        }
        
        if (ypos != 7) {
            pos = pseudo_list[position + 6];
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position + 6);
            }
        }
    }

    if (xpos <= 5) {
        if (ypos != 0) {
            pos = pseudo_list[position - 6];
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position - 6);
            }
        }
        
        if (ypos != 7) {
            pos = pseudo_list[position + 10];
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position + 10);
            }
        }
    }

    if (ypos >= 2) {
        if (xpos != 0) {
            pos = pseudo_list[position - 17];
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position - 17);
            }
        }
        
        if (xpos != 7) {
            pos = pseudo_list[position - 15];
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position - 15);
            }
        }
    }

    if (ypos <= 5) {
        if (xpos != 0) {
            pos = pseudo_list[position + 15];
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position + 15);
            }
        }
        
        if (xpos != 7) {
            pos = pseudo_list[position + 17];
            if (pos != `B_R` && pos != `B_N` && pos != `B_B` && pos != `B_Q` && pos != `B_P` && pos != `B_K`) {
                result_list.push(position + 17);
            }
        }
    }
    return result_list
}

//BLACK KING
function BK_moves_list(position) { //Black King
    let result_list = [];
    let movelist = [position - 8, position + 8];

    if (position % 8 != 0) {
        movelist.push(position - 9)
        movelist.push(position - 1)
        movelist.push(position + 7)
    }

    if (position % 8 != 7) {
        movelist.push(position - 7)
        movelist.push(position + 1)
        movelist.push(position + 9)
    }

    for (pos of movelist) {
        if (pos < 64 && pos >= 0) {
            let piece = document.getElementById(`X` + String(pos)).className;
            if (piece != `B_R` && piece != `B_N` && piece != `B_B` && piece != `B_Q` && piece != `B_P`) {
                result_list.push(pos);
            }
        }

    }
    if (position == 4) {
        if (B_can_OO && document.getElementById(`X5`).className == `empty` && document.getElementById(`X6`).className == `empty` && !is_Bcheck(`B_K`, 4, 5)) {
            result_list.push(6)
        }
    
        if (B_can_OOO && document.getElementById(`X3`).className == `empty` && document.getElementById(`X2`).className == `empty` && document.getElementById(`X1`).className == `empty` && !is_Bcheck(`B_K`, 4, 3)) {
            result_list.push(2)
        }
    }
    return result_list
}

function pseudoBK_moves_list(position, pseudo_list) { //Black King
    let result_list = [];
    let movelist = [position - 8, position + 8];

    if (position % 8 != 0) {
        movelist.push(position - 9)
        movelist.push(position - 1)
        movelist.push(position + 7)
    }

    if (position % 8 != 7) {
        movelist.push(position - 7)
        movelist.push(position + 1)
        movelist.push(position + 9)
    }

    for (pos of movelist) {
        if (pos < 64 && pos >= 0) {
            let piece = pseudo_list[pos];
            if (piece != `B_R` && piece != `B_N` && piece != `B_B` && piece != `B_Q` && piece != `B_P`) {
                result_list.push(pos);
            }
        }

    }
    if (position == 4) {
        if (B_can_OO && pseudo_list[5] == `empty` && pseudo_list[6] == `empty` && !is_Bcheck(`B_K`, 4, 5)) {
            result_list.push(6)
        }
    
        if (B_can_OOO && pseudo_list[3] == `empty` && pseudo_list[2] == `empty` && pseudo_list[1] == `empty` && !is_Bcheck(`B_K`, 4, 3)) {
            result_list.push(2)
        }
    }
    return result_list
}

//
function black_move(node) {
    if (!is_Wturn) {
        let playable_list = []; //list of id representing integer index
        let promotion = false;
        
        if (node.className == `B_P`) {
            playable_list = BP_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `B_R`) {
            playable_list = BR_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `B_B`) {
            playable_list = BB_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `B_Q`) {
            playable_list = BQ_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `B_N`) {
            playable_list = BN_moves_list(Number(node.id.slice(1)));
        }

        if (node.className == `B_K`) {
            playable_list = BK_moves_list(Number(node.id.slice(1)));
        }

        for (let pos of playable_list) {
            if (!is_Bcheck(node.className, Number(node.id.slice(1)), pos)) {
                document.getElementById(`X` + String(pos)).classList.add(`pos_playable`);
            }
        }

        updatecursor()

        for (let temp of document.querySelectorAll(`td`)) {
            temp.onclick = function() {
                if (temp.className == `B_R` || temp.className == `B_N` || temp.className == `B_B` || temp.className == `B_Q` || temp.className == `B_P` || temp.className == `B_K`) {
                    for (let pos of playable_list) {
                        document.getElementById(`X` + String(pos)).classList.remove(`pos_playable`);
                    }

                    return black_move(temp);
                }
                else if (!temp.className.includes(`pos_playable`)) {
                    for (let pos of playable_list) {
                        document.getElementById(`X` + String(pos)).classList.remove(`pos_playable`);
                    }
                    
                    if (temp.className != `empty`) {
                        white_move(temp); 
                    }
                }
                else {
                    for (let pos of playable_list) {
                        document.getElementById(`X` + String(pos)).classList.remove(`pos_playable`);
                    }

                    //double advance pawn = trigger en passant
                    if (node.className == `B_P` && Number(temp.id.slice(1)) == Number(node.id.slice(1)) + 16) {
                        W_pot_ep = Number(temp.id.slice(1)) - 8;
                    }
                    else {
                        W_pot_ep = -1;
                    }

                    //en passant capture
                    if (node.className == `B_P` && Number(temp.id.slice(1)) == B_pot_ep) {
                        document.getElementById(`X` + String(Number(temp.id.slice(1)) - 8)).className = `empty`;
                        add_captured(`W_P`);
                    }

                    //capture piece
                    if (temp.className == `W_R` || temp.className == `W_N` || temp.className == `W_B` || temp.className == `W_Q` || temp.className == `W_P`) {
                        add_captured(temp.className);
                    }
                    else if (true) {
                        //need add en passant capture
                    }

                    //castle status (rook)
                    if (node.className ==  `B_R`) {
                        if (node.id.slice(1) == `0`) {
                            B_can_OOO = false;
                        }
                        else if (node.id.slice(1) == `7`) {
                            B_can_OO = false;
                        }
                    }

                    //castle status (king)
                    if (node.className ==  `B_K`) {
                        if (temp.id == `X6` && B_can_OO) {
                            document.getElementById(`X7`).className = `empty`;
                            document.getElementById(`X5`).className = `B_R`;
                        }
                        else if (temp.id == `X2` && B_can_OOO) {
                            document.getElementById(`X0`).className = `empty`;
                            document.getElementById(`X3`).className = `B_R`;
                        }
                        B_can_OO = false;
                        B_can_OOO = false;
                    }

                    //pawn promotion
                    if (B_pot_pro.includes(Number(temp.id.slice(1)))) {
                        function removenodes() {
                            knight_button.className = ``
                            bishop_button.className = ``
                            rook_button.className = ``
                            queen_button.className = ``
                        }

                        promotion = true;
                        temp.className = node.className;
                        B_pot_pro = [];
                        document.getElementById(`gamestatus`).textContent = `Select piece for\npawn to promote to`

                        const knight_button = document.getElementById(`Npromote`)
                        const bishop_button = document.getElementById(`Bpromote`)
                        const rook_button = document.getElementById(`Rpromote`)
                        const queen_button = document.getElementById(`Qpromote`)

                        knight_button.className = `B_Ndisplay`;
                        bishop_button.className = `B_Bdisplay`;
                        rook_button.className = `B_Rdisplay`;
                        queen_button.className = `B_Qdisplay`;
                        
                        knight_button.onclick = function() {
                            if (!is_Wturn) {
                                temp.className = `B_N`;
                                deltamaterial += piece_to_value(`B_N`) - 1;
                                updatedeltamaterial();
                                removenodes();
                                document.getElementById(`gamestatus`).textContent = `White's turn`;
                                is_Wturn = true;
                            }
                        }
                        bishop_button.onclick = function() {
                            if (!is_Wturn) {
                                temp.className = `B_B`;
                                deltamaterial += piece_to_value(`B_B`) - 1;
                                updatedeltamaterial();
                                removenodes();
                                document.getElementById(`gamestatus`).textContent = `White's turn`;
                                is_Wturn = true;
                            }
                        }
                        rook_button.onclick = function() {
                            if (!is_Wturn) {
                                temp.className = `B_R`;
                                deltamaterial += piece_to_value(`B_R`) - 1;
                                updatedeltamaterial();
                                removenodes();
                                document.getElementById(`gamestatus`).textContent = `White's turn`;
                                is_Wturn = true;
                            }
                        }
                        queen_button.onclick = function() {
                            if (!is_Wturn) {
                                temp.className = `B_Q`;
                                deltamaterial += piece_to_value(`B_Q`) - 1;
                                updatedeltamaterial();
                                removenodes();
                                document.getElementById(`gamestatus`).textContent = `White's turn`;
                                is_Wturn = true;
                            }
                        }
                    }
                    else {
                        temp.className = node.className;
                        is_Wturn = true;
                    }

                    node.className = `empty`;
                    if(is_Wcheckmate()) {
                        if (is_Wcheck()) {
                            document.getElementById(`gamestatus`).textContent = `Black won by Checkmate!`;
                        }
                        else {
                            document.getElementById(`gamestatus`).textContent = `Game is drawn due to\nStalemate!`;
                        }
                    }
                    else if(!promotion) {
                        document.getElementById(`gamestatus`).textContent = `White's turn`;
                    }
                    updatecursor()
                }   
            }
        }
    }
}

//checks
function is_Wcheck(piece, position, move) { //returns true if white king is checked
    let pseudo_list = [];

    for (let index = 0; index < 64; index++) {
        if (index == position) {
            pseudo_list.push(`empty`);
        }
        else if (index == move) {
            pseudo_list.push(piece);
        }
        else if (index == move) {
            pseudo_list.push(piece);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_P`)) {
            pseudo_list.push(`W_P`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_R`)) {
            pseudo_list.push(`W_R`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_B`)) {
            pseudo_list.push(`W_B`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_Q`)) {
            pseudo_list.push(`W_Q`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_N`)) {
            pseudo_list.push(`W_N`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_K`)) {
            pseudo_list.push(`W_K`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_P`)) {
            pseudo_list.push(`B_P`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_R`)) {
            pseudo_list.push(`B_R`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_B`)) {
            pseudo_list.push(`B_B`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_Q`)) {
            pseudo_list.push(`B_Q`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_N`)) {
            pseudo_list.push(`B_N`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_K`)) {
            pseudo_list.push(`B_K`);
        }
        else {
            pseudo_list.push(`empty`);
        }
    }
    let playable_list = []; //list of id representing integer index

    for (let index = 0; index < 64; index++) {  
        if (pseudo_list[index] == `B_P`) {
            playable_list = playable_list.concat(pseudoBP_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `B_R`) {
            playable_list = playable_list.concat(pseudoBR_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `B_B`) {
            playable_list = playable_list.concat(pseudoBB_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `B_Q`) {
            playable_list = playable_list.concat(pseudoBQ_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `B_N`) {
            playable_list = playable_list.concat(pseudoBN_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `B_K`) {
            playable_list = playable_list.concat(pseudoBK_moves_list(index, pseudo_list));
        }
    }

    for (let pos of playable_list) {
        if (pseudo_list[pos] == `W_K`) {
            return true;
        }
    }
    return false;
}

function is_Bcheck(piece, position, move) { //returns true if black king is checked
    let pseudo_list = [];
    for (let index = 0; index < 64; index++) {
        if (index == position) {
            pseudo_list.push(`empty`);
        }
        else if (index == move) {
            pseudo_list.push(piece);
        }
        else if (index == move) {
            pseudo_list.push(piece);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_P`)) {
            pseudo_list.push(`W_P`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_R`)) {
            pseudo_list.push(`W_R`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_B`)) {
            pseudo_list.push(`W_B`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_Q`)) {
            pseudo_list.push(`W_Q`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_N`)) {
            pseudo_list.push(`W_N`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_K`)) {
            pseudo_list.push(`W_K`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_P`)) {
            pseudo_list.push(`B_P`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_R`)) {
            pseudo_list.push(`B_R`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_B`)) {
            pseudo_list.push(`B_B`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_Q`)) {
            pseudo_list.push(`B_Q`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_N`)) {
            pseudo_list.push(`B_N`);
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_K`)) {
            pseudo_list.push(`B_K`);
        }
        else {
            pseudo_list.push(`empty`);
        }
    }

    let playable_list = []; //list of id representing integer index

    for (let index = 0; index < 64; index++) {  
        if (pseudo_list[index] == `W_P`) {
            playable_list = playable_list.concat(pseudoWP_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `W_R`) {
            playable_list = playable_list.concat(pseudoWR_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `W_B`) {
            playable_list = playable_list.concat(pseudoWB_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `W_Q`) {
            playable_list = playable_list.concat(pseudoWQ_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `W_N`) {
            playable_list = playable_list.concat(pseudoWN_moves_list(index, pseudo_list));
        }

        if (pseudo_list[index] == `W_K`) {
            playable_list = playable_list.concat(pseudoWK_moves_list(index, pseudo_list));
        }
    }

    for (let pos of playable_list) {
        if (pseudo_list[pos] == `B_K`) {
            return true;
        }
    }
    return false;
}

//checkmate
function is_Wcheckmate() {
    function mass_isWcheck(piece, index, arr) { //index = position of piece, arr = possible positions, returns boolean
        for (item of arr) {
            if (!is_Wcheck(piece, index, item)) {
                return false //note to self: it does not mean W is not under check, just that there is a possible move to block the check
            }
        }
        return true
    }
    
    for (let index = 0; index < 64; index++) {
        if (document.getElementById(`X` + String(index)).classList.contains(`W_P`)) {
            if (!mass_isWcheck(`W_P`, index, WP_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_R`)) {
            if (!mass_isWcheck(`W_R`, index, WR_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_B`)) {
            if (!mass_isWcheck(`W_B`, index, WB_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_Q`)) {
            if (!mass_isWcheck(`W_Q`, index, WQ_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_N`)) {
            if (!mass_isWcheck(`W_N`, index, WN_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`W_K`)) {
            if (!mass_isWcheck(`W_K`, index, WK_moves_list(index))) {
                return false
            }
        }
    }
    return true;
}

function is_Bcheckmate() {
    function mass_isBcheck(piece, index, arr) { //index = position of piece, arr = possible positions, returns boolean
        for (item of arr) {
            if (!is_Bcheck(piece, index, item)) {
                return false //note to self: it does not mean W is not under check, just that there is a possible move to block the check
            }
        }
        return true
    }
    
    for (let index = 0; index < 64; index++) {
        if (document.getElementById(`X` + String(index)).classList.contains(`B_P`)) {
            if (!mass_isBcheck(`B_P`, index, BP_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_R`)) {
            if (!mass_isBcheck(`B_R`, index, BR_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_B`)) {
            if (!mass_isBcheck(`B_B`, index, BB_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_Q`)) {
            if (!mass_isBcheck(`B_Q`, index, BQ_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_N`)) {
            if (!mass_isBcheck(`B_N`, index, BN_moves_list(index))) {
                return false
            }
        }
        else if (document.getElementById(`X` + String(index)).classList.contains(`B_K`)) {
            if (!mass_isBcheck(`B_K`, index, BK_moves_list(index))) {
                return false
            }
        }
    }
    return true;
}
