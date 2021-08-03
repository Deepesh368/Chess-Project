class Referee {
    tile_occupied(x, y, board_state) 
    {
        const piece = board_state.find((p) => p.x == x && p.y == y);
        if(piece)
        {
            return true;
        }
        return false;
    }

    occupied_by_opponent(x, y, board_state, color)
    {
        const piece = board_state.find((p) => p.x == x && p.y == y && (p.type[0] != color));
        if(piece)
        {
            console.log(piece.type);
            return true;
        }
        return false;
    }

    ValidMove(px, py, x, y, type, board_state) {
        if(type[1] == 'P')
        {
            const start = (type[0] == 'W') ? 6 : 1;
            const move = (type[0] == 'W') ? -1 : 1;
            if(px == start && py == y && x - px == 2 * move)
            {
                if(!this.tile_occupied(x, y, board_state) && !this.tile_occupied(x - move, y, board_state))
                {
                    return true;
                }
            }
            else if(py == y && x - px == move)
            {
                if(!this.tile_occupied(x, y, board_state))
                {
                    return true;
                }
            }
            else if(((y - py == -1) || (y - py == 1)) && x - px == move)
            {
                if(this.occupied_by_opponent(x, y, board_state, type[0]))
                {
                    return true;
                }
            }
            /*else if(y - py == 1 && x - px == move)
            {
                if(this.occupied_by_opponent(x, y, board_state, type[0]))
                {
                    return true;
                }
            }*/
        }
        return false;
    }
}

export default Referee;