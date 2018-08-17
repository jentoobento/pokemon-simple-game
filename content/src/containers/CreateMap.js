import React from 'react';
import './css/CreateMap.css';

export const CreateMap = (poke, index, listType, fnDelete, fnEdit) => {
    let middleIndex = poke.moves.length % 2 === 0 ? poke.moves.length / 2 : Math.floor(poke.moves.length / 2)
    let secondMoveName = poke.moves[middleIndex].move.name;
    let buttonsHtml;
    if (listType) {
        buttonsHtml =
            <section id={poke._id} className="all-btns">
                <td className="text-left"> <button type="button" className="btn btn-danger edit-btn" onClick={fnEdit}>edit</button> </td>
                <td className="text-right"><button type="button" className="btn btn-default delete-btn" onClick={fnDelete}>delete</button></td>
            </section>
    } else if (!poke.swapped) {
        buttonsHtml =
            <p id={index}>
                <button type="button" className="btn btn swap-btn" onClick={fnEdit}>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" class="pokeball-img"/> swap
                    </button>
            </p>
    }
    return (
        <div class="col-lg-4 col-sm-6 text-center mb-4" key={listType ? index + 1 : poke.id}>
            <img class="rounded-circle img-fluid d-block mx-auto sprite-img" src={poke.sprites.front_default} />
            <h3>{poke.name}
                <small> #{listType ? index + 1 : poke.id}</small>
            </h3>
            <p>
                {poke.moves[0].move.name} {poke.stats[4].base_stat},  {secondMoveName} {poke.stats[2].base_stat}<br />
                SPD {poke.stats[0].base_stat} DEF {poke.stats[3].base_stat}<br />
            </p>
            {buttonsHtml}
        </div>
    )
}