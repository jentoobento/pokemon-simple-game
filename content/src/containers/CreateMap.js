import React from 'react';

export const CreateMap = (poke, index, listType, fnDelete, fnEdit) => {
    let middleIndex = poke.moves.length % 2 === 0 ? poke.moves.length / 2 : Math.floor(poke.moves.length / 2)
    let secondMoveName = poke.moves[middleIndex].move.name;
    let buttonsHtml;
    if (listType) {
        buttonsHtml =
            // <tr id={poke._id}>
            <p id={poke._id}>
                <td className="text-left"> <button type="button" className="btn btn-warning" onClick={fnEdit}>edit</button> </td>
                <td className="text-right"><button type="button" className="btn btn-danger" onClick={fnDelete}>delete</button></td>
            </p>
        {/* </tr> */ }
    } else if (!poke.swapped) {
        buttonsHtml =
            // <tr id={index}>
            <p id={index}>
                {/* <td className="text-left"> */}
                <button type="button" className="btn btn" onClick={fnEdit}>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" /> swap
                    </button>
                {/* </td> */}
            </p>
        // </tr>
    }
    return (
        <div class="col-lg-4 col-sm-6 text-center mb-4" key={listType ? index + 1 : poke.id}>
            <img class="rounded-circle img-fluid d-block mx-auto" style={{ "width": "300px", "height": "200px" }} src={poke.sprites.front_default} />
            {/* <img class="rounded-circle img-fluid d-block mx-auto" style={{ "width": "300px", "height": "200px", "position":"absolute", "zIndex": 0 }} src={poke.sprites.front_default} />
            <img class="rounded-circle img-fluid d-block mx-auto" style={{ "width": "300px", "height": "300px", "position":"absolute", "zIndex": -1 }} src="https://vignette.wikia.nocookie.net/adventuretimewithfinnandjake/images/4/4c/Pokeball.png/revision/latest?cb=20130307191248" /> */}

                <h3>{poke.name}
                    <small> #{listType ? index + 1 : poke.id}</small>
                </h3>
                <p>
                    {poke.moves[0].move.name} {poke.stats[4].base_stat},  {secondMoveName} {poke.stats[2].base_stat}<br />
                    SPD {poke.stats[0].base_stat} DEF {poke.stats[3].base_stat}<br />
                </p>
                {buttonsHtml}

        </div>
        // <div className="col-md-6" key={listType ? index + 1 : poke.id}>
        //     <div className="media">
        //         <div className="media-left">
        //             <img src={poke.sprites.front_default} width="154px" height="128px" />
        //         </div>
        //         <div className="media-body">
        //             <h3 className="media-heading">
        //                 <span className="text-right text-strong text-capitalize">{poke.name}</span>
        //                 <span className="text-right text-muted"> #{listType ? index + 1 : poke.id}</span>
        //             </h3>
        //             <table className="table table-condensed">
        //                 <tbody>
        //                     <tr>
        //                         <td className="text-left">HP</td>
        //                         <td className="text-right">{poke.stats[5].base_stat * 10}</td>
        //                     </tr>
        //                     <tr>
        //                         <td className="text-left">Moves</td>
        //                         <td className="text-right text-capitalize">{poke.moves[0].move.name} {poke.stats[4].base_stat},  {secondMoveName} {poke.stats[2].base_stat}</td>
        //                     </tr>
        //                     <tr>
        //                         <td className="text-left">Stats</td>
        //                         <td className="text-right">SPD {poke.stats[0].base_stat} DEF {poke.stats[3].base_stat}</td>
        //                     </tr>
        //                     {buttonsHtml}
        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // </div>
    )
}